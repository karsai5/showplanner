import { Popover } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import cc from 'classnames';
import { api } from 'core/api';
import { PersonSummaryDTO, RosterAssignedDTO, RosterDTOEventsInner } from 'core/api/generated';
import ErrorBox from 'core/components/ErrorBox/ErrorBox';
import { GapRow, Td } from 'core/components/tables/tables';
import { TimeRangeWithCurtainsUp } from 'core/dates/dateEventHelpers';
import { Toggle } from 'core/toggles/toggles';
import { showToastError } from 'core/utils/errors';
import { displayDate } from 'domains/events/lib/displayDate';
import { processEvents } from 'domains/events/lib/processEvents';
import { PersonDisplayName } from 'domains/personnel/PersonDisplayName';
import { PersonSelector } from 'domains/personnel/PersonSelector/PersonSelector';
import { getBgColorForRoster } from 'domains/rostering/helpers';
import sortBy from 'lodash/sortBy';
import { KeyboardEventHandler } from 'react';
import React, { Fragment, useState } from 'react';

export const RosterTable: React.FC<{ showId: number }> = ({ showId }) => {
  const rosterRequest = useQuery(
    ['roster', showId],
    () => api.rosterGet({ showId: showId })
  );

  if (rosterRequest.isError) {
    return <ErrorBox>Could not get shows</ErrorBox>;
  }
  if (rosterRequest.isLoading) {
    return <progress className="progress w-56"></progress>;
  }
  if (rosterRequest.data) {
    const roster = rosterRequest.data;
    const { dates, groupedEvents } =
      processEvents<RosterDTOEventsInner>(roster.events);
    return (
      <table className="table table-sm">
        <thead>
          <tr>
            <th></th>
            <th></th>
            {roster.roles?.map((r) => (
              <th key={r.id} className="sticky top-0 bg-white z-50">
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
                          className="whitespace-nowrap w-20"
                          rowSpan={thisGroupEvents.length}
                        >
                          {displayDate(e.start)}
                        </Td>
                      )}
                      <Td className="w-40 sticky left-0 bg-white z-50">
                        <TimeRangeWithCurtainsUp event={e} />
                      </Td>
                      {
                        roster.roles?.map(r => {
                          if (r.id === undefined || e.assignments === undefined) {
                            throw new Error();
                          }
                          const a = e.assignments[r.id];
                          return <AssignmentCell
                            assignment={a}
                            showId={showId}
                            event={e}
                            roleId={r.id}
                            key={r.id}
                          />
                        })
                      }
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

export const AssignmentCell: React.FC<{
  assignment: RosterAssignedDTO,
  showId: number,
  event: RosterDTOEventsInner,
  roleId: number
}> = ({
  assignment,
  showId,
  event,
  roleId,
}) => {
    const assignedPeopleRequest = useQuery(
      ['assigned-people', showId],
      () => api.personnelAssignedGet({ showId: showId }),
    );

    const [showPersonDropdown, setShowPersonDropdown] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const changeAssignmentMutation = useMutation<unknown, Error, string>({
      mutationFn: (personId) => {
        if (personId === '' && assignment.assignmentId) {
          return api.assignmentIdDelete({ id: assignment.assignmentId })
        }
        if (personId !== '') {
          if (assignment.assignmentId) {
            return api.assignmentIdPut({
              id: assignment.assignmentId, assignment: {
                personId: personId,
              }
            });
          }
          return api.assignmentPost({
            assignment: {
              eventId: event.id,
              personId: personId,
              roleId,
            }
          });
        }
        return new Promise((res) => res(undefined));
      },
      onError: (e) => {
        showToastError("Could not update availability", e);
      },
      onSuccess: async () => {
        // TODO: This should be optimised to just reload the cell instead of the whole table
        queryClient.invalidateQueries({ queryKey: ['roster', showId] });
        setShowPersonDropdown(false);
      },
    });

    const NameComponent: React.FC<{ person: PersonSummaryDTO }> = ({ person }) => {
      const availability = event.availabilities?.[person?.id || ''];
      return <p className={cc({
        ['line-through']: person.id && availability?.available === false,
        ['text-slate-300']: person.id && availability?.available === undefined || availability?.available === null,
      })}>
        <PersonDisplayName person={person} />
      </p>
    }

    const handlePersonChange = (person: PersonSummaryDTO) => {
      if (person.id === assignment.person.id) {
        setShowPersonDropdown(false);
      } else {
        changeAssignmentMutation.mutate(person.id);
      }
    }

    let bgClassName = '';
    if (assignment.person?.id) {
      bgClassName = getBgColorForRoster(assignment.available);
    }

    const handleKeyPress: KeyboardEventHandler = (event) => {
      if (event.code === "Space") {
        setShowPersonDropdown(true);
      }
    }

    return <Td
      className={cc(bgClassName, "relative min-w-40")}
    >
      <div className='flex justify-between items-center gap-2'>
        {!showPersonDropdown && <div className="flex"
          onClick={() => setShowPersonDropdown(true)}
          onKeyDown={handleKeyPress}
          tabIndex={0}
        >
          {!assignment.person?.id && <span className="italic text-slate-400">Unassigned</span>}
          {assignment.person?.id && <>
            {assignment.cover && <><div className="w-5"></div><div className="cover-box bg-orange-400">cover</div></>}
            <PersonDisplayName person={assignment.person} />
          </>}
        </div>}
        {showPersonDropdown && assignedPeopleRequest.data?.people &&
          <PersonSelector
            loading={changeAssignmentMutation.isLoading}
            people={assignedPeopleRequest.data.people}
            selectedPersonId={assignment.person.id}
            onChange={handlePersonChange}
            openOnLoad={true}
            nameComponent={NameComponent}
          />}
        <Toggle key="availabilities_menu">
          <Popover className="relative">
            <Popover.Button className='btn btn-sm btn-ghost'><EllipsisHorizontalIcon className='h-6 w-6' /></Popover.Button>
            <Popover.Panel as='li' className="absolute z-10 menu bg-white shadow-lg ring-1 ring-black/5 w-40 rounded-box">
              <li><a>Assign Shadow</a></li>
              <li><a>Role Not Required</a></li>
            </Popover.Panel>
          </Popover>
        </Toggle>
      </div>
    </Td>
  }
