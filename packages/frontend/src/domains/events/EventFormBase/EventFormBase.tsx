import { UseMutationResult } from "@tanstack/react-query";
import cc from "classnames";
import AddressPicker from "core/components/fields/AddressPicker/AddressPicker";
import Checkbox from "core/components/fields/Checkbox";
import TextArea from "core/components/fields/TextArea";
import Input from "core/components/fields/TextInput";
import { getStaticMap } from "core/maps/maps";
import dayjs from "dayjs";
import React, { FC, ReactNode, useEffect } from "react";
import { useController, useForm } from "react-hook-form";

import { CreateEvent } from "../lib/types";

type Inputs = {
  date: string;
  startTime: string;
  endTime: string;
  name?: string;
  shortnote?: string;
  curtainsUp?: string;
  requiresAvailabilities: boolean;
  showId: string;
  publishedAt: Date;
  address?: {
    address: string;
    lat?: number;
    lng?: number;
  };
  addressName?: string;
};

export interface EventFormProps {
  showId: string;
  mutation: UseMutationResult<any, unknown, CreateEvent, any>;
  defaultValues?: CreateEvent & { id: string };
  resetOnSuccess?: boolean;
}

const EventFormBase: FC<EventFormProps> = ({
  showId,
  mutation,
  defaultValues,
  resetOnSuccess = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
    watch,
    control,
  } = useForm<Inputs>({
    defaultValues: defaultValues
      ? mapDefaultValues(defaultValues, showId)
      : {
          requiresAvailabilities: true,
          showId: showId,
          publishedAt: new Date(),
          address: undefined,
        },
  });

  const address = watch("address");

  const addressControl = useController({ name: "address", control });

  useEffect(() => {
    const values = getValues();
    if (values.startTime && !values.endTime) {
      setValue("endTime", values.startTime);
    }
  }, [watch("startTime")]);

  return (
    <form
      data-testid="EventForm"
      onSubmit={handleSubmit((data) => {
        mutation.mutate(mapData(data), {
          onSuccess: (result) => {
            if (resetOnSuccess) {
              return reset();
            }
          },
        });
      })}
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          label="Event date"
          register={register("date", { required: true })}
          errors={errors}
          showRequired
          type="date"
        />
        <Input
          label="Start time"
          register={register("startTime", { required: true })}
          errors={errors}
          showRequired
          type="time"
        />
        <Input
          label="End time"
          register={register("endTime", { required: true })}
          errors={errors}
          showRequired
          type="time"
        />
      </div>
      <Input placeholder="Name" register={register("name")} errors={errors} />
      <TextArea
        placeholder="Note"
        register={register("shortnote")}
        errors={errors}
        className="mb-4"
      />
      <Input
        placeholder="Location name"
        register={register("addressName")}
        helpText="If not provided just the address will be used."
        errors={errors}
      />
      <AddressPicker
        control={addressControl}
        className="mb-2"
        placeholder="Address"
      />
      {address?.lat && (
        <img
          className="rounded-md w-full mb-4"
          src={getStaticMap(address.lat, address.lng)}
        />
      )}
      <p className="mt-4 mb-2 text-lg font-bold">Event options</p>
      <HelpText
        text="Curtains up is the expected time to start the show. Setting this will make the event a 'Show' type"
        className="pt-8"
      >
        <Input
          label="Curtains Up"
          register={register("curtainsUp")}
          errors={errors}
          type="time"
        />
      </HelpText>
      <HelpText text="Setting this means that the event will appear in the availabilities section of the site">
        <Checkbox
          label="Require availabilities"
          register={register("requiresAvailabilities")}
          errors={errors}
        />
      </HelpText>
      <button
        type="submit"
        className={cc({ loading: mutation.isLoading }, "btn btn-block mt-4")}
      >
        {defaultValues ? "Update event" : "Create event"}
      </button>
    </form>
  );
};

const mapData = (formData: Inputs): CreateEvent => {
  const mappingResult: any = {
    start: dayjs(`${formData.date} ${formData.startTime}`).toDate(),
    end: dayjs(`${formData.date} ${formData.endTime}`).toDate(),
    show: formData.showId,
    name: formData.name,
    shortnote: formData.shortnote,
    curtainsUp: formData.curtainsUp,
    requiresAvailabilities: formData.requiresAvailabilities,
    publishedAt: formData.publishedAt,
  };
  if (formData.address || formData.addressName) {
    mappingResult.location = {
      name: formData.addressName,
      address: formData.address?.address,
      lat: formData.address?.lat,
      lng: formData.address?.lng,
    };
  }
  return mappingResult;
};

const mapDefaultValues = (
  defaultValues: CreateEvent,
  showId: string
): Inputs => {
  return {
    date: dayjs(defaultValues.start).format("YYYY-MM-DD"),
    startTime: dayjs(defaultValues.start).format("HH:mm"),
    endTime: dayjs(defaultValues.end).format("HH:mm"),
    name: defaultValues.name,
    shortnote: defaultValues.shortnote,
    curtainsUp: defaultValues.curtainsUp,
    requiresAvailabilities: defaultValues.requiresAvailabilities,
    address: {
      address: defaultValues.location?.address || "",
      lat: defaultValues.location?.lat,
      lng: defaultValues.location?.lng,
    },
    addressName: defaultValues.location?.name,
    showId,
    publishedAt: new Date(),
  };
};

const HelpText: React.FC<{
  children: ReactNode;
  text: string;
  className?: string;
}> = ({ children, text, className }) => {
  return (
    <div className="flex w-100 gap-4">
      <div className="flex-1">{children}</div>
      <div className={cc("flex-1 text-sm", className)}>{text}</div>
    </div>
  );
};

export default EventFormBase;
