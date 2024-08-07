import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api_deprecated } from "core/api";
import { PersonSummaryDTO, RoleDTO } from "core/api/generated";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import Input from "core/components/fields/TextInput";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { useConfirmationModal } from "core/components/Modal/ConfirmationModal";
import { showToastError } from "core/utils/errors";
import { PersonSelector } from "domains/personnel/PersonSelector/PersonSelector";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const RolesTable: React.FC<{
  className?: string;
  showId: number;
}> = ({ className, showId }) => {
  const {
    isError,
    isLoading,
    data: roles,
  } = useQuery(["show-roles", showId], () =>
    api_deprecated.rolesGet({ showId: showId })
  );

  const {
    data: assignedPersonnel,
    isLoading: isLoadingPeople,
    isError: isErrorPeople,
  } = useQuery(["assigned-people", showId], () =>
    api_deprecated.personnelAssignedGet({ showId: showId })
  );

  return (
    <div className={className}>
      {(isLoading || isLoadingPeople) && <LoadingBox />}
      {(isError || isErrorPeople) && <ErrorBox>Could not get roles</ErrorBox>}
      {!roles?.length && <p>No roles yet</p>}
      {roles && assignedPersonnel && (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {roles?.map((r) => (
              <tr key={r.id}>
                <td>
                  <RoleItem role={r} people={assignedPersonnel} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export const RoleItem: React.FC<{
  role: RoleDTO;
  people: PersonSummaryDTO[];
}> = ({ role, people }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const confirmationModal = useConfirmationModal();

  const deleteRole = useMutation<unknown, Error>({
    mutationFn: () => {
      return api_deprecated.rolesIdDelete({
        id: role.id as number,
      });
    },
    onError: (e) => {
      showToastError("Something went wrong deleting role.", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["show-roles"] });
    },
  });

  const handleDelete = () => {
    confirmationModal(
      "Delete role",
      `Are you sure you want to delete the role of "${role.name}"?`,
      () => deleteRole.mutate()
    );
  };

  const updateRole = useMutation<unknown, Error, string | null>({
    mutationFn: (personId) => {
      if (personId === "") {
        personId = null;
      }
      return api_deprecated.rolesIdPut({
        id: role.id as number,
        roleDetails: {
          name: role.name,
          personId: personId,
        },
      });
    },
    onError: (e) => {
      showToastError("Something went wrong updating role.", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["show-roles"] });
    },
  });
  if (editMode) {
    return <RenameRole role={role} onClose={() => setEditMode(false)} />;
  }
  return (
    <div className="flex justify-between gap-4">
      <div>{role.name}</div>
      <div className="flex gap-2">
        <PersonSelector
          people={people}
          loading={updateRole.isLoading}
          onChange={(person) => updateRole.mutate(person.id)}
          selectedPersonId={role.person?.id}
        />
        <button className="btn btn-ghost p-2" onClick={() => setEditMode(true)}>
          <PencilSquareIcon className="h-5 w-5" />
        </button>
        <button className="btn btn-ghost p-2" onClick={() => handleDelete()}>
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

type Inputs = {
  name: string;
};

export const RenameRole: React.FC<{
  role: RoleDTO;
  onClose: () => void;
}> = ({ role, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<Inputs>({
    defaultValues: {
      name: role.name,
    },
  });

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  const queryClient = useQueryClient();
  const mutation = useMutation<unknown, Error, Inputs>({
    mutationFn: (inputs) => {
      return api_deprecated.rolesIdPut({
        id: role.id as number,
        roleDetails: {
          name: inputs.name,
          personId: role.person?.id,
        },
      });
    },
    onError: (e) => {
      showToastError("Something went wrong updating role.", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["show-roles"] });
      queryClient.invalidateQueries({ queryKey: ["roster"] });
      onClose();
    },
  });

  return (
    <form
      className="flex flex-row gap-2"
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
    >
      <Input
        register={register("name", { required: true })}
        placeholder="Name"
        errors={errors}
        showRequired
      />
      <button type="submit" className="btn btn-success">
        {mutation.isLoading && (
          <span className="loading loading-spinner"></span>
        )}
        Save
      </button>
      <button type="submit" className="btn" onClick={() => onClose()}>
        Cancel
      </button>
    </form>
  );
};
