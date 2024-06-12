import { useQuery } from "@tanstack/react-query";
import { getApi } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { useModal } from "core/components/Modal/Modal";
import { H2 } from "core/components/Typography";
import { HasPermission, PERMISSION } from "core/permissions";
import dayjs from "dayjs";
import { Schedule } from "domains/events/EventTable/Schedule";
import NewEventForm from "domains/events/NewEventForm/NewEventForm";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Head from "next/head";
import Link from "next/link";
import { FC, ReactElement, useEffect, useState } from "react";

const ShowPage = () => {
  const api = getApi();
  const show = useShowSummary();
  const [showAllEvents, setShowAllEvents] = useState(false);
  const {
    data: events,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["EventsList", show.id],
    queryFn: () => api.scheduleGet({ showId: show.id }),
  });
  const startOfToday = dayjs().startOf("day");
  const allEvents = events || [];
  const futureEvents = allEvents.filter((e) =>
    dayjs(e.start).isAfter(startOfToday)
  );

  useEffect(() => {
    if (isSuccess && futureEvents.length === 0) {
      setShowAllEvents(true);
    }
  }, [futureEvents.length, isSuccess]);

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
          <button
            className="btn"
            onClick={() => setShowAllEvents(!showAllEvents)}
          >
            {showAllEvents ? "Hide" : "Show"} past events
          </button>
        </div>
      </div>
      {isError && <ErrorBox>Could not get shows</ErrorBox>}
      {isLoading && <progress className="progress w-56"></progress>}
      {events && (
        <>
          {futureEvents.length === 0 && allEvents.length > 0 && (
            <ErrorBox info>Show is over. All events are in the past</ErrorBox>
          )}
          <Schedule events={showAllEvents ? allEvents : futureEvents} />
        </>
      )}
    </>
  );
};

const AddEventButton: FC<{ showId: number }> = ({ showId }) => {
  const { Modal, open, close, isOpen } = useModal();
  return (
    <>
      <button className="btn mb-2" onClick={open}>
        Add event
      </button>
      <Modal isOpen={isOpen} close={close} title="Add a new show">
        <NewEventForm onSuccess={close} showId={showId} />
      </Modal>
    </>
  );
};

ShowPage.getLayout = (page: ReactElement) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default ShowPage;
