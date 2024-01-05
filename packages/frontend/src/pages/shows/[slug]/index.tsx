import { useQuery } from "@tanstack/react-query";
import { getApi } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { useModal } from "core/components/Modal/Modal";
import { H2 } from "core/components/Typography";
import { HasShowPermission, PERMISSION } from "core/permissions";
import { AdminEventTable } from "domains/events/EventTable/AdminEventTable";
import NewEventForm from "domains/events/NewEventForm/NewEventForm";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Head from "next/head";
import Link from "next/link";
import { FC } from "react";

const ShowPage = () => {
  const api = getApi();
  const show = useShowSummary();
  const { data: events, isLoading, isError } = useQuery(
    ["EventsList", show.id],
    () => api.eventsGet({ showId: show.id })
  );
  return (
    <>
      <Head>
        <title>Schedule - {show.name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <div>
          <div className="flex justify-between items-center">
            <H2>{show.name} - Schedule </H2>
            <div className="flex gap-2">
              <HasShowPermission showId={show.id} permission={PERMISSION.personnel}>
                <Link href={`${show.slug}/public`} target="_blank">
                  <a className="btn btn-ghost">Public schedule</a>
                </Link>
              </HasShowPermission>
              <HasShowPermission showId={show.id} permission={PERMISSION.addEvents}>
                <AddEventButton showId={show.id} />
              </HasShowPermission>
            </div>
          </div>
          {isError && <ErrorBox>Could not get shows</ErrorBox>}
          {isLoading && <progress className="progress w-56"></progress>}
          {events && <AdminEventTable events={events} />}
        </div>
      </div>
    </>
  );
};

const AddEventButton: FC<{ showId: number }> = ({ showId }) => {
  const { Modal, open, close, isOpen } = useModal();
  return <>
    <button className="btn mb-2" onClick={open}>
      Add event
    </button>
    <Modal isOpen={isOpen} close={close} title="Add a new show">
      <NewEventForm onSuccess={close} showId={showId} />
    </Modal>
  </>

};

ShowPage.getLayout = (page: any) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default ShowPage;
