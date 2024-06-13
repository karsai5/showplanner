import { H2 } from "core/components/Typography";
import { HasPermission, PERMISSION } from "core/permissions";
import { AddRoleModal } from "domains/rostering/AddRoleModal/AddRoleModal";
import { RosterTable } from "domains/rostering/RosterTable/RosterTable";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Head from "next/head";
import React, { ReactElement, useState } from "react";

const ShowPage = () => {
  const show = useShowSummary();
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
      <RosterTable showId={show.id} showPastEvents={showOldEvents} />
    </>
  );
};

ShowPage.getLayout = (page: ReactElement) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default ShowPage;
