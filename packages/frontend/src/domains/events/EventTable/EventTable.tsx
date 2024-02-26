import { ScheduleEventDTO } from 'core/api/generated';
import Address from 'core/components/Address/Address';
import { GapRow, Td } from 'core/components/tables/tables';
import { TimeRangeWithCurtainsUp } from 'core/dates/dateEventHelpers';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { displayDate } from 'domains/events/lib/displayDate';
import { processEvents } from 'domains/events/lib/processEvents';
import sortBy from 'lodash/sortBy';
import { FC, Fragment, ReactNode } from 'react';

dayjs.extend(advancedFormat);

export enum eventTableDefaultHeaders {
  Name = 'Name',
  Time = 'Time',
  Location = 'Location',
  Note = 'Note',
}

export type FieldOptions = {
  header: string;
  position: 'left' | 'right';
  render: FC<{ event: ScheduleEventDTO }>;
  className?: (event: ScheduleEventDTO) => string | string;
  noPadding?: boolean;
};

export const EventTable: React.FC<{
  events: Array<ScheduleEventDTO>;
  leftColums?: (e: ScheduleEventDTO) => ReactNode;
  leftHeaders?: ReactNode;
  rightColums?: (e: ScheduleEventDTO) => ReactNode;
  rightHeaders?: ReactNode;
  numberOfExtraHeaders?: number;
  hideLocation?: boolean;
  hideNote?: boolean;
}> = ({
  events,
  leftColums,
  leftHeaders = null,
  rightColums,
  rightHeaders = null,
  numberOfExtraHeaders = 0,
  hideLocation = false,
  hideNote = false,
}) => {
  const { dates, groupedEvents } = processEvents<ScheduleEventDTO>(events);

  return (
    <div className="w-full">
      <table className="table w-full table-sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            {leftHeaders}
            {!hideLocation && <th>Location</th>}
            {!hideNote && <th>Note</th>}
            {rightHeaders}
          </tr>
        </thead>
        <tbody>
          {dates.map((date) => {
            const thisGroupEvents = sortBy(
              groupedEvents[date.date.toString()],
              'start',
              'curtainsUp',
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
                          className="whitespace-nowrap"
                          rowSpan={thisGroupEvents.length}
                        >
                          {displayDate(e.start)}
                        </Td>
                      )}
                      <Td>
                        <TimeRangeWithCurtainsUp event={e} />
                      </Td>
                      {leftColums && leftColums(e)}
                      {!hideLocation && (
                        <Td>
                          {e.address && (
                            <div className="min-w-60">
                              <Address address={e?.address} />
                            </div>
                          )}
                        </Td>
                      )}
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
