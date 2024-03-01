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
import { getBgColorForRoster, getStringFromBoolean } from 'domains/rostering/helpers';
import sortBy from 'lodash/sortBy';
import React, { Fragment } from 'react';

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
      <div className="overflow-x-auto">
        <table className="table table-sm w-full">
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
      </div>
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
      throw new Error();
    },
    onError: (e) => {
      showToastError("Could not update availability", e);
    },
    onSuccess: async () => {
      // TODO: This should be optimised to just reload the cell instead of the whole table
      queryClient.invalidateQueries({ queryKey: ['roster', showId] });
    },
  });

  const handleChange = (person: PersonSummaryDTO) => {
    changeAssignmentMutation.mutate(person.id);
  }

  return <Td
    className={cc(
      getBgColorForRoster(assignment.available),
    )}
  >
    {assignment.person && <>
      <div>{assignment.person.firstName} {assignment.person.lastName}</div>
      <div>Available: {getStringFromBoolean(assignment.available)}</div>
      <div>Cover: {assignment.cover ? 'Yes' : 'No'}</div>
      {assignedPeopleRequest.data?.people &&
        <PersonSelector
          loading={changeAssignmentMutation.isLoading}
          people={assignedPeopleRequest.data.people}
          selectedPersonId={assignment.person.id}
          onChange={handleChange}
        />}
    </>}
  </Td>
}
