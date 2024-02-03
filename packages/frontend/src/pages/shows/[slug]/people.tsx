import { useQuery } from "@tanstack/react-query";
import { api } from "core/api";
import { AccessDenied } from "core/components/AccessDenied/AccessDenied";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { H2 } from "core/components/Typography";
import { PERMISSION, showPermission } from "core/permissions";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Head from "next/head";
import { ReactElement } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { PermissionClaim } from "supertokens-auth-react/recipe/userroles";

const ShowPage = () => {
  const show = useShowSummary();
  return (
    <SessionAuth
      accessDeniedScreen={AccessDenied}
      overrideGlobalClaimValidators={(globalValidators) => [...globalValidators,
      PermissionClaim.validators.includes(showPermission(show?.id, PERMISSION.personnel))]}>
      <Head>
        <title>People - {show.name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col justify-between sm:flex-row gap-4">
        <H2 className="mb-4">{show.name} - People</H2>
      </div>
      <PeopleTable showId={show.id} />
    </SessionAuth>
  );
};

const PeopleTable: React.FC<{ showId: number }> = ({ showId }) => {
  const { data, isLoading, isError } = useQuery(["personnel", showId], () => api.personnelGet({ showId }))
  if (isLoading) {
    return <LoadingBox />
  }
  if (isError) {
    return <ErrorBox>Could not load people</ErrorBox>
  }
  if (data) {
    return <table className="table">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {data.people?.map(person => <tr key={person.id}>
          <td>{person.firstName} {person.lastName}</td>
        </tr>)}
      </tbody>
    </table>
  }
  return null;
}


ShowPage.getLayout = (page: ReactElement) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default ShowPage;
