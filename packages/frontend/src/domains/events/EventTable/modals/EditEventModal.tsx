import { PencilIcon } from "@heroicons/react/24/outline";
import { EventDTO } from "core/api/generated";
import { useModal } from "core/components/Modal/Modal";
import { EventForm } from "domains/events/EventForm/EventForm";

export const EditEventModal: React.FC<{ event: EventDTO }> = ({ event }) => {
  const { Modal, open, close, isOpen } = useModal();
  if (!event.showId) {
    return null;
  }
  return (
    <>
      <button className="btn btn-ghost btn-sm" onClick={open}>
        <PencilIcon className="h-5 w-5" />
      </button>
      <Modal isOpen={isOpen} close={close} title="Add a new show">
        <EventForm onSuccess={close} event={event} showId={event.showId} />
      </Modal>
    </>
  );
};
