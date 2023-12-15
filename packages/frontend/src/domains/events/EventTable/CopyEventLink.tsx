import { useModal } from "core/components/Modal/Modal";

import { EventFormCopy } from "../EventFormCopy/EventFormCopy";

export const CopyEventLink: React.FC<{ event: any; showId: string }> = ({
  event,
  showId,
}) => {
  const { Modal, open, close, isOpen } = useModal();
  const handleSuccess = () => {
    close();
  };
  return (
    <>
      <a className="link" onClick={open}>
        {" "}
        Copy{" "}
      </a>
      {isOpen && (
        <Modal isOpen={isOpen} close={close} title="Edit event">
          <EventFormCopy
            onSuccess={handleSuccess}
            showId={showId}
            eventId={event.id}
          />
        </Modal>
      )}
    </>
  );
};
