import { useQuery } from "@tanstack/react-query";
import { getApi } from "core/api";
import { EventPublicDTO } from "core/api/generated";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { Td } from "core/components/tables/tables";
import { TimeRangeWithCurtainsUpCell } from "core/components/tables/TimeRangeWithCurtainsUp";
import { H2 } from "core/components/Typography";
import {
  EventRendererType,
  EventTable,
} from "domains/events/EventTable/EventTable";
import { displayDate } from "domains/events/lib/displayDate";
import Head from "next/head";
import { useRouter } from "next/router";

const ShowPage = () => {
  const api = getApi();
  const {
    query: { slug },
  } = useRouter();
  const { data, isLoading, isError } = useQuery(
    ["EventsListPublic", slug],
    async () => {
      if (!slug) {
        return null;
      }
      const { showName, events } = await api.publicScheduleGet({
        showSlug: slug as string,
      });
      return { showName, events };
    }
  );

  if (isLoading || isError || !data) {
    return (
      <>
        <Head>
          <title>Schedule - ShowPlanner</title>
        </Head>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <div>
            <div className="flex justify-between items-center">
              <H2> Schedule </H2>
            </div>
            {isError && <ErrorBox>Could not get shows</ErrorBox>}
            {isLoading && <progress className="progress w-56"></progress>}
          </div>
        </div>
      </>
    );
  }

  const { showName, events } = data;

  return (
    <>
      <Head>
        <title>Schedule - {showName} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <div>
          <div className="prose mb-4">
            <H2 className="mb-4">{showName} - Public Schedule</H2>
            <p>Join the show for more details</p>
          </div>
          {events && (
            <EventTable
              headers={
                <>
                  <th>Date</th>
                  <th>Event</th>
                </>
              }
              eventRenderer={EventRenderer}
              events={events}
            />
          )}
        </div>
      </div>
    </>
  );
};

const EventRenderer: EventRendererType<EventPublicDTO> = ({
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
    </>
  );
};

export default ShowPage;
