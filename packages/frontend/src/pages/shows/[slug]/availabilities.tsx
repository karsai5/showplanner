import { useQuery } from "@tanstack/react-query";
import cc from "classnames";
import { api, serverSideApi } from "core/api";
import {
  AvailabilitiesDTOEventsInner,
  AvailabilityDTO,
  PersonSummaryDTO,
  ShowDTO,
} from "core/api/generated";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { Td } from "core/components/tables/tables";
import { TimeRangeWithCurtainsUpCell } from "core/components/tables/TimeRangeWithCurtainsUp";
import { H2 } from "core/components/Typography";
import {
  PERMISSION,
  PermissionRequired,
  showPermission,
} from "core/permissions";
import { getSSRErrorReturn } from "core/utils/ssr";
import {
  EventRendererType,
  EventTable,
} from "domains/events/EventTable/EventTable";
import { displayDate } from "domains/events/lib/displayDate";
import { getBgColor, getStringFromBoolean } from "domains/rostering/helpers";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React from "react";
import superjson from "superjson";

export default function AvailabilitiesPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { show } = props;
  return (
    <PermissionRequired
      permission={showPermission(show?.id, PERMISSION.rostering)}
    >
      <Head>
        <title>Availabilities - {show.name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col justify-between sm:flex-row gap-4">
        <H2 className="mb-4">{show.name} - Availabilities</H2>
      </div>
      <AvailabilitiesTable
        showId={show.id}
        initalData={superjson.parse<AvailabilityDTO>(props.dataJSON)}
      />
    </PermissionRequired>
  );
}

export const getServerSideProps = (async (context) => {
  const slug = context.query.slug;
  const ssrApi = serverSideApi(context);

  if (typeof slug !== "string") {
    throw new Error("Incorrect slug format");
  }

  try {
    const show = await ssrApi.showsShowSlugSummaryGet({
      showSlug: slug,
    });
    const data = await ssrApi.availabilitiesGet({ showId: show.id });
    return {
      props: { show, dataJSON: superjson.stringify(data) },
    };
  } catch (err) {
    return getSSRErrorReturn(err);
  }
}) satisfies GetServerSideProps<{ show: ShowDTO; dataJSON: string }>;

const AvailabilitiesTable: React.FC<{
  showId: number;
  initalData: AvailabilityDTO;
}> = ({ showId, initalData }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Show", "Availabilities"],
    queryFn: () => api.availabilitiesGet({ showId }),
    initialData: initalData,
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
