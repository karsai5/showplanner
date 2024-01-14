import { EventDTO } from "core/api/generated";
import { PERMISSION, showPermission, useHasPermission } from "core/permissions";
import { useShowSummary } from "domains/shows/lib/summaryContext";

import { AvailabiltyDropdown } from "./components/AvailabilityDropdown";
import { EventTable, FieldOptions } from "./EventTable";
import { CloneEventModal } from "./modals/CloneEventModal";
import { DeleteEventModal } from "./modals/DeleteEventModal";
import { EditEventModal } from "./modals/EditEventModal";

export const Schedule: React.FC<React.ComponentProps<typeof EventTable>> = (props) => {
  const extraFieldOptions = [Availability, ...(props.extraFieldOptions || [])]
  const show = useShowSummary();
  const hasPermission = useHasPermission();

  if (hasPermission(showPermission(show.id, PERMISSION.addEvents))) {
    extraFieldOptions.push(adminButtonsOption)
  }

  return <EventTable {...props} extraFieldOptions={extraFieldOptions} />
}

const AdminButtons: React.FC<{ event: EventDTO }> = ({ event }) => {
  return <div className="flex gap-2">
    <EditEventModal event={event} />
    <CloneEventModal event={event} />
    <DeleteEventModal event={event} />
  </div>
}

const adminButtonsOption: FieldOptions = {
  header: "Edit",
  position: 'right',
  render: AdminButtons,
}


const Availability: FieldOptions = {
  header: "Availability",
  position: 'left',
  noPadding: true,
  render: AvailabiltyDropdown
}
