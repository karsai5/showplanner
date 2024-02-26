import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from 'core/api';
import { RoleDTO } from 'core/api/generated';
import ErrorBox from 'core/components/ErrorBox/ErrorBox';
import Input from 'core/components/fields/TextInput';
import { PencilIcon } from 'core/components/Icons';
import { LoadingBox } from 'core/components/LoadingBox/LoadingBox';
import { showToastError } from 'core/utils/errors';
import { useShowSummary } from 'domains/shows/lib/summaryContext';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const RolesTable: React.FC<{
  className?: string;
}> = ({ className }) => {
  const show = useShowSummary();
  const {
    isError,
    isLoading,
    data: roles,
  } = useQuery(['show-roles', show.id], () =>
    api.rolesGet({ showId: show.id }),
  );
  return (
    <div className={className}>
      {isLoading && <LoadingBox />}
      {isError && <ErrorBox>Could not get roles</ErrorBox>}
      {!roles?.length && <p>No roles yet</p>}
      {roles && (
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
                  <RoleItem role={r} />
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
}> = ({ role }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  if (editMode) {
    return <RenameRole role={role} onClose={() => setEditMode(false)} />;
  }
  return (
    <div className="flex justify-between">
      <div>{role.name}</div>
      <button className="btn btn-sm" onClick={() => setEditMode(true)}>
        <PencilIcon />
      </button>
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
  } = useForm<Inputs>({
    defaultValues: {
      name: role.name,
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation<unknown, Error, Inputs>({
    mutationFn: (inputs) => {
      return api.rolesIdPut({
        id: role.id as number,
        roleDetails: {
          name: inputs.name,
        },
      });
    },
    onError: (e) => {
      showToastError('Something went wrong updating role.', e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['show-roles'] });
      onClose();
    },
  });

  return (
    <form
      className="flex flex-row gap-2"
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
    >
      <Input
        register={register('name', { required: true })}
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
