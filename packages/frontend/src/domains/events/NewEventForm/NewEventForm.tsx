import { useMutation, useQueryClient } from "@tanstack/react-query";
import cc from "classnames";
import { getApi } from "core/api";
import Input from "core/components/fields/TextInput";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useShowSummary } from "domains/shows/lib/summaryContext";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

dayjs.extend(customParseFormat)


type Inputs = {
  start: string;
  end: string;
  curtainsUp: string;
  date: string;
};

interface NewShowFormProps {
  onSuccess?: () => void;
}

const NewEventForm: FC<NewShowFormProps> = ({ onSuccess }) => {
  const show = useShowSummary();
  const queryClient = useQueryClient();
  const api = getApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const getRequiredDateTime = (date: string, time: string) => {
    const result = getDateTime(date, time);
    if (!result) {
      throw new Error("date or time missing");
    }
    return result;
  }

  const getDateTime = (date: string, time: string) => {
    if (!date || !time) {
      return undefined;
    }
    return dayjs(`${date} ${time}`, 'YYYY-MM-DD HH:mm').toDate();
  }


  const mutation = useMutation<any, unknown, Inputs>({
    mutationFn: (data) => api.eventsPost({
      event: {
        showId: show.id,
        start: getRequiredDateTime(data.date, data.start),
        end: getDateTime(data.date, data.end),
        curtainsUp: getDateTime(data.date, data.curtainsUp),
      }
    }),
    onError: (e) => {
      toast.error("Something went wrong creating new event");
      console.error("Could not create show", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["EventsList", show.id] });
      toast.success("Succesfully created a new event");
      reset();
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return (
    <form
      data-testid="NewEventForm"
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
    >
      <Input
        label="Date"
        register={register("date", { required: true })}
        errors={errors}
        type="date"
        showRequired
      />
      <div className="flex gap-2">
        <Input
          label="Start"
          register={register("start", { required: true })}
          errors={errors}
          type="time"
          showRequired
        />
        <Input
          label="End"
          register={register("end")}
          errors={errors}
          type="time"
        />
      </div>
      <Input
        label="Curtains up"
        register={register("curtainsUp")}
        errors={errors}
        helpText="What time the show should start"
        type="time"
      />
      <button
        type="submit"
        className={cc({ loading: mutation.isLoading }, "btn btn-block")}
      >
        Create show
      </button>
    </form>
  );
};

export default NewEventForm;
