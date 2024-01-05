import cc from "classnames";
import { EventDTO } from "core/api/generated";
import Address from "core/components/Address/Address";
import { getTimeRangeWithCurtainsUp } from "core/dates/dateEventHelpers";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import sortBy from "lodash/sortBy";
import Image from "next/image";
import { Fragment, ReactNode } from "react";

import theatreIcons from "../images/theatre.png";
import { displayDate } from "../lib/displayDate";
import { processEvents } from "../lib/processEvents";

dayjs.extend(advancedFormat);

export enum eventTableDefaultHeaders {
  Date = "Date",
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
  render: (event: EventDTO) => ReactNode;
  className?: (event: EventDTO) => string | string;
};

export const EventTable: React.FC<{
  events: Array<EventDTO>;
  extraFieldOptions?: Array<FieldOptions>;
  hideHeaders?: Array<string>;
}> = ({ events, extraFieldOptions, hideHeaders = [] }) => {

  const leftExtraFieldOptions =
    extraFieldOptions?.filter((option) => option.position === "left") || [];
  const rightExtraFieldOptions =
    extraFieldOptions?.filter((option) => option.position === "right") || [];

  const headers = [
    ...leftExtraFieldOptions.map((option) => option.header),
    ...Object.values(eventTableDefaultHeaders),
    ...rightExtraFieldOptions.map((option) => option.header),
  ].filter(h => !hideHeaders.includes(h));
  console.log('headers', headers);

  const { dates, groupedEvents } = processEvents<EventDTO>(events);

  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full mt-6">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i}>{h}</th>
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
                      {leftExtraFieldOptions.map((option) => (
                        <Td
                          key={e.id}
                          className={getClassNameFromOption(option, e)}
                        >
                          {option.render(e)}
                        </Td>
                      ))}
                      {i === 0 && (
                        <Td className="whitespace-nowrap" rowSpan={thisGroupEvents.length}>
                          {displayDate(e.start)}
                        </Td>
                      )}
                      <Td>
                        <div className="flex gap-1 items-center">
                          {e.curtainsUp && (
                            <div className="mr-2">
                              <Image
                                alt="Theatre"
                                src={theatreIcons}
                                height="20px"
                                width="20px"
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
                      {headers.includes(eventTableDefaultHeaders.Location) &&
                        <Td>
                          <Address address={e?.address} />
                        </Td>}
                      {headers.includes(eventTableDefaultHeaders.Note) &&
                        <Td>{e.shortnote}</Td>}
                      {rightExtraFieldOptions.map((option) => (
                        <Td
                          key={e.id}
                          className={getClassNameFromOption(option, e)}
                        >
                          {option.render(e)}
                        </Td>
                      ))}
                    </tr>
                  );
                })}
                {date.gapAfter && <GapRow length={headers.length} />}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const getClassNameFromOption = (
  option: FieldOptions,
  event: EventDTO
) => {
  const className = option.className;
  switch (typeof className) {
    case "function":
      return className(event);
    case "string":
      return className;
    default:
      return undefined;
  }
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
