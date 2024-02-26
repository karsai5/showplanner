import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'core/api';
import Input from 'core/components/fields/TextInput';
import { useModal } from 'core/components/Modal/Modal';
import { showToastError } from 'core/utils/errors';
import { useForm } from 'react-hook-form';

type Inputs = {
  name: string;
};

export const AddRoleModal: React.FC<{
  showId: number;
}> = ({ showId }) => {
  const { Modal, open, close, isOpen } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const queryClient = useQueryClient();
  const mutation = useMutation<unknown, Error, Inputs>({
    mutationFn: (inputs) => {
      return api.rolesPost({
        roleDetails: {
          name: inputs.name,
          showId: showId,
        },
      });
    },
    onError: (e) => {
      showToastError('Something went wrong adding new role.', e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['show-roles', showId] });
      close();
      reset();
    },
  });

  return (
    <>
      <button className="btn btn-sm" onClick={() => open()}>
        Add Role
      </button>
      <Modal isOpen={isOpen} close={close} title="Add role to show">
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <Input
            register={register('name', { required: true })}
            placeholder="Name"
            errors={errors}
            showRequired
          />
          <button type="submit" className="btn btn-block">
            {mutation.isLoading && (
              <span className="loading loading-spinner"></span>
            )}
            Add role
          </button>
        </form>
      </Modal>
    </>
  );
};
