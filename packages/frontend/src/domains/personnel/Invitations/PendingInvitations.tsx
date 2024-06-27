import { useQuery } from "@tanstack/react-query";
import { api } from "core/api";

export const PendingInvitations: React.FC = () => {
  const { data, isError } = useQuery(["invitations"], () =>
    api.rostering.invitationsGet()
  );
  if (isError) {
    return <p>Could not load invitations</p>;
  }
  if (data && data.length > 0) {
    return (
      <ul>
        {data.map((invitation) => (
          <li key={invitation.id}>
            {invitation.person?.firstName} {invitation.person?.lastName}
          </li>
        ))}
      </ul>
    );
  }
  return null;
};
