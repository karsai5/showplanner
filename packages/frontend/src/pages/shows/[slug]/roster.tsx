import { H2 } from "core/components/Typography";
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

        <button
          className="btn"
          onClick={() => setShowOldEvents(!showOldEvents)}
        >
          {showOldEvents ? "Hide" : "Show"} past events
        </button>
      </div>
      <RosterTable showId={show.id} showPastEvents={showOldEvents} />
    </>
  );
};

ShowPage.getLayout = (page: ReactElement) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default ShowPage;
