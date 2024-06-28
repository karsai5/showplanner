import { useMutation } from "@tanstack/react-query";
import { api } from "core/api";
import { InvitationDTO } from "core/api/generated";
import { ssrWrapper } from "core/permissions/ssr";
import { showToastError } from "core/utils/errors";
import { ShowBox } from "domains/shows/ShowBox";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import superjson from "superjson";

export const getServerSideProps = ssrWrapper(async (ctx, api) => {
  const id = ctx.query.id;

  if (typeof id !== "string") {
    throw new Error("Incorrect slug format");
  }

  const invitation = await api.rostering.invitationsIdGet({ id });
  return {
    props: { invitationJson: superjson.stringify(invitation) },
  };
});

export default function InvitationPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const invitation = superjson.parse<InvitationDTO>(props.invitationJson);
  const router = useRouter();

  const mutation = useMutation<unknown, Error>(
    () =>
      api.rostering.invitationsIdAcceptPost({ id: invitation.id as string }),
    {
      onSuccess: () => {
        toast.success("Invitation accepted");
        // Have to refresh session so that we get the new permissions
        router.push(
          `/refresh-session?redirect=/shows/${invitation.show?.slug}`
        );
      },
      onError: (e) => {
        showToastError("Something went wrong accepting invitation", e);
      },
    }
  );

  return (
    <div>
      <h1 className="text-2xl mb-4 font-bold">Invitation</h1>
      <div className="prose mb-4">
        <p>
          Would you like to accept your invitation to {invitation.show?.name}?
        </p>
      </div>
      {invitation.show && (
        <ShowBox
          show={invitation.show}
          className="max-w-96 pointer-events-none mb-6"
        />
      )}
      <div className="prose mb-4">
        <p>
          The managers of this show will get access to the following personal
          details:
        </p>
        <ul>
          <li>Full</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Date of birth</li>
          <li>Emergency contact details</li>
          <li>Allergies</li>
          <li>WWC number</li>
        </ul>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => mutation.mutate()}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading && (
          <span className="loading loading-spinner"></span>
        )}
        Accept invitation
      </button>
    </div>
  );
}
