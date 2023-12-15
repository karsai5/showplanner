import { H2 } from "core/components/Typography";
import { checkPermission } from "core/config";
import {
  getShowPermissionString,
  SHOW_PERMISSIONS,
  useHasPermission,
} from "core/permissions";
import { AvailabilitiesTable } from "domains/rostering/AvailabilitiesTable/AvailabilitiesTable";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import { GetServerSideProps } from "next";
import Head from "next/head";

const ShowPage = () => {
  const show = useShowSummary();

  useHasPermission(SHOW_PERMISSIONS.PERSONNEL, show.slug);

  const { id: showId, name } = show;

  return (
    <>
      <Head>
        <title>Availabilities - {name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <H2>{name} - Availabilities</H2>
      </div>
      <AvailabilitiesTable showId={showId} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const permission = getShowPermissionString(
    context.query.slug as string,
    SHOW_PERMISSIONS.ROSTERING.value
  );
  const { session, redirect } = await checkPermission(context, [permission]);
  if (redirect) {
    return redirect;
  }
  return { props: { session } };
};

ShowPage.getLayout = (page: any) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default ShowPage;
