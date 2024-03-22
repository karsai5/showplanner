import { AccessDenied } from 'core/components/AccessDenied/AccessDenied';
import { H2, H3 } from 'core/components/Typography';
import { PERMISSION, showPermission } from 'core/permissions';
import { AddPersonModal } from 'domains/personnel/AddPersonModal/AddPersonModal';
import { PeopleTable } from 'domains/personnel/PeopleTable/PeopleTable';
import { AddRoleModal } from 'domains/rostering/AddRoleModal/AddRoleModal';
import { RolesTable } from 'domains/rostering/RolesTable';
import { LayoutWithShowSidebar } from 'domains/shows/LayoutForShow';
import { useShowSummary } from 'domains/shows/lib/summaryContext';
import Head from 'next/head';
import { ReactElement } from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { PermissionClaim } from 'supertokens-auth-react/recipe/userroles';

const ShowPage = () => {
  const show = useShowSummary();

  return (
    <SessionAuth
      accessDeniedScreen={AccessDenied}
      overrideGlobalClaimValidators={(globalValidators) => [
        ...globalValidators,
        PermissionClaim.validators.includes(
          showPermission(show?.id, PERMISSION.personnel),
        ),
      ]}
    >
      <Head>
        <title>People - {show.name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col justify-between sm:flex-row gap-4">
        <H2 className="mb-4">{show.name} - People</H2>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-none">
          <div className="flex justify-between">
            <H3>Roles</H3>
            <AddRoleModal showId={show.id} />
          </div>
          <RolesTable />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <H3>People</H3>
            <AddPersonModal showId={show.id} />
          </div>
          <PeopleTable showId={show.id} />
        </div>
      </div>
    </SessionAuth>
  );
};

ShowPage.getLayout = (page: ReactElement) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default ShowPage;
