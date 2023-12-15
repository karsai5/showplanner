import cc from "classnames";
import { useModal } from "core/components/Modal/Modal";

import { useDeleteEventMuation } from "../lib/api";

export const DeleteEventLink: React.FC<{ event: any; showId: string }> = ({
  event,
  showId,
}) => {
  const { Modal, open, close, isOpen } = useModal();
  const deleteEvent = useDeleteEventMuation(event.id, showId);

  return (
    <>
      <a className="link" onClick={open}>
        {" "}
        Delete{" "}
      </a>
      <Modal isOpen={isOpen} close={close} title="Delete event">
        Are you sure you want to delete this event?
        <div className="pt-4 flex gap-2">
          <button
            className={cc("btn btn-primary w-24", {
              ["loading"]: deleteEvent.isLoading,
            })}
            onClick={() => deleteEvent.mutate()}
          >
            Yes
          </button>
          <button className="btn w-24" onClick={close}>
            No
          </button>
        </div>
      </Modal>
    </>
  );
};
