import { EventDTO } from 'core/api/generated';
import { useModal } from 'core/components/Modal/Modal';
import NewEventForm from 'domains/events/NewEventForm/NewEventForm';

export const EditEventModal: React.FC<{ event: EventDTO }> = ({ event }) => {
  const { Modal, open, close, isOpen } = useModal();
  if (!event.showId) {
    return null;
  }
  return (
    <>
      <button className="link" onClick={open}>
        Edit
      </button>
      <Modal isOpen={isOpen} close={close} title="Add a new show">
        <NewEventForm onSuccess={close} event={event} showId={event.showId} />
      </Modal>
    </>
  );
};
