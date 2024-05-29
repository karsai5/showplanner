import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApi } from "core/api";
import { EventDTO } from "core/api/generated";
import { useModal } from "core/components/Modal/Modal";
import { showToastError } from "core/utils/errors";
import { isNil } from "core/utils/isNil";
import NewEventForm from "domains/events/NewEventForm/NewEventForm";
import { useState } from "react";

export const CloneEventModal: React.FC<{ event: EventDTO }> = ({ event }) => {
  const api = getApi();
  const queryClient = useQueryClient();
  const { Modal, open, close, isOpen } = useModal();
  const [newEvent, setNewEvent] = useState<EventDTO | undefined>();

  const mutation = useMutation<EventDTO, Error>({
    mutationFn: () => {
      if (isNil(event.showId)) {
        throw new Error("Show id is missing");
      }
      return api.eventsPost({
        event: {
          showId: event.showId as number,
          start: event.start,
          end: event.end,
          curtainsUp: event.curtainsUp,
          address: event.address,
          shortnote: event.shortnote,
          name: event.nameRaw,
        },
      });
    },
    onError: (e) => {
      showToastError("Could not clone event", e);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["EventsList", event.showId] });
      setNewEvent(result);
      open();
    },
  });

  if (!event.showId) {
    return null;
  }
  return (
    <>
      <Modal isOpen={isOpen} close={close} title="Edit event">
        <NewEventForm
          onSuccess={close}
          event={newEvent}
          showId={event.showId}
        />
      </Modal>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => mutation.mutate()}
      >
        {mutation.isLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <DocumentDuplicateIcon className="h-5 w-5" />
        )}
      </button>
    </>
  );
};
