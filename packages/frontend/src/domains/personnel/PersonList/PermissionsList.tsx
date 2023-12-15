import { Person } from "../lib/types";
import { EditShowPermissionsModal } from "./EditShowPermissionsModal";

export const PermissionsList: React.FC<{
  person: Person;
  showSlug: string;
}> = ({ person, showSlug }) => {
  const filteredPermissions = person.permissions?.filter((permission) => {
    return permission?.showSlug === showSlug;
  });
  if (!filteredPermissions || filteredPermissions?.length === 0) {
    return <span>No permissions</span>;
  }
  return (
    <>
      {filteredPermissions.map((p) => (
        <span key={p.permission.value} className="badge p-4 mr-2">{p.permission.name}</span>
      ))}
      <EditShowPermissionsModal personId={person.id} showSlug={showSlug} />
    </>
  );
};
