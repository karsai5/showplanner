import { serverSideApi } from "core/api";
import { RosterDTO, ShowDTO } from "core/api/generated";
import { H2 } from "core/components/Typography";
import { HasPermission, PERMISSION } from "core/permissions";
import { getSSRErrorReturn } from "core/utils/ssr";
import { AddRoleModal } from "domains/rostering/AddRoleModal/AddRoleModal";
import { RosterTable } from "domains/rostering/RosterTable/RosterTable";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React, { useState } from "react";
import superjson from "superjson";

export const getServerSideProps = (async (context) => {
  const slug = context.query.slug;
  const ssrApi = serverSideApi(context);

  if (typeof slug !== "string") {
    throw new Error("Incorrect slug format");
  }

  try {
    const show = await ssrApi.rostering.showsShowSlugSummaryGet({
      showSlug: slug,
    });
    const data = await ssrApi.default.rosterGet({ showId: show.id });
    return {
      props: { show, rosterJSON: superjson.stringify(data) },
    };
  } catch (err) {
    return getSSRErrorReturn(err);
  }
}) satisfies GetServerSideProps<{ show: ShowDTO; rosterJSON: string }>;

const ShowPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { show } = props;
  const [showOldEvents, setShowOldEvents] = useState(false);
  return (
    <>
      <Head>
        <title>Roster - {show.name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col justify-between sm:flex-row gap-4">
        <H2 className="mb-4">{show.name} - Roster</H2>

        <div>
          <HasPermission showId={show.id} permission={PERMISSION.rostering}>
            <AddRoleModal showId={show.id} className="mr-2" />
          </HasPermission>
          <button
            className="btn"
            onClick={() => setShowOldEvents(!showOldEvents)}
          >
            {showOldEvents ? "Hide" : "Show"} past events
          </button>
        </div>
      </div>
      <RosterTable
        showId={show.id}
        showPastEvents={showOldEvents}
        initialData={superjson.parse<RosterDTO>(props.rosterJSON)}
      />
    </>
  );
};

export default ShowPage;
