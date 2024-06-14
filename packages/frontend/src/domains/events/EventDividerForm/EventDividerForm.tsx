import { useMutation, useQueryClient } from "@tanstack/react-query";
import cc from "classnames";
import { getApi } from "core/api";
import Input from "core/components/fields/TextInput";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

dayjs.extend(customParseFormat);

type Inputs = {
  date: string;
  name: string;
};

export const EventDividerForm: FC<{
  onSuccess?: () => void;
  showId: number;
}> = ({ onSuccess, showId }) => {
  const queryClient = useQueryClient();
  const api = getApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const mutation = useMutation<unknown, unknown, Inputs>({
    mutationFn: (form) => {
      const start = dayjs(`${form.date} 00:00`, "YYYY-MM-DD HH:mm").toDate();
      return api.eventsPost({
        event: {
          showId: showId,
          start: start,
          name: form.name,
          options: {
            divider: true,
          },
        },
      });
    },
    onError: (e) => {
      toast.error("Something went wrong");
      console.error("Could not divider", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["EventsList", showId] });
      reset();
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
      <Input
        label="Date"
        register={register("date", { required: true })}
        errors={errors}
        type="date"
        showRequired
      />

      <Input
        label="Name"
        register={register("name", { required: true })}
        errors={errors}
        showRequired
      />

      <button
        type="submit"
        className={cc({ loading: mutation.isLoading }, "btn btn-block")}
      >
        Create divider
      </button>
    </form>
  );
};
