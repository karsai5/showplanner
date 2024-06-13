import { ScheduleEventDTO } from "core/api/generated";
import { GapRow } from "core/components/tables/tables";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { processEvents } from "domains/events/lib/processEvents";
import sortBy from "lodash/sortBy";
import { FC, Fragment, useEffect, useRef, useState } from "react";

dayjs.extend(advancedFormat);

export type EventRendererType = FC<{
  event: ScheduleEventDTO;
  groupLength?: number;
}>;

export type DividerRendererType = FC<{
  event: ScheduleEventDTO;
  groupLength?: number;
}>;

export const NewEventTable: React.FC<{
  events: Array<ScheduleEventDTO>;
  headers: Array<string>;
  eventRenderer: EventRendererType;
  dividerRenderer?: DividerRendererType;
}> = ({
  events,
  headers,
  eventRenderer: EventRenderer,
  dividerRenderer: DividerRenderer,
}) => {
  const { dates, groupedEvents } = processEvents<ScheduleEventDTO>(events);
  const [numberOfColumns, setNumberOfColumns] = useState(0);
  const headerRowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (headerRowRef.current?.children.length) {
      setNumberOfColumns(headerRowRef.current.children.length);
    }
  }, [headerRowRef]);

  return (
    <div className="w-full">
      <table className="table w-full table-sm">
        <thead>
          <tr ref={headerRowRef}>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
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
                  if (e.options?.divider === true) {
                    return (
                      <GapRow length={numberOfColumns} key={i}>
                        <div className="flex gap-3 items-center -ml-3 -mr-3">
                          <div className="h-2 bg-slate-400 flex-1"></div>
                          <div className="text-center">
                            <strong>
                              {DividerRenderer ? (
                                <DividerRenderer event={e} />
                              ) : (
                                e.name
                              )}
                            </strong>
                          </div>
                          <div className="h-2 bg-slate-400 flex-1"></div>
                        </div>
                      </GapRow>
                    );
                  }
                  return (
                    <tr
                      key={e.id}
                      className="last:border-b first:border-t border-slate-200"
                    >
                      <EventRenderer
                        event={e}
                        groupLength={
                          i === 0 ? thisGroupEvents.length : undefined
                        }
                      />
                    </tr>
                  );
                })}
                {date.gapAfter &&
                  thisGroupEvents.slice(-1)[0].options?.divider !== true && (
                    <GapRow length={numberOfColumns} />
                  )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
