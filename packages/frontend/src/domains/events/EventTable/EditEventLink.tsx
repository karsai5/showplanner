import { useModal } from "core/components/Modal/Modal";

import { EventFormEdit } from "../EventFormEdit/EventFormEdit";

export const EditEventLink: React.FC<{ showId: string; event: any }> = ({
  showId,
  event,
}) => {
  const { Modal, open, close, isOpen } = useModal();
  const handleSuccess = () => {
    close();
  };
  return (
    <>
      <a className="link" onClick={open}>
        {" "}
        Edit{" "}
      </a>
      {isOpen && (
        <Modal isOpen={isOpen} close={close} title="Edit event">
          <EventFormEdit
            onSuccess={handleSuccess}
            showId={showId}
            eventId={event.id}
          />
        </Modal>
      )}
    </>
  );
};
