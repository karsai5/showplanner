import { useQuery } from "@tanstack/react-query";
import { api } from "core/api";
import { RoleDTO, RosterDTOEventsInner } from "core/api/generated";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { GapRow, Td } from "core/components/tables/tables";
import { TimeRangeWithCurtainsUp } from "core/components/tables/TimeRangeWithCurtainsUp";
import { displayDate } from "domains/events/lib/displayDate";
import { processEvents } from "domains/events/lib/processEvents";
import { PersonDisplayName } from "domains/personnel/PersonDisplayName";
import sortBy from "lodash/sortBy";
import React, { Fragment } from "react";

import { AssignmentCell } from "./AssignmentCell";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Toggle } from "core/toggles/toggles";
import { AddRoleModal } from "../AddRoleModal/AddRoleModal";
import { HasPermission, PERMISSION } from "core/permissions";

export const RosterTable: React.FC<{ showId: number }> = ({ showId }) => {
  const rosterRequest = useQuery(["roster", showId], () =>
    api.rosterGet({ showId: showId })
  );

  if (rosterRequest.isError) {
    return <ErrorBox>Could not get shows</ErrorBox>;
  }
  if (rosterRequest.isLoading) {
    return <progress className="progress w-56"></progress>;
  }
  if (rosterRequest.data) {
    const roster = rosterRequest.data;
    const { dates, groupedEvents } = processEvents<RosterDTOEventsInner>(
      roster.events
    );
    return (
      <table className="table table-sm">
        <thead>
          <tr>
            <th></th>
            <th></th>
            {roster.roles?.map((r) => (
              <RosterName key={r.id} role={r} />
            ))}
          </tr>
        </thead>
        <tbody>
          {dates.map((date) => {
            const thisGroupEvents = sortBy(
              groupedEvents[date.date.toString()],
              "start",
              "curtainsUp"
            );
            return (
              <Fragment key={date.date.toString()}>
                {thisGroupEvents.map((e, i) => {
                  return (
                    <tr
                      key={e.id}
                      className="last:border-b first:border-t border-slate-200"
                    >
                      {i === 0 && (
                        <Td
                          className="whitespace-nowrap w-20"
                          rowSpan={thisGroupEvents.length}
                        >
                          {displayDate(e.start)}
                        </Td>
                      )}
                      <Td className="w-40 sticky left-0 bg-white z-30 pl-0">
                        <TimeRangeWithCurtainsUp event={e} />
                      </Td>
                      {roster.roles?.map((r) => {
                        if (r.id === undefined || e.assignments === undefined) {
                          throw new Error();
                        }
                        const a = e.assignments[r.id];
                        return (
                          <AssignmentCell
                            assignment={a}
                            showId={showId}
                            event={e}
                            role={r}
                            key={r.id}
                          />
                        );
                      })}
                      <HasPermission
                        showId={showId}
                        permission={PERMISSION.rostering}
                      >
                        {i === 0 && (
                          <Td
                            className="whitespace-nowrap"
                            rowSpan={thisGroupEvents.length}
                          >
                            <div className="flex justify-center">
                              <AddRoleModal
                                showId={showId}
                                className="btn-outline text-slate-500"
                              />
                            </div>
                          </Td>
                        )}
                      </HasPermission>
                    </tr>
                  );
                })}
                {date.gapAfter && <GapRow length={4} />}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    );
  }
  return null;
};

const RosterName: React.FC<{ role: RoleDTO }> = ({ role }) => {
  return (
    <th className="sticky top-0 bg-white z-40">
      <div className="flex gap-2 justify-between">
        <div>
          <div>{role.name}</div>
          {role.person && <PersonDisplayName person={role.person} />}
        </div>
        <Toggle toggle="role_dropdown">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              <EllipsisHorizontalIcon className="h-6 w-6" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Rename</a>
              </li>
              <li>
                <a>Unassign</a>
              </li>
              <li>
                <a>Delete role</a>
              </li>
            </ul>
          </div>
        </Toggle>
      </div>
    </th>
  );
};
