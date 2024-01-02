import { useMutation, useQueryClient } from "@tanstack/react-query";
import cc from "classnames";
import { getApi } from "core/api";
import AddressPicker from "core/components/fields/AddressPicker/AddressPicker";
import Input from "core/components/fields/TextInput";
import { getStaticMap } from "core/maps/maps";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { useController, useForm } from "react-hook-form";
import { toast } from "react-toastify";

dayjs.extend(customParseFormat)


type Inputs = {
  start: string;
  end: string;
  curtainsUp: string;
  date: string;
  address?: {
    lat: number;
    lng: number;
    address: string;
  },
  name: string,
  shortNote: string,
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
    control,
    watch,
  } = useForm<Inputs>();

  const addressControl = useController({ name: "address", control });
  const address = watch('address');

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
    mutationFn: (form) => api.eventsPost({
      event: {
        showId: show.id,
        start: getRequiredDateTime(form.date, form.start),
        end: getDateTime(form.date, form.end),
        curtainsUp: getDateTime(form.date, form.curtainsUp),
        address: form.address?.address,
        shortnote: form.shortNote,
        name: form.name
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

      <Input
        label="Event name"
        register={register("name")}
        errors={errors}
      />

      <Input
        label="Note"
        register={register("shortNote")}
        errors={errors}
        helpText="Note will appear in calendar description"
      />

      <AddressPicker
        control={addressControl}
        className="mb-2"
        placeholder="Address"
        label="Address"
      />
      {address?.lat && (
        <a className="cursor-pointer" rel="noreferrer" target="_blank" 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.address)}`}>
        <div className="flex justify-center mb-4">
          <Image
            alt={`map of ${address.address}`}
            className="rounded-md"
            height="300px"
            width="600px"
            src={getStaticMap(address.lat, address.lng)}
          />
        </div>
        </a>
      )}
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
