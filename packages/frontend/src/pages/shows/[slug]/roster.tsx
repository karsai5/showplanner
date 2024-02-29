import { useQuery } from '@tanstack/react-query';
import cc from 'classnames';
import { api } from 'core/api';
import { RosterDTOEventsInner } from 'core/api/generated';
import { AccessDenied } from 'core/components/AccessDenied/AccessDenied';
import ErrorBox from 'core/components/ErrorBox/ErrorBox';
import { GapRow, Td } from 'core/components/tables/tables';
import { H2 } from 'core/components/Typography';
import { TimeRangeWithCurtainsUp } from 'core/dates/dateEventHelpers';
import { PERMISSION, showPermission } from 'core/permissions';
import { displayDate } from 'domains/events/lib/displayDate';
import { processEvents } from 'domains/events/lib/processEvents';
import { getBgColorForRoster, getStringFromBoolean } from 'domains/rostering/helpers';
import { LayoutWithShowSidebar } from 'domains/shows/LayoutForShow';
import { useShowSummary } from 'domains/shows/lib/summaryContext';
import sortBy from 'lodash/sortBy';
import Head from 'next/head';
import React, { Fragment, ReactElement } from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { PermissionClaim } from 'supertokens-auth-react/recipe/userroles';

const ShowPage = () => {
  const show = useShowSummary();
  return (
    <SessionAuth
      accessDeniedScreen={AccessDenied}
      overrideGlobalClaimValidators={(globalValidators) => [
        ...globalValidators,
        PermissionClaim.validators.includes(
          showPermission(show?.id, PERMISSION.rostering),
        ),
      ]}
    >
      <Head>
        <title>Availabilities - {show.name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col justify-between sm:flex-row gap-4">
        <H2 className="mb-4">{show.name} - Availabilities</H2>
      </div>
      <AvailabilitiesTable showId={show.id} />
    </SessionAuth>
  );
};

const AvailabilitiesTable: React.FC<{ showId: number }> = ({ showId }) => {
  const { data, isLoading, isError } = useQuery(
    ['ShowAvailabilities', showId],
    () => api.rosterGet({ showId: showId })
  );
  if (isError) {
    return <ErrorBox>Could not get shows</ErrorBox>;
  }
  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }
  if (data) {
    const { dates, groupedEvents } =
      processEvents<RosterDTOEventsInner>(data.events);
    return (
      <div className="overflow-x-auto">
        <table className="table table-sm w-full">
          <thead>
            <tr>
              <th></th>
              <th></th>
              {data.roles?.map((r) => (
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
                        {e.assignments?.map((a, i) => {
                          if (a === null) {
                            return <Td key={i}>Unknown</Td>;
                          }
                          return (
                            <Td
                              key={i}
                              className={cc(
                                getBgColorForRoster(a.available),
                              )}
                            >
                              {a.person && <>
                                <div>{a.person.firstName} {a.person.lastName}</div>
                                <div>Available: {getStringFromBoolean(a.available)}</div>
                              </>}
                            </Td>
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
      </div>
    );
  }
  return null;
};

ShowPage.getLayout = (page: ReactElement) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default ShowPage;