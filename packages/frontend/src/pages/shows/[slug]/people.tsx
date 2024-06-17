import { useMutation } from "@tanstack/react-query";
import { api } from "core/api";
import { AccessDenied } from "core/components/AccessDenied/AccessDenied";
import { H2, H3 } from "core/components/Typography";
import { HasPermission, PERMISSION, showPermission } from "core/permissions";
import { Toggle } from "core/toggles/toggles";
import { showToastError } from "core/utils/errors";
import { AddPersonModal } from "domains/personnel/AddPersonModal/AddPersonModal";
import { PeopleTable } from "domains/personnel/PeopleTable/PeopleTable";
import { AddRoleModal } from "domains/rostering/AddRoleModal/AddRoleModal";
import { RolesTable } from "domains/rostering/RolesTable";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Head from "next/head";
import { ReactElement } from "react";
import sanitize from "sanitize-filename";
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
          showPermission(show?.id, PERMISSION.personnel)
        ),
      ]}
    >
      <Head>
        <title>People - {show.name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col justify-between sm:flex-row gap-4">
        <H2 className="mb-4">{show.name} - People</H2>
        <div className="flex gap-2">
          <HasPermission permission={PERMISSION.personnelEdit} showId={show.id}>
            <AddPersonModal showId={show.id} />
          </HasPermission>
          <HasPermission
            permission={PERMISSION.personnelPrivateDetails}
            showId={show.id}
          >
            <DownloadGoogleCSVButton showId={show.id} />
          </HasPermission>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Toggle toggle="old_roles_in_people_page">
          <div className="flex-none">
            <div className="flex justify-between">
              <H3>Roles</H3>
              <AddRoleModal showId={show.id} />
            </div>
            <RolesTable />
          </div>
        </Toggle>
        <PeopleTable showId={show.id} />
      </div>
    </SessionAuth>
  );
};

const DownloadGoogleCSVButton: React.FC<{ showId: number }> = ({ showId }) => {
  const mutation = useDownloadCSV(showId, "google-contacts.csv", "text/csv");
  return (
    <button className="btn" onClick={() => mutation.mutate()}>
      Download CSV
    </button>
  );
};

const useDownloadCSV = (id: number, filename: string, type: string) => {
  return useMutation<string>({
    mutationFn: () => {
      return api.personnelAssignedGoogleContactsCSVGet({ showId: id });
    },
    onError: () => {
      showToastError("Something went wrong downloading file");
    },
    onSuccess: (csv) => {
      const fileURL = window.URL.createObjectURL(new Blob([csv], { type }));
      const tempLink = document.createElement("a");
      tempLink.href = fileURL;
      tempLink.setAttribute("download", sanitize(filename));
      tempLink.click();
    },
  });
};

ShowPage.getLayout = (page: ReactElement) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default ShowPage;
