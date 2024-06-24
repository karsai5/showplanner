import { useQuery } from "@tanstack/react-query";
import cc from "classnames";
import { api } from "core/api";
import {
  AvailabilitiesDTO,
  AvailabilitiesDTOEventsInner,
  PersonSummaryDTO,
} from "core/api/generated";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { Td } from "core/components/tables/tables";
import { TimeRangeWithCurtainsUpCell } from "core/components/tables/TimeRangeWithCurtainsUp";
import {
  EventRendererType,
  EventTable,
} from "domains/events/EventTable/EventTable";
import { displayDate } from "domains/events/lib/displayDate";
import { getBgColor, getStringFromBoolean } from "domains/rostering/helpers";
import React from "react";

export const AvailabilitiesTable: React.FC<{
  showId: number;
  initialData: AvailabilitiesDTO;
}> = ({ showId, initialData }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Show", showId],
    queryFn: () => api.availabilitiesGet({ showId }),
    initialData,
  });
  if (isError) {
    return <ErrorBox>Could not get shows</ErrorBox>;
  }
  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }
  if (data.events && data.people) {
    return (
      <EventTable
        events={data.events}
        headers={<Headers people={data.people} />}
        eventRenderer={EventRenderer}
      />
    );
  }
  return null;
};

const Headers: React.FC<{ people: Array<PersonSummaryDTO> }> = ({ people }) => {
  return (
    <>
      <th></th>
      <th></th>
      {people.map((p) => (
        <th key={p.id} className="sticky top-0 bg-white z-40">
          {p.firstName} {p.lastName}
        </th>
      ))}
    </>
  );
};

const EventRenderer: EventRendererType<AvailabilitiesDTOEventsInner> = ({
  event: e,
  groupLength,
}) => {
  const attendanceRequired = !!e.options?.attendanceRequired;
  return (
    <>
      {groupLength && (
        <Td className="whitespace-nowrap" rowSpan={groupLength}>
          {displayDate(e.start)}
        </Td>
      )}
      <TimeRangeWithCurtainsUpCell event={e} />
      {e.availabilities?.map((a, i) => {
        if (a === null) {
          return (
            <Td key={i} className="italic text-slate-400">
              Unknown
            </Td>
          );
        }
        return (
          <Td
            key={i}
            className={cc(
              getBgColor(getStringFromBoolean(a.available), {
                alternateColors: attendanceRequired,
              })
            )}
          >
            {a.available
              ? attendanceRequired
                ? "Attending"
                : "Yes"
              : attendanceRequired
              ? "Not attending"
              : "No"}
          </Td>
        );
      })}
    </>
  );
};
