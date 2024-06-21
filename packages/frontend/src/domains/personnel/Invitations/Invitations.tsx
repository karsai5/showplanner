import { useQuery } from "@tanstack/react-query";
import { api } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";

export const Invitations: React.FC<{ showId: number }> = ({ showId }) => {
  const { data, isError } = useQuery(["invitations", showId], () =>
    api.invitationsGet({ showId })
  );
  if (isError) {
    return <ErrorBox>Could not load invitations</ErrorBox>;
  }
  if (data && data.length > 0) {
    return (
      <div className="mt-4">
        <h2 className="card-title">Pending Invitations</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Person</th>
            </tr>
          </thead>
          <tbody>
            {data.map((invitation) => (
              <tr key={invitation.id}>
                <td>
                  {invitation.person?.firstName} {invitation.person?.lastName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
};
