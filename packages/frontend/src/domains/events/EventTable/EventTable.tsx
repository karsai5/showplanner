import cc from "classnames";
import { ScheduleEventDTO } from "core/api/generated";
import Address from "core/components/Address/Address";
import { getTimeRangeWithCurtainsUp } from "core/dates/dateEventHelpers";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import theatreIcons from "domains/events/images/theatre.png";
import { displayDate } from "domains/events/lib/displayDate";
import { processEvents } from "domains/events/lib/processEvents";
import sortBy from "lodash/sortBy";
import Image from "next/image";
import { FC, Fragment, ReactNode } from "react";

dayjs.extend(advancedFormat);

export enum eventTableDefaultHeaders {
  Name = "Name",
  Time = "Time",
  Location = "Location",
  Note = "Note",
}

const GapRow = ({ length }: { length: number }) => (
  <tr>
    <td colSpan={length}></td>
  </tr>
);

export type FieldOptions = {
  header: string;
  position: "left" | "right";
  render: FC<{ event: ScheduleEventDTO }>;
  className?: (event: ScheduleEventDTO) => string | string;
  noPadding?: boolean;
};

export const EventTable: React.FC<{
  events: Array<ScheduleEventDTO>;
  leftColums?: (e: ScheduleEventDTO) => ReactNode,
  leftHeaders?: ReactNode,
  rightColums?: (e: ScheduleEventDTO) => ReactNode,
  rightHeaders?: ReactNode,
  numberOfExtraHeaders?: number;
  hideLocation?: boolean;
  hideNote?: boolean;
}> = ({ events, leftColums, leftHeaders = null, rightColums, rightHeaders = null, numberOfExtraHeaders = 0,
  hideLocation = false, hideNote = false }) => {

    const { dates, groupedEvents } = processEvents<ScheduleEventDTO>(events);

    return (
      <div className="w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Date</th>
              {leftHeaders}
              <th>Name</th>
              <th>Time</th>
              {!hideLocation && <th>Location</th>}
              {!hideNote && <th>Note</th>}
              {rightHeaders}
            </tr>
          </thead>
          <tbody>
            {dates.map((date) => {
              const thisGroupEvents = sortBy(
                groupedEvents[date.date.toString()],
                "start", "curtainsUp"
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
                          <Td className="whitespace-nowrap" rowSpan={thisGroupEvents.length}>
                            {displayDate(e.start)}
                          </Td>
                        )}
                        {leftColums && leftColums(e)}
                        <Td>
                          <div className="flex gap-1 items-center">
                            {e.curtainsUp && (
                              <div className="mr-2 w-5">
                                <Image
                                  alt="Theatre"
                                  src={theatreIcons}
                                  height="20"
                                  width="20"
                                />
                              </div>
                            )}
                            <span className="whitespace-nowrap">{e.name}</span>
                          </div>
                        </Td>
                        <Td className="whitespace-nowrap">
                          {getTimeRangeWithCurtainsUp(
                            e.start,
                            e.end,
                            e.curtainsUp as any
                          )}
                        </Td>
                        {!hideLocation && <Td>{e.address && <div className="min-w-60"><Address address={e?.address} /></div>}</Td>}
                        {!hideNote && <Td>{e.shortnote}</Td>}
                        {rightColums && rightColums(e)}
                      </tr>
                    );
                  })}
                  {date.gapAfter && <GapRow length={4 + numberOfExtraHeaders} />}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
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
