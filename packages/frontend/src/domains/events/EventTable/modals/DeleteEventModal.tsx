import { TrashIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "core/api";
import { EventDTO } from "core/api/generated";
import { useModal } from "core/components/Modal/Modal";
import { showToastError } from "core/utils/errors";
import { isNil } from "core/utils/isNil";

export const DeleteEventModal: React.FC<{ event: EventDTO }> = ({ event }) => {
  const queryClient = useQueryClient();
  const { Modal, open, close, isOpen } = useModal();

  const mutation = useMutation<unknown, Error>({
    mutationFn: () => {
      if (isNil(event.showId)) {
        throw new Error("Show id is missing");
      }
      return api.eventsIdDelete({ id: event.id });
    },
    onError: (e) => {
      showToastError("Could not delete event", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["EventsList", event.showId] });
      close();
    },
  });

  if (!event.showId) {
    return null;
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        close={close}
        title={`Delete event: ${event.name}`}
      >
        <p className="mb-4">Are you sure you want to delete this event?</p>
        <div className="flex justify-center gap-2">
          <button
            className="btn btn-error w-20"
            onClick={() => mutation.mutate()}
          >
            Yes
          </button>
          <button className="btn w-20" onClick={() => close()}>
            No
          </button>
        </div>
      </Modal>
      <button className="btn btn-ghost btn-sm" onClick={() => open()}>
        <TrashIcon className="h-5 w-5" />
      </button>
    </>
  );
};
