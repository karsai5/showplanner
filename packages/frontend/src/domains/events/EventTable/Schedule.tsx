import cc from "classnames";
import {
  PersonSummaryDTO,
  ScheduleEventDTO,
  ScheduleEventDTOAllOfRoles,
  ScheduleEventDTOAllOfRolesTypeEnum,
} from "core/api/generated";
import { PERMISSION, showPermission, useHasPermission } from "core/permissions";
import { PersonDisplayName } from "domains/personnel/PersonDisplayName";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

import { AvailabilityDropdown } from "./components/AvailabilityDropdown";
import { EventTable } from "./EventTable";
import { CloneEventModal } from "./modals/CloneEventModal";
import { DeleteEventModal } from "./modals/DeleteEventModal";
import { EditEventModal } from "./modals/EditEventModal";

export const Schedule: React.FC<React.ComponentProps<typeof EventTable>> = (
  props
) => {
  const show = useShowSummary();
  const canEditEvents = useHasPermission()(
    showPermission(show.id, PERMISSION.addEvents)
  );
  const path = usePathname();

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
            <RolesDescription roles={e.roles} isShow={!!e.curtainsUp} />
          </td>
        </>
      )}
      rightHeaders={
        <>
          {canEditEvents && (
            <>
              <th>Actions</th>
              <th>Edit</th>
            </>
          )}
        </>
      }
      rightColums={(e) => (
        <>
          {canEditEvents && (
            <>
              <td className="border border-slate-200 relative">
                <div className="flex gap-2">
                  <Link
                    href={`${path}/event/${e.id}/showreport`}
                    className={cc("link whitespace-nowrap", {
                      ["text-slate-400"]: !e.showReport,
                    })}
                  >
                    Show report
                  </Link>
                  <Link
                    href={`${path}/event/${e.id}/showtimer`}
                    className={cc("link whitespace-nowrap", {
                      ["text-slate-400"]: !e.showTimer,
                    })}
                  >
                    Show timer
                  </Link>
                </div>
              </td>
              <td className="border border-slate-200 relative">
                <AdminButtons event={e} />
              </td>
            </>
          )}
        </>
      )}
    />
  );
};

const RolesDescription: React.FC<{
  roles?: Array<ScheduleEventDTOAllOfRoles>;
  isShow?: boolean;
}> = ({ roles, isShow }) => {
  if (!roles || roles.length === 0) {
    if (isShow) {
      return <span className="italic text-slate-400">Not required</span>;
    }
    return null;
  }
  return (
    <div className="min-w-20">
      {roles.map((r) => {
        return (
          <div
            key={`${r.id}-${r.type}`}
            className={cc({ ["italic text-slate-400"]: r.coveredBy })}
          >
            <span className={cc({ ["line-through"]: r.coveredBy })}>
              {r.name}
            </span>
            {r.coveredBy && (
              <>
                {" "}
                Not required, covered by{" "}
                <PersonDisplayName person={r.coveredBy} />
              </>
            )}
            {r.type === ScheduleEventDTOAllOfRolesTypeEnum.Covering && (
              <>
                {" "}
                (Covering
                <OptionalDisplayName person={r.covering} />)
              </>
            )}
            {r.type === ScheduleEventDTOAllOfRolesTypeEnum.Shadowing && (
              <>
                {" "}
                (Shadowing
                <OptionalDisplayName person={r.shadowing} />)
              </>
            )}
            {r.shadowedBy && (
              <>
                {" "}
                (Shadowed by{" "}
                {r.shadowedBy.map((s, i) => {
                  if (i === 0) {
                    return <PersonDisplayName key={i} person={s} />;
                  }
                  return (
                    <span key={i}>
                      , <PersonDisplayName person={s} />
                    </span>
                  );
                })}
                )
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

const OptionalDisplayName: FC<{ person?: PersonSummaryDTO }> = ({ person }) => {
  if (!person) {
    return null;
  }
  return (
    <>
      {" "}
      <PersonDisplayName person={person} />
    </>
  );
};

const AdminButtons: FC<{ event: ScheduleEventDTO }> = ({ event }) => {
  return (
    <div className="flex">
      <EditEventModal event={event} />
      <CloneEventModal event={event} />
      <DeleteEventModal event={event} />
    </div>
  );
};
