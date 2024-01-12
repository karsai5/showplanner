import { EventTable, FieldOptions } from "./EventTable";
import { CloneEventModal } from "./modals/CloneEventModal";
import { DeleteEventModal } from "./modals/DeleteEventModal";
import { EditEventModal } from "./modals/EditEventModal";

const AdminButtons: FieldOptions = {
  header: "Edit",
  position: 'right',
  render: (event) => <div className="flex gap-2">
    <EditEventModal event={event} />
    <CloneEventModal event={event} />
    <DeleteEventModal event={event} />
  </div>
}

export const AdminEventTable: React.FC<React.ComponentProps<typeof EventTable>> = (props) => {
  const extraFieldOptions = [...(props.extraFieldOptions || []), AdminButtons]
  return <EventTable {...props} extraFieldOptions={extraFieldOptions} />
}
