import cc from "classnames";
import Input from "core/components/fields/TextInput";
import { PlusIcon, TrashIcon } from "core/components/Icons";
import { useConfirmationModal } from "core/components/Modal/ConfirmationModal";
import { useModal } from "core/components/Modal/Modal";
import { H3 } from "core/components/Typography";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDebounce } from "usehooks-ts";

import {
  useAddRole,
  useAddRoleGroup,
  useDeleteRole,
  useDeleteRoleGroup,
  useRoleGroupsForShow,
  useUpdateRole,
} from "../lib/api";
import { ShowRole } from "../lib/types";

export const Roles = () => {
  return (
    <>
      <div className="flex justify-between">
        <H3>Roles</H3>
        <AddRoleGroupModal />
      </div>
      <RoleList />
    </>
  );
};

const RoleList = () => {
  const show = useShowSummary();
  const { roleGroups } = useRoleGroupsForShow(show.id);
  const remove = useDeleteRoleGroup();
  const showConfirmation = useConfirmationModal();
  return (
    <>
      {roleGroups?.map((rg) => (
        <div key={rg.id} className="card bg-base-100 border mt-4 w-full">
          <div className="card-body p-5">
            <div className="flex justify-between">
              <h2 className="card-title">{rg.name}</h2>
              <button
                className="btn btn-sm btn-ghost opacity-25"
                onClick={() => {
                  showConfirmation(
                    "Delete role",
                    `Are you sure you want to delete '${rg.name}'?`,
                    () => remove.mutate(rg.id)
                  );
                }}
              >
                <TrashIcon />
              </button>
            </div>
            <RolesTable roles={rg.roles} />
            <AddRole roleGroup={rg.id} />
          </div>
        </div>
      ))}
    </>
  );
};

const RolesTable: FC<{ roles: Array<ShowRole> }> = ({ roles }) => {
  if (roles.length === 0) {
    return null;
  }
  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Rostered</th>
            <th>Assigned</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>
                <Name role={role} />
              </td>
              <td>
                <RosteredCheckbox role={role} />
              </td>
              <td></td>
              <td>
                <Note role={role} />
              </td>
              <td>
                <DeleteRole role={role} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Name: FC<{ role: ShowRole }> = ({ role }) => {
  const update = useUpdateRole();
  const [value, setValue] = useState(role.name);
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    if (role.name !== debouncedValue) {
      update.mutate({ id: role.id, data: { name: debouncedValue } });
    }
  }, [debouncedValue]);

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input input-ghost w-full"
      ></input>
      {update.isLoading && (
        <div
          className="absolute right-6 top-2 radial-progress animate-spin text-slate-400"
          style={{ "--value": "30", "--size": "1rem" } as any}
        ></div>
      )}
    </div>
  );
};

const Note: FC<{ role: ShowRole }> = ({ role }) => {
  const update = useUpdateRole();
  const [value, setValue] = useState(role.note);
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    if (role.note !== debouncedValue) {
      update.mutate({ id: role.id, data: { note: debouncedValue } });
    }
  }, [debouncedValue]);

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="textarea textarea-ghost"
        rows={1}
      ></textarea>
      {update.isLoading && (
        <div
          className="absolute right-6 top-2 radial-progress animate-spin text-slate-400"
          style={{ "--value": "30", "--size": "1rem" } as any}
        ></div>
      )}
    </div>
  );
};

const RosteredCheckbox: FC<{ role: ShowRole }> = ({ role }) => {
  const update = useUpdateRole();
  if (update.isLoading) {
    return (
      <div
        className="radial-progress animate-spin text-slate-400"
        style={{ "--value": "30", "--size": "2rem" } as any}
      ></div>
    );
  }
  return (
    <>
      <input
        type="checkbox"
        checked={!!role.rostered}
        className="checkbox "
        onClick={() =>
          update.mutate({ id: role.id, data: { rostered: !role.rostered } })
        }
      />
    </>
  );
};

const DeleteRole: FC<{ role: ShowRole }> = ({ role }) => {
  const showConfirmation = useConfirmationModal();
  const deleteRole = useDeleteRole();
  return (
    <button
      className="btn btn-sm btn-ghost opacity-25"
      onClick={() => {
        showConfirmation(
          "Delete role",
          `Are you sure you want to delete '${role.name}'?`,
          () => deleteRole.mutate(role.id)
        );
      }}
    >
      <TrashIcon />
    </button>
  );
};

const AddRole: FC<{ roleGroup: string }> = ({ roleGroup }) => {
  const addRole = useAddRole();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string }>();

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    await addRole.mutateAsync(
      { name: data.name, showRoleGroup: roleGroup },
      {
        onSuccess: () => reset(),
      }
    );
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        register={register("name", { required: true })}
        placeholder="First name"
        errors={errors}
        showRequired
      />
      <button
        type="submit"
        className={cc("btn", { loading: addRole.isLoading })}
      >
        Add role
      </button>
    </form>
  );
};

const AddRoleGroupModal: FC = () => {
  const { Modal, open, close, isOpen } = useModal();
  const show = useShowSummary();
  const mutation = useAddRoleGroup(show.id);
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    mutation.mutate(title);
    setTitle("");
    close();
  };

  return (
    <>
      <button className="btn btn-outline gap-2" onClick={open}>
        <PlusIcon />
        Add role group
      </button>
      {isOpen && (
        <Modal isOpen={isOpen} close={close} title={"Add role group"}>
          <div className="flex flex-col">
            <p className="mt-2 mb-4">
              Role groups are used to organise all the many departments that
              might exist in a show. On larger shows there might be lots of
              groups, on smaller shows it might only take one.
            </p>
            <input
              placeholder={"Role group name"}
              className="input input-bordered mb-4"
              required={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className={cc("btn btn-primary", { loading: mutation.isLoading })}
              type="button"
              onClick={handleSubmit}
            >
              Add role group
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
