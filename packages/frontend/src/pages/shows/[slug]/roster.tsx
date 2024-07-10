import { RosterDTO } from "core/api/generated";
import { H2 } from "core/components/Typography";
import { HasPermission, PERMISSION } from "core/permissions";
import { ifResponseErrorCode, ssrWrapper } from "core/permissions/ssr";
import { AddRoleModal } from "domains/rostering/AddRoleModal/AddRoleModal";
import { RosterTable } from "domains/rostering/RosterTable/RosterTable";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React, { useState } from "react";
import superjson from "superjson";

export const getServerSideProps = ssrWrapper(async (context, api) => {
  const slug = context.query.slug;

  if (typeof slug !== "string") {
    throw new Error("Incorrect slug format");
  }

  const show = await api.rostering.showsShowSlugSummaryGet({
    showSlug: slug,
  });
  let data = undefined;
  try {
    data = await api.default.rosterGet({ showId: show.id });
  } catch (err) {
    if (!ifResponseErrorCode(err, 401)) {
      throw err;
    }
  }

  return {
    props: {
      show,
      rosterJSON: data ? superjson.stringify(data) : null,
    },
  };
});

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

        {props.rosterJSON && (
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
        )}
      </div>
      {props.rosterJSON && (
        <RosterTable
          showId={show.id}
          showPastEvents={showOldEvents}
          initialData={superjson.parse<RosterDTO>(props.rosterJSON)}
        />
      )}
      {!props.rosterJSON && (
        <div className="prose">
          <p>
            The roster has not been released yet.
            <br />
            You'll get an email when the roster is released.
          </p>
        </div>
      )}
    </>
  );
};

export default ShowPage;
