import { useQuery } from "@tanstack/react-query";
import { api } from "core/api";
import { RosterDTOEventsInner } from "core/api/generated";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { GapRow, Td } from "core/components/tables/tables";
import { TimeRangeWithCurtainsUp } from "core/dates/dateEventHelpers";
import { displayDate } from "domains/events/lib/displayDate";
import { processEvents } from "domains/events/lib/processEvents";
import { PersonDisplayName } from "domains/personnel/PersonDisplayName";
import sortBy from "lodash/sortBy";
import React, { Fragment } from "react";

import { AssignmentCell } from "./AssignmentCell";

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
              <th key={r.id} className="sticky top-0 bg-white z-40">
                <div>{r.name}</div>
                {r.person && <PersonDisplayName person={r.person} />}
              </th>
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
                      <Td className="w-40 sticky left-0 bg-white z-40">
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
                            roleId={r.id}
                            key={r.id}
                          />
                        );
                      })}
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
