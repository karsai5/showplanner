import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import cc from 'classnames';
import { api } from 'core/api';
import { PersonSummaryDTO, RosterAssignedDTO, RosterDTOEventsInner } from 'core/api/generated';
import ErrorBox from 'core/components/ErrorBox/ErrorBox';
import { GapRow, Td } from 'core/components/tables/tables';
import { TimeRangeWithCurtainsUp } from 'core/dates/dateEventHelpers';
import { showToastError } from 'core/utils/errors';
import { displayDate } from 'domains/events/lib/displayDate';
import { processEvents } from 'domains/events/lib/processEvents';
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
              <th key={r.id}>
                <div>{r.name}</div>
                {r.person && <div>{r.person.firstName} {r.person.lastName}</div>}
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
                      <Td className="w-40">
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
                            eventId={e.id}
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

export const AssignmentCell: React.FC<{ assignment: RosterAssignedDTO, showId: number, eventId: number, roleId: number }> = ({
  assignment,
  showId,
  eventId,
  roleId,
}) => {
  const assignedPeopleRequest = useQuery(
    ['assigned-people', showId],
    () => api.personnelAssignedGet({ showId: showId }),
  );

  const [showPersonDropdown, setShowPersonDropdown] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const changeAssignmentMutation = useMutation<unknown, Error, string | undefined>({
    mutationFn: (personId) => {
      if (!personId && assignment.assignmentId) {
        return api.assignmentIdDelete({ id: assignment.assignmentId })
      }
      if (personId) {
        if (assignment.assignmentId) {
          return api.assignmentIdPut({
            id: assignment.assignmentId, assignment: {
              personId: personId,
            }
          });
        }
        return api.assignmentPost({
          assignment: {
            eventId,
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

  const handleChange = (person: PersonSummaryDTO) => {
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
    onClick={() => showPersonDropdown ? undefined : setShowPersonDropdown(true)}
    tabIndex={0}
    onKeyDown={handleKeyPress}
  >
    {!showPersonDropdown && <div className="flex">
      {!assignment.person?.id && <span className="italic">Unassigned</span>}
      {assignment.person?.id && <>
        {assignment.cover && <><div className="w-5"></div><div className="cover-box bg-orange-400">cover</div></>}
        <div>{assignment.person.firstName} {assignment.person.lastName}</div>
      </>}
    </div>}
    {showPersonDropdown && assignedPeopleRequest.data?.people &&
      <PersonSelector
        loading={changeAssignmentMutation.isLoading}
        people={assignedPeopleRequest.data.people}
        selectedPersonId={assignment.person.id}
        onChange={handleChange}
        openOnLoad={true}
      />}
  </Td>
}
