import cc from "classnames";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { useModal } from "core/components/Modal/Modal";
import { SHOW_PERMISSIONS, UserPermission } from "core/permissions";
import { useGetPermissionsForPerson } from "core/permissions/api";
import { useForm } from "react-hook-form";

import { useUpdatePersonPermissionsForShowMutation } from "../lib/api";

export const EditShowPermissionsModal: React.FC<{
  personId: string;
  showSlug: string;
}> = ({ personId, showSlug }) => {
  const { permissions, isLoading } = useGetPermissionsForPerson(personId);
  const showPermissions = permissions?.filter((p) => p.showSlug === showSlug);

  if (isLoading) {
    return <progress className="progress w-full"></progress>;
  }

  if (permissions) {
    return (
      <EditPermissionsForm
        personId={personId}
        permissions={showPermissions}
        showSlug={showSlug}
      />
    );
  }

  return <ErrorBox>Could not load permissions</ErrorBox>;
};

export const EditPermissionsForm: React.FC<{
  personId: string;
  showSlug: string;
  permissions: Array<UserPermission> | undefined;
}> = ({ personId, showSlug, permissions = [] }) => {
  const { Modal, open, close, isOpen } = useModal();

  const initialValues = Object.fromEntries(
    permissions.map((p) => [p.permission.value, true])
  );
  const { register, handleSubmit } = useForm({
    defaultValues: initialValues,
  });

  const update = useUpdatePersonPermissionsForShowMutation(personId, showSlug);
  const onSubmit = (values: any) => {
    const entries = Object.entries(values)
      .filter(([, value]) => value === true)
      .map(([key]) => key);
    update.mutate(entries, {
      onSuccess: close,
    });
  };

  return (
    <>
      <a className="link" onClick={open}>
        Edit
      </a>
      <Modal isOpen={isOpen} close={close} title="Edit permissions">
        <form onSubmit={handleSubmit(onSubmit)}>
          <table className="table mt-4">
            <tbody>
              {Object.values(SHOW_PERMISSIONS).map((showPermission) => {
                return (
                  <tr key={showPermission.value}>
                    <td>
                      <input
                        className="checkbox"
                        type="checkbox"
                        {...register(showPermission.value)}
                      />
                    </td>
                    <td>
                      {showPermission.name}
                      <br/>
                      {showPermission.description}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            className={cc("btn", { ["loading disabled"]: update.isLoading })}
            type="submit"
          >
            Save
          </button>
        </form>
      </Modal>
    </>
  );
};
