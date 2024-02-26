import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "core/api";
import { AccessDenied } from "core/components/AccessDenied/AccessDenied";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { useModal } from "core/components/Modal/Modal";
import { H2 } from "core/components/Typography";
import { PERMISSION, showPermission } from "core/permissions";
import { showToastError } from "core/utils/errors";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Head from "next/head";
import { ReactElement } from "react";
import { toast } from "react-toastify";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { PermissionClaim } from "supertokens-auth-react/recipe/userroles";

const ShowPage = () => {
  const show = useShowSummary();
  const { Modal, open, close, isOpen } = useModal();
  const { data, isLoading, isError } = useQuery(["unassigned-people", show.id], () =>
    api.personnelAssignableGet({ showId: show.id })
  );

  const queryClient = useQueryClient();
  const mutation = useMutation<unknown, Error, string | undefined>({
    mutationFn: (personId) => {
      if (!personId) {
        throw new Error("Person id missing");
      }
      return api.personnelAssignPost({ showId: show.id, personId: personId })
    },
    onError: (e) => {
      showToastError("Something went wrong adding person to show.", e);
    },
    onSuccess: () => {
      toast.success("Person added to show!");
      queryClient.invalidateQueries({ queryKey: ["unassigned-people", show.id] });
      queryClient.invalidateQueries({ queryKey: ["assigned-people", show.id] });

    },
  });

  return (
    <SessionAuth
      accessDeniedScreen={AccessDenied}
      overrideGlobalClaimValidators={(globalValidators) => [
        ...globalValidators,
        PermissionClaim.validators.includes(
          showPermission(show?.id, PERMISSION.personnel)
        ),
      ]}
    >
      <Head>
        <title>People - {show.name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col justify-between sm:flex-row gap-4">
        <H2 className="mb-4">{show.name} - People</H2>
        <button className="btn" onClick={() => open()}>Add person to show</button>
      </div>
      <PeopleTable showId={show.id} />
      <Modal isOpen={isOpen} close={close} title="Add person to show">
        {isLoading && <LoadingBox />}
        {isError && <ErrorBox>Something went wrong</ErrorBox>}
        {data && <table className="table">
          <tbody>
            {data.people?.map(p => {
              return <tr key={p.id}>
                <td>{p.firstName} {p.lastName}</td>
                <td><button className="btn" onClick={() => mutation.mutate(p.id)} >Add to show</button></td>
              </tr>;
            })}
          </tbody>
        </table>}
      </Modal>
    </SessionAuth>
  );
};

const PeopleTable: React.FC<{ showId: number }> = ({ showId }) => {
  const { data, isLoading, isError } = useQuery(["assigned-people", showId], () =>
    api.personnelAssignedGet({ showId })
  );
  if (isLoading) {
    return <LoadingBox />;
  }
  if (isError) {
    return <ErrorBox>Could not load people</ErrorBox>;
  }
  if (data) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.people?.map((person) => (
            <tr key={person.id}>
              <td>
                {person.firstName} {person.lastName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return null;
};

ShowPage.getLayout = (page: ReactElement) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default ShowPage;
