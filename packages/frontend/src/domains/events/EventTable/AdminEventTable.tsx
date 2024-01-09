import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApi } from "core/api";
import { EventDTO } from "core/api/generated";
import { useModal } from "core/components/Modal/Modal";
import { showToastError } from "core/utils/errors";
import { isNil } from "core/utils/isNil";
import cc from 'classnames';

import NewEventForm from "../NewEventForm/NewEventForm";
import { EventTable, FieldOptions } from "./EventTable";
import { useState } from "react";

const AdminButtons: FieldOptions = {
  header: "Edit",
  position: 'right',
  render: (event) => <div>
    <EditEventModal event={event} />
    <CloneEventModal event={event} />
  </div>
}

const EditEventModal: React.FC<{ event: EventDTO }> = ({ event }) => {
  const { Modal, open, close, isOpen } = useModal();
  if (!event.showId) {
    return null;
  }
  return (<>
    <button className="link" onClick={open}>
      Edit
    </button>
    <Modal isOpen={isOpen} close={close} title="Add a new show">
      <NewEventForm onSuccess={close} event={event} showId={event.showId} />
    </Modal>
  </>);
}

const CloneEventModal: React.FC<{ event: EventDTO }> = ({ event }) => {
  const api = getApi();
  const queryClient = useQueryClient();
  const { Modal, open, close, isOpen } = useModal();
  const [newEvent, setNewEvent] = useState<EventDTO | undefined>();

  const mutation = useMutation<EventDTO>({
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
          name: event.name,
        }
      })
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
  return (<>
    <Modal isOpen={isOpen} close={close} title="Edit event">
      <NewEventForm onSuccess={close} event={newEvent} showId={event.showId} />
    </Modal>
    <button className={cc("link relative", { ['btn-disabled']: mutation.isLoading })} onClick={() => mutation.mutate()}>
      <div className={cc({ ["opacity-40"]: mutation.isLoading })}>Clone</div>
      {mutation.isLoading && <div className="absolute top-1 bottom-0 right-0 left-0">
        <span className="loading loading-dots loading-xs"></span>
      </div>}
    </button>
  </>);
}

export const AdminEventTable: React.FC<React.ComponentProps<typeof EventTable>> = (props) => {
  const extraFieldOptions = [...(props.extraFieldOptions || []), AdminButtons]
  return <EventTable {...props} extraFieldOptions={extraFieldOptions} />
}
