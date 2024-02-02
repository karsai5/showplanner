import { ScheduleEventDTO } from "core/api/generated";
import { PERMISSION, showPermission, useHasPermission } from "core/permissions";
import { useShowSummary } from "domains/shows/lib/summaryContext";

import { AvailabilityDropdown } from "./components/AvailabilityDropdown";
import { EventTable}  from "./EventTable";
import { CloneEventModal } from "./modals/CloneEventModal";
import { DeleteEventModal } from "./modals/DeleteEventModal";
import { EditEventModal } from "./modals/EditEventModal";

export const Schedule: React.FC<React.ComponentProps<typeof EventTable>> = (props) => {
  const show = useShowSummary();
  const canEditEvents = useHasPermission()(showPermission(show.id, PERMISSION.addEvents))

  return <EventTable {...props}
    leftHeaders={<>
      <th>Availability</th>
    </>}
    leftColums={(e) => <>
      <td className="border-l border-slate-200 relative">
        <AvailabilityDropdown event={e} />
      </td>
    </>}
    rightHeaders={<>
      {canEditEvents &&
        <th>Edit</th>
      }
    </>}
    rightColums={(e) => <>
      {canEditEvents &&
        <td className="border border-slate-200 relative">
          <AdminButtons event={e} />
        </td>
      }
    </>}
  />
}

const AdminButtons: React.FC<{ event: ScheduleEventDTO }> = ({ event }) => {
  return <div className="flex gap-2">
    <EditEventModal event={event} />
    <CloneEventModal event={event} />
    <DeleteEventModal event={event} />
  </div>
}
