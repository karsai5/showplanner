import { PlusIcon } from "core/components/Icons";
import { useModal } from "core/components/Modal/Modal";
import { H2, H3 } from "core/components/Typography";
import { checkPermission } from "core/config";
import {
  getShowPermissionString,
  PERMISSIONS,
  SHOW_PERMISSIONS,
  useHasPermission,
} from "core/permissions";
import { AddPersonToShowModal } from "domains/personnel/AddPersonToShowModal/AddPersonToShowModal";
import { PersonList } from "domains/personnel/PersonList/PersonList";
import { Roles } from "domains/personnel/Roles/Roles";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC } from "react";

const PeoplePage = () => {
  const show = useShowSummary();

  useHasPermission(SHOW_PERMISSIONS.PERSONNEL, show.slug);

  const { id: showId, name } = show;

  return (
    <>
      <Head>
        <title>People - {name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <div>
          <H2>Personnel</H2>
        </div>
      </div>
      <div className="flex flex-col 2xl:flex-row gap-4">
        <div className="flex-1">
          <Roles />
        </div>
        <div className="flex-1">
          <div className="flex justify-between mb-4">
            <H3>People</H3>
            <AddPersonToShowModal showId={showId} />
          </div>
          <PersonList />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const permission = getShowPermissionString(
    context.query.slug as string,
    SHOW_PERMISSIONS.PERSONNEL.value
  );
  const { session, redirect } = await checkPermission(context, [
    permission,
    PERMISSIONS.PERSONNEL.value,
  ]);
  if (redirect) {
    return redirect;
  }
  return { props: { session } };
};

PeoplePage.getLayout = (page: any) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default PeoplePage;
