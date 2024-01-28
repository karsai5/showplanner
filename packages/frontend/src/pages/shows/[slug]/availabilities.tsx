import { useQuery } from "@tanstack/react-query";
import { getApi } from "core/api";
import { AccessDenied } from "core/components/AccessDenied/AccessDenied";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { useModal } from "core/components/Modal/Modal";
import { H2 } from "core/components/Typography";
import { HasPermission, PERMISSION, showPermission } from "core/permissions";
import { Schedule } from "domains/events/EventTable/Schedule";
import NewEventForm from "domains/events/NewEventForm/NewEventForm";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Head from "next/head";
import Link from "next/link";
import { FC } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { PermissionClaim } from "supertokens-auth-react/recipe/userroles"

const ShowPage = () => {
  const api = getApi();
  const show = useShowSummary();
  const { data, isLoading, isError } = useQuery(
    ["EventsList", show.id],
    () => api.availabilitiesGet({ showId: show.id })
  );
  return (
    <SessionAuth
      accessDeniedScreen={AccessDenied}
      overrideGlobalClaimValidators={(globalValidators) => [...globalValidators,
      PermissionClaim.validators.includes(showPermission(show?.id, PERMISSION.rostering))]}>
      <Head>
        <title>Availabilities - {show.name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col justify-between sm:flex-row gap-4">
        <H2 className="mb-4">{show.name} - Availabilities</H2>
        <div className="flex gap-2 mb-4">
          <Link href={`${show.slug}/public`} target="_blank" className="btn">
            Public schedule
          </Link>
        </div>
      </div>
      {isError && <ErrorBox>Could not get shows</ErrorBox>}
      {isLoading && <progress className="progress w-56"></progress>}
    </SessionAuth>
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
