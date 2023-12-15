import { useQueryClient } from "@tanstack/react-query";
import { useModal } from "core/components/Modal/Modal";

import { EventFormNew } from "../EventFormNew/EventFormnew";

export const AddEventButton: React.FC<{ showId: string; showSlug: string }> = ({
  showId,
  showSlug,
}) => {
  const { Modal, open, close, isOpen } = useModal();
  const queryClient = useQueryClient();
  const handleSuccess = () => {
    close();
    queryClient.invalidateQueries({ queryKey: [`show`, { showSlug }] });
  };
  return (
    <>
      <button className="btn mb-2" onClick={open}>
        Add Event
      </button>
      <Modal isOpen={isOpen} close={close} title="Add a new event">
        <EventFormNew onSuccess={handleSuccess} showId={showId} />
      </Modal>
    </>
  );
};
