import { useMutation, useQueryClient } from "@tanstack/react-query";
import cc from "classnames";
import { api_deprecated } from "core/api";
import Input from "core/components/fields/TextInput";
import { useModal } from "core/components/Modal/Modal";
import { showToastError } from "core/utils/errors";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
};

export const AddRoleModal: React.FC<{
  showId: number;
  className?: string;
}> = ({ showId, className }) => {
  const { Modal, open, close, isOpen } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<Inputs>();

  const queryClient = useQueryClient();
  const mutation = useMutation<unknown, Error, Inputs>({
    mutationFn: (inputs) => {
      return api_deprecated.rolesPost({
        roleDetails: {
          name: inputs.name,
          showId: showId,
        },
      });
    },
    onError: (e) => {
      showToastError("Something went wrong adding new role.", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["show-roles", showId] });
      queryClient.invalidateQueries({ queryKey: ["roster", showId] });
      close();
      reset();
    },
  });

  useEffect(() => {
    if (isOpen) {
      setFocus("name");
    }
  }, [setFocus, isOpen]);

  return (
    <>
      <button className={cc(className, "btn")} onClick={() => open()}>
        Add Role
      </button>
      {isOpen && (
        <Modal isOpen={isOpen} close={close} title="Add role to show">
          <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
            <Input
              register={register("name", { required: true })}
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
      )}
    </>
  );
};
