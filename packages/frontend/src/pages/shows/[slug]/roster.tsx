import { AccessDenied } from "core/components/AccessDenied/AccessDenied";
import { H2 } from "core/components/Typography";
import { PERMISSION, showPermission } from "core/permissions";
import { RosterTable } from "domains/rostering/RosterTable/RosterTable";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Head from "next/head";
import React, { ReactElement } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { PermissionClaim } from "supertokens-auth-react/recipe/userroles";

const ShowPage = () => {
  const show = useShowSummary();
  return (
    <SessionAuth
      accessDeniedScreen={AccessDenied}
      overrideGlobalClaimValidators={(globalValidators) => [
        ...globalValidators,
        PermissionClaim.validators.includes(
          showPermission(show?.id, PERMISSION.rostering)
        ),
      ]}
    >
      <Head>
        <title>Roster - {show.name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col justify-between sm:flex-row gap-4">
        <H2 className="mb-4">{show.name} - Roster</H2>
      </div>
      <RosterTable showId={show.id} />
    </SessionAuth>
  );
};

ShowPage.getLayout = (page: ReactElement) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default ShowPage;
