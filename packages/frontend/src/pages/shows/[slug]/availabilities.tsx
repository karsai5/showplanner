import { useQuery } from "@tanstack/react-query";
import cc from "classnames";
import { api } from "core/api";
import {
  AvailabilitiesDTOEventsInner,
  PersonSummaryDTO,
} from "core/api/generated";
import { AccessDenied } from "core/components/AccessDenied/AccessDenied";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { Td } from "core/components/tables/tables";
import { TimeRangeWithCurtainsUpCell } from "core/components/tables/TimeRangeWithCurtainsUp";
import { H2 } from "core/components/Typography";
import { PERMISSION, showPermission } from "core/permissions";
import {
  EventRendererType,
  EventTable,
} from "domains/events/EventTable/EventTable";
import { displayDate } from "domains/events/lib/displayDate";
import { getBgColor, getStringFromBoolean } from "domains/rostering/helpers";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Head from "next/head";
import React, { ReactElement } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { PermissionClaim } from "supertokens-auth-react/recipe/userroles";

AvailabilitiesPage.getLayout = (page: ReactElement) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default function AvailabilitiesPage() {
  const show = useShowSummary();
  return (
    <SessionAuth
      accessDeniedScreen={AccessDenied}
      overrideGlobalClaimValidators={(globalValidators) => [
        ...globalValidators,
        PermissionClaim.validators.includes(
          showPermission(show?.id, PERMISSION.rostering)
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
}

const AvailabilitiesTable: React.FC<{ showId: number }> = ({ showId }) => {
  const { data, isLoading, isError } = useQuery(
    ["ShowAvailabilities", showId],
    () => api.availabilitiesGet({ showId: showId })
  );
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
            className={cc(getBgColor(getStringFromBoolean(a.available)))}
          >
            {a.available ? "Yes" : "No"}
          </Td>
        );
      })}
    </>
  );
};
