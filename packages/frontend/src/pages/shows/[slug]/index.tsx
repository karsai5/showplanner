import { useQuery } from "@tanstack/react-query";
import { getApi } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { useModal } from "core/components/Modal/Modal";
import { H2 } from "core/components/Typography";
import { EventTable } from "domains/events/EventTable";
import NewEventForm from "domains/events/NewEventForm/NewEventForm";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Head from "next/head";
import { FC } from "react";
import Session from "supertokens-auth-react/recipe/session";
import { PermissionClaim } from "supertokens-auth-react/recipe/userroles"

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
            <AddEventButton showId={show.id} />
          </div>
          {isError && <ErrorBox>Could not get shows</ErrorBox>}
          {isLoading && <progress className="progress w-56"></progress>}
          {events && <EventTable events={events} />}
        </div>
      </div>
    </>
  );
};

const AddEventButton: FC<{showId: number}> = ({showId}) => {
  const { Modal, open, close, isOpen } = useModal();
  let claimValue = Session.useClaimValue(PermissionClaim)

  if (claimValue.loading || !claimValue.doesSessionExist) {
    return null;
  }
  let permissions = claimValue?.value;

  const permission = `show:${showId}:add-events`;
  console.log(permission, permissions);

  if (Array.isArray(permissions) && permissions.includes(permission)) {
    return (<>
      <button className="btn mb-2" onClick={open}>
        Add event
      </button>
      <Modal isOpen={isOpen} close={close} title="Add a new show">
        <NewEventForm onSuccess={close} />
      </Modal>
    </>);
  }

  return null;
};

ShowPage.getLayout = (page: any) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default ShowPage;
