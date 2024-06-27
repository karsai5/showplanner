import { useMutation } from "@tanstack/react-query";
import { api, serverSideApi } from "core/api";
import { ArrayOfPersonSummaryDTO, ShowDTO } from "core/api/generated";
import { H2, H3 } from "core/components/Typography";
import {
  HasPermission,
  PERMISSION,
  PermissionRequired,
  showPermission,
} from "core/permissions";
import { Toggle } from "core/toggles/toggles";
import { showToastError } from "core/utils/errors";
import { getSSRErrorReturn } from "core/utils/ssr";
import { AddPersonModal } from "domains/personnel/AddPersonModal/AddPersonModal";
import { Invitations } from "domains/personnel/Invitations/Invitations";
import { PeopleTable } from "domains/personnel/PeopleTable/PeopleTable";
import { AddRoleModal } from "domains/rostering/AddRoleModal/AddRoleModal";
import { RolesTable } from "domains/rostering/RolesTable";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import sanitize from "sanitize-filename";
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
    const data = await ssrApi.default.personnelAssignedGet({ showId: show.id });
    return {
      props: { show, peopleJSON: superjson.stringify(data) },
    };
  } catch (err) {
    return getSSRErrorReturn(err);
  }
}) satisfies GetServerSideProps<{ show: ShowDTO; peopleJSON: string }>;

export default function PeoplePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { show } = props;

  return (
    <PermissionRequired
      permission={showPermission(show?.id, PERMISSION.personnel)}
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
            <RolesTable showId={show.id} />
          </div>
        </Toggle>
        <div>
          <PeopleTable
            showId={show.id}
            initialData={superjson.parse<ArrayOfPersonSummaryDTO>(
              props.peopleJSON
            )}
          />
          <HasPermission permission={PERMISSION.personnelEdit} showId={show.id}>
            <Invitations showId={show.id} />
          </HasPermission>
        </div>
      </div>
    </PermissionRequired>
  );
}

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
      return api.default.personnelAssignedGoogleContactsCSVGet({
        showId: id,
      });
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
