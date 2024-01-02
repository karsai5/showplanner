import { EventDTO } from "core/api/generated";
import { useModal, Modal } from "core/components/Modal/Modal";
import NewEventForm from "../NewEventForm/NewEventForm";
import { EventTable, FieldOptions } from "./EventTable";

const AdminButtons: FieldOptions = {
  header: <span>Edit</span>,
  position: 'right',
  render: (event) => <EditEventModal event={event} />
}

const EditEventModal: React.FC<{ event: EventDTO }> = ({ event }) => {
  const { Modal, open, close, isOpen } = useModal();
  return (<>
    <button className="link" onClick={open}>
      Edit
    </button>
    <Modal isOpen={isOpen} close={close} title="Add a new show">
      <NewEventForm onSuccess={close} event={event} />
    </Modal>
  </>);
}

export const AdminEventTable: React.FC<React.ComponentProps<typeof EventTable>> = (props) => {
  const extraFieldOptions = [...(props.extraFieldOptions || []), AdminButtons]
  return <EventTable {...props} extraFieldOptions={extraFieldOptions} />
}
