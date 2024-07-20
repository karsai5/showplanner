import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import cc from "classnames";
import { api } from "core/api";
import { RoleDTO, ShowSummaryDTO } from "core/api/generated";
import { H2 } from "core/components/Typography";
import { showToastError } from "core/utils/errors";
import { clone } from "lodash";
import { FC, useState } from "react";
import { toast } from "react-toastify";

export const SetRoleOrder: FC<{
  roles?: RoleDTO[];
  close: () => void;
  show: ShowSummaryDTO;
}> = ({ roles = [], close, show }) => {
  const [order, setOrder] = useState(roles.map((r) => r.id as number));

  const handleMove = (from: number, to: number) => {
    setOrder(array_move(clone(order), from, to));
  };

  const queryClient = useQueryClient();
  const mutation = useMutation<unknown, Error>(
    () =>
      api.rostering.showsShowIdRolesSetorderPost({
        showId: show.id,
        order,
      }),
    {
      onError: (err) => {
        showToastError("Could not save new order", err);
      },
      onSuccess: () => {
        toast.success("New order saved");
        queryClient.invalidateQueries(["roster", show.id]);
        close();
      },
    }
  );

  return (
    <div>
      <H2 className="mb-4">Roles</H2>
      {order.map((id, i) => {
        const role = roles.find((r) => r.id === id);
        if (!role) {
          return null;
        }
        return (
          <div
            className="bg-base-100 shadow-lg rounded-md p-1 mb-2 border border-slate-300"
            key={role.id}
          >
            <div className="flex justify-between">
              <div className="p-3">{role.name}</div>
              <div>
                <span
                  className={cc("btn mr-2", {
                    ["btn-disabled"]: i === order.length - 1,
                  })}
                  onClick={() => handleMove(i, i + 1)}
                >
                  <ArrowDownIcon className="h-5 w-5" />
                </span>
                <span
                  className={cc("btn", { ["btn-disabled"]: i === 0 })}
                  onClick={() => handleMove(i, i - 1)}
                >
                  <ArrowUpIcon className="h-5 w-5" />
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex mt-5 justify-end">
        <span className="btn btn-ghost mr-2" onClick={() => close()}>
          Cancel
        </span>
        <span
          onClick={() => mutation.mutate()}
          className={cc("btn min-w-20", {
            ["btn-disabled"]: mutation.isLoading,
          })}
        >
          {mutation.isLoading && (
            <span className="loading loading-spinner"></span>
          )}
          Save
        </span>
      </div>
    </div>
  );
};

function array_move<T>(arr: Array<T>, old_index: number, new_index: number) {
  if (new_index >= arr.length) {
    let k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined as T);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}
