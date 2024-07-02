import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { showToastError } from "core/utils/errors";
import { PersonDisplayName } from "domains/personnel/PersonDisplayName";
import { toast } from "react-toastify";

export const Invitations: React.FC<{ showId: number }> = ({ showId }) => {
  const queryClient = useQueryClient();
  const invalidateQuery = () =>
    queryClient.invalidateQueries(["invitations", showId]);
  const { data, isError } = useQuery(["invitations", showId], () =>
    api.rostering.showsShowIdInvitationsGet({ showId })
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((invitation) => (
              <tr key={invitation.id}>
                <td>
                  {invitation.person && (
                    <PersonDisplayName person={invitation.person} />
                  )}
                  {invitation.email && <span>{invitation.email}</span>}
                </td>
                <td>
                  {invitation.id && (
                    <div className="flex gap-2">
                      <DeleteButton
                        id={invitation.id}
                        onSuccess={() => invalidateQuery()}
                      />
                      <ResendEmail id={invitation.id} />
                    </div>
                  )}
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

const ResendEmail: React.FC<{ id: string }> = ({ id }) => {
  const mutation = useMutation(
    () => api.rostering.invitationsIdNotifyPost({ id }),
    {
      onError: (err) => {
        showToastError("Failed to resend email", err as Error);
      },
      onSuccess: () => {
        toast.success("Email sent");
      },
    }
  );
  return (
    <button
      className="btn"
      disabled={mutation.isLoading}
      onClick={() => mutation.mutate()}
    >
      {mutation.isLoading && <span className="loading loading-spinner" />}
      Resend Email
    </button>
  );
};

const DeleteButton: React.FC<{ id: string; onSuccess?: () => void }> = ({
  id,
  onSuccess,
}) => {
  const mutation = useMutation(
    () => api.rostering.invitationsIdDelete({ id }),
    {
      onSuccess: () => {
        onSuccess && onSuccess();
      },
      onError: (err) => {
        showToastError("Failed to delete invitation", err as Error);
      },
    }
  );

  return (
    <button
      className="btn"
      disabled={mutation.isLoading}
      onClick={() => mutation.mutate()}
    >
      {mutation.isLoading && <span className="loading loading-spinner" />}
      Delete
    </button>
  );
};
