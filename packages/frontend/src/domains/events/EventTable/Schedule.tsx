import { ScheduleEventDTO, ScheduleEventDTOAllOfRoles } from 'core/api/generated';
import { PERMISSION, showPermission, useHasPermission } from 'core/permissions';
import { PersonDisplayName } from 'domains/personnel/PersonDisplayName';
import { useShowSummary } from 'domains/shows/lib/summaryContext';

import { AvailabilityDropdown } from './components/AvailabilityDropdown';
import { EventTable } from './EventTable';
import { CloneEventModal } from './modals/CloneEventModal';
import { DeleteEventModal } from './modals/DeleteEventModal';
import { EditEventModal } from './modals/EditEventModal';

export const Schedule: React.FC<React.ComponentProps<typeof EventTable>> = (
  props,
) => {
  const show = useShowSummary();
  const canEditEvents = useHasPermission()(
    showPermission(show.id, PERMISSION.addEvents),
  );

  return (
    <EventTable
      {...props}
      leftHeaders={
        <>
          <th>Availability</th>
          <th>Role</th>
        </>
      }
      leftColums={(e) => (
        <>
          <td className="border-l border-slate-200 relative">
            <AvailabilityDropdown event={e} />
          </td>
          <td className="border-l border-slate-200 relative">
            <RolesDescription roles={e.roles} />
          </td>
        </>
      )}
      rightHeaders={<>{canEditEvents && <th>Edit</th>}</>}
      rightColums={(e) => (
        <>
          {canEditEvents && (
            <td className="border border-slate-200 relative">
              <AdminButtons event={e} />
            </td>
          )}
        </>
      )}
    />
  );
};

const RolesDescription: React.FC<{
  roles?: Array<ScheduleEventDTOAllOfRoles>
}> = ({
  roles
}) => {
    if (!roles || roles.length === 0) {
      return <span className="italic text-slate-400">Unassigned</span>
    }
    return <div className="min-w-20">
      {roles.map(r => {
        if (r.covering) {
          return <div key={r.id}>{r.name} (covering: <PersonDisplayName person={r.covering} />)</div>;
        }
        if (r.coveredBy) {
          return <div key={r.id}><span className="line-through">{r.name}</span> (not required, covered by: <PersonDisplayName person={r.coveredBy} />)</div>;
        }
        if (r.shadowing) {
          return <div key={r.id}>{r.name} (shadowing: <PersonDisplayName person={r.shadowing} />)</div>;
        }
        if (r.shadowedBy) {
          return <div key={r.id}>{r.name} (shadowed by: {r.shadowedBy.map((p, i) => {
            if (i === 0) {
              return <PersonDisplayName person={p} key={i} />
            }
            return <span key={i}>, <PersonDisplayName person={p} key={i} /></span>
          })})</div>;
        }
        return <div key={r.id}>{r.name}</div>;
      })}
    </div>
  }

const AdminButtons: React.FC<{ event: ScheduleEventDTO }> = ({ event }) => {
  return (
    <div className="flex gap-2">
      <EditEventModal event={event} />
      <CloneEventModal event={event} />
      <DeleteEventModal event={event} />
    </div>
  );
};
