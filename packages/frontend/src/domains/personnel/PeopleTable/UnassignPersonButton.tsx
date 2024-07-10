import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "core/api";
import { useConfirmationModal } from "core/components/Modal/ConfirmationModal";
import { showToastError } from "core/utils/errors";
import { FC } from "react";
import { toast } from "react-toastify";

export const UnassignPersonButton: FC<{
  id: string;
  showId: number;
  name: string;
}> = ({ id, showId, name }) => {
  const confirmationModal = useConfirmationModal();
  const queryClient = useQueryClient();

  const mutation = useMutation<unknown, Error>(
    () => api.rostering.showsShowIdPeopleUnassignPost({ showId, personId: id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["assigned-people", showId]);
        toast.success("Person unassigned");
      },
      onError: (error) => {
        showToastError("Could not unassign person from show", error);
      },
    }
  );

  const handleUnassign = () => {
    confirmationModal(
      "Unassign Person",
      `Are you sure you want to unassign ${name} from this show? Assignment details for this person will be lost.`,
      () => mutation.mutate()
    );
  };

  return (
    <button
      className="btn"
      onClick={() => handleUnassign()}
      disabled={mutation.isLoading}
    >
      {mutation.isLoading && <span className="loading loading-spinner" />}
      Unassign
    </button>
  );
};
