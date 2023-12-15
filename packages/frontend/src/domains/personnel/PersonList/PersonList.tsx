import ErrorBox from "core/components/ErrorBox/ErrorBox";
import {
  PERMISSIONS,
  SHOW_PERMISSIONS,
  useHasPermission,
} from "core/permissions";
import { useShowSummary } from "domains/shows/lib/summaryContext";

import { useGetPeopleForShow } from "../lib/api";
import { Person } from "../lib/types";
import { DeletePersonButton } from "./DeletePersonButton";
import { PermissionsList } from "./PermissionsList";

export const PersonList: React.FC = () => {
  const show = useShowSummary();
  const { people, isLoading, isError } = useGetPeopleForShow(show.id);

  return (
    <>
      {isLoading && <progress className="progress w-full"></progress>}
      {isError && <ErrorBox>Could not get people</ErrorBox>}
      {people && <PersonTable people={people} showSlug={show.slug} />}
    </>
  );
};

export const PersonTable: React.FC<{
  people: Array<Person>;
  showSlug: string;
}> = ({ people, showSlug }) => {
  const hasEditPermissions = useHasPermission(PERMISSIONS.PERMISSIONS_EDIT);

  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th>Name</th>
          {hasEditPermissions && <th>Permissions</th>}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (
          <tr key={person.id}>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src={person.avatar}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">
                    {person.firstname} {person.lastname}
                  </div>
                </div>
              </div>
            </td>
            {hasEditPermissions && (
              <td>
                <PermissionsList person={person} showSlug={showSlug} />
              </td>
            )}
            <td>
              <ActionButtons personId={person.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ActionButtons: React.FC<{ personId: string }> = ({ personId }) => {
  const show = useShowSummary();
  return (
    <>
      <DeletePersonButton personId={personId} showId={show.id} />
    </>
  );
};
