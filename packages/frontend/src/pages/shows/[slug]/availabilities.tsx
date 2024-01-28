import { useQuery } from "@tanstack/react-query";
import { api } from "core/api";
import { AccessDenied } from "core/components/AccessDenied/AccessDenied";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { H2 } from "core/components/Typography";
import { PERMISSION, showPermission } from "core/permissions";
import dayjs from "dayjs";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Head from "next/head";
import React from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { PermissionClaim } from "supertokens-auth-react/recipe/userroles"

const ShowPage = () => {
  const show = useShowSummary();
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
      </div>
      <AvailabilitiesTable showId={show.id} />
    </SessionAuth>
  );
};

const AvailabilitiesTable: React.FC<{ showId: number }> = ({ showId }) => {
  const { data, isLoading, isError } = useQuery(
    ["ShowAvailabilities", showId],
    () => api.availabilitiesGet({ showId: showId })
  );
  if (isError) {
    return <ErrorBox>Could not get shows</ErrorBox>
  }
  if (isLoading) {
    return <progress className="progress w-56"></progress>
  }
  if (data) {
    return <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            {data.people?.map(p => <th key={p.id}>{p.firstName} {p.lastName}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.events?.map(e => {
            return <tr key={e.id}>
              <th>{dayjs(e.start).toString()}</th>
              {e.availabilities?.map((a, i) => {
                if (a === null) {
                  return <td key={i}>Unknown</td>
                }
                return <td key={i}>{a.available ? 'Yes' : 'No'}</td>
              })}
            </tr>
          })}
        </tbody>
      </table>
    </div>
  }
  return null
}

ShowPage.getLayout = (page: any) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default ShowPage;
