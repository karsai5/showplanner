import { EventNamer } from "@showplanner/common";
import cc from "classnames";
import Address from "core/components/Address/Address";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { getTimeRangeWithCurtainsUp } from "core/dates/dateEventHelpers";
import { useGetEvents } from "domains/events/lib/api";
import { displayDate } from "domains/events/lib/displayDate";
import { processEvents } from "domains/events/lib/processEvents";
import { useGetPeopleForShow } from "domains/personnel/lib/api";
import sortBy from "lodash/sortBy";
import Image from "next/image";
import { Fragment } from "react";

import { useAvailabilitiesForShow } from "../lib/api";
import { EventAvailabilities } from "../lib/types";

export const AvailabilitiesTable: React.FC<{ showId: string }> = ({
  showId,
}) => {
  const { events, isLoading } = useAvailabilitiesForShow(showId);
  const { people, isLoading: isLoadingPeople } = useGetPeopleForShow(showId);

  if (isLoading || isLoadingPeople) {
    return <progress className="progress w-full"></progress>;
  }
  if (events && people) {
    const showNamer = new EventNamer(
      "Show",
      events
        .filter((event) => event.curtainsUp)
        .map((e) => ({
          id: e.id as string,
          start: e.start as string,
        }))
    );
    const { dates, groupedEvents } = processEvents<EventAvailabilities>(events);
    return (
      <table className="table mt-6">
        <thead>
          <tr>
            <th></th>
            {people.map((person) => (
              <th key={person.id}>
                {person.firstname} {person.lastname}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dates.map((date) => {
            const thisGroupEvents = sortBy(
              groupedEvents[date.date.toString()],
              "start"
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
                        <Td rowSpan={thisGroupEvents.length}>
                          {displayDate(e.start)}
                        </Td>
                      )}
                      <Td>
                        <div className="flex gap-1">
                          {e.curtainsUp && (
                            <Image src="" height="20px" width="20px" />
                          )}
                          <span>{e.name || showNamer.getName(e.id)}</span>
                        </div>
                      </Td>
                      <Td>
                        {getTimeRangeWithCurtainsUp(
                          e.start,
                          e.end,
                          e.curtainsUp as any
                        )}
                      </Td>
                      <Td>{e.shortnote}</Td>
                    </tr>
                  );
                })}
                {date.gapAfter && <GapRow length={people.length + 1} />}
              </Fragment>
            );
          })}
          {events.map((event) => {
            return (
              <tr key={event.id}>
                <td>{event.name}</td>
                {people.map((person) => {
                  const availability = event.availabilites.find(
                    (a) => a.personId === person.id
                  );
                  return (
                    <td key={person.id}>
                      {availability?.availability ? "yes" : "no"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return <ErrorBox>Something went wrong loading availabilities</ErrorBox>;
};

const Td: React.FC<{
  children: React.ReactNode;
  rowSpan?: number;
  className?: string;
}> = ({ children, rowSpan, className }) => {
  return (
    <td
      className={cc("border-l border-slate-200 last:border-r", className)}
      rowSpan={rowSpan}
    >
      {children}
    </td>
  );
};

const GapRow = ({ length }: { length: number }) => (
  <tr>
    <td colSpan={length}></td>
  </tr>
);
