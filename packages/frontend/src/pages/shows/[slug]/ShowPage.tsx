import { useQuery } from "@tanstack/react-query";
import { getApi } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { H2 } from "core/components/Typography";
import { HasPermission, PERMISSION } from "core/permissions";
import dayjs from "dayjs";
import { Schedule } from "domains/events/EventTable/Schedule";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Head from "next/head";
import Link from "next/link";
import { AddEventButton } from ".";

export const ShowPage = () => {
  const api = getApi();
  const show = useShowSummary();
  const {
    data: events,
    isLoading,
    isError,
  } = useQuery(["EventsList", show.id], () =>
    api.scheduleGet({ showId: show.id })
  );
  const startOfToday = dayjs().startOf("day");
  const filteredEvents =
    events?.filter((e) => dayjs(e.start).isAfter(startOfToday)) || [];
  return (
    <>
      <Head>
        <title>{show.name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col justify-between sm:flex-row gap-4">
        <H2 className="mb-4">{show.name}</H2>
        <div className="flex gap-2 mb-4">
          <HasPermission showId={show.id} permission={PERMISSION.addEvents}>
            <AddEventButton showId={show.id} />
          </HasPermission>
          <Link href={`${show.slug}/public`} target="_blank" className="btn">
            View public schedule
          </Link>
          <button className="btn">Show old events</button>
        </div>
      </div>
      {isError && <ErrorBox>Could not get shows</ErrorBox>}
      {isLoading && <progress className="progress w-56"></progress>}
      {events && <Schedule events={filteredEvents} />}
    </>
  );
};
