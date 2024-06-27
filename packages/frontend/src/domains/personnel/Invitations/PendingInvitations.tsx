import { useQuery } from "@tanstack/react-query";
import { api } from "core/api";
import { ShowBox } from "domains/shows/ShowBox";

export const PendingInvitations: React.FC = () => {
  const { data, isError } = useQuery(["invitations"], () =>
    api.rostering.invitationsGet()
  );
  if (isError) {
    return <p>Could not load invitations</p>;
  }
  if (data && data.length > 0) {
    return (
      <div className="card bg-slate-50 shadow-xl mt-4 mb-8 p-4">
        <h1 className="text-xl mb-4 font-bold">✨ Pending Invitations</h1>
        {data.map((invitation) => {
          return invitation.show ? (
            <ShowBox
              key={invitation.show?.id}
              show={invitation.show}
              className="max-w-96"
            />
          ) : null;
        })}
      </div>
    );
  }
  return null;
};
