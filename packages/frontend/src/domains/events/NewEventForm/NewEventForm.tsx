import { useMutation, useQueryClient } from '@tanstack/react-query';
import cc from 'classnames';
import { getApi } from 'core/api';
import { EventDTO } from 'core/api/generated';
import AddressPicker from 'core/components/fields/AddressPicker/AddressPicker';
import Input from 'core/components/fields/TextInput';
import { getStaticMap } from 'core/maps/maps';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Image from 'next/image';
import React, { FC } from 'react';
import { useController, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

dayjs.extend(customParseFormat);

const DEFAULT_PRE_SHOW_DURATION = 1.5;
const DEFAULT_POST_SHOW_DURATION = 3.5;

const AUTO_START_END_TOOLTIP = `Set start time to ${DEFAULT_PRE_SHOW_DURATION} hours before curtains up and end to ${DEFAULT_POST_SHOW_DURATION} hours after curtains up`;

type Inputs = {
  start: string;
  end: string;
  curtainsUp: string;
  date: string;
  address?: {
    lat: number | null;
    lng: number | null;
    address: string;
  };
  name: string;
  shortNote: string;
};

const NewEventForm: FC<{
  onSuccess?: () => void;
  event?: EventDTO;
  showId: number;
}> = ({ onSuccess, event, showId }) => {
  const queryClient = useQueryClient();
  const api = getApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    setValue,
  } = useForm<Inputs>({
    defaultValues: getDefaultValues(event),
  });

  const addressControl = useController({ name: 'address', control });
  const address = watch('address');
  const curtainsUp = watch('curtainsUp');

  const setDefaultStartAndEnd = () => {
    const t = getDayJsTime('2020-01-01', curtainsUp);
    if (!t) {
      return;
    }
    setValue('start', formatTime(t.subtract(DEFAULT_PRE_SHOW_DURATION, 'h')));
    setValue('end', formatTime(t.add(DEFAULT_POST_SHOW_DURATION, 'h')));
  };

  const mutation = useMutation<unknown, unknown, Inputs>({
    mutationFn: (form) => {
      if (!event) {
        return api.eventsPost({
          event: {
            showId: showId,
            start: getRequiredDateTime(form.date, form.start),
            end: getDateTime(form.date, form.end),
            curtainsUp: getDateTime(form.date, form.curtainsUp),
            address: form.address?.address,
            shortnote: form.shortNote,
            name: form.name,
          },
        });
      } else {
        return api.eventsIdPost({
          id: event.id,
          event: {
            showId: event.showId || showId,
            start: getRequiredDateTime(form.date, form.start),
            end: getDateTime(form.date, form.end),
            curtainsUp: getDateTime(form.date, form.curtainsUp),
            address: form.address?.address,
            shortnote: form.shortNote,
            name: form.name,
          },
        });
      }
    },
    onError: (e) => {
      toast.error('Something went wrong');
      console.error('Could not create/update event', e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['EventsList', showId] });
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
        register={register('date', { required: true })}
        errors={errors}
        type="date"
        showRequired
      />
      <div className="flex gap-2">
        <Input
          label="Start"
          register={register('start', { required: true })}
          errors={errors}
          type="time"
          showRequired
        />
        <Input
          label="End"
          register={register('end')}
          errors={errors}
          type="time"
        />
      </div>
      <div className="flex gap-2">
        <Input
          label="Curtains up"
          register={register('curtainsUp')}
          errors={errors}
          helpText="What time the show should start"
          type="time"
        />

        <div className="tooltip tooltip-left" data-tip={AUTO_START_END_TOOLTIP}>
          <button
            className="btn mt-8"
            type="button"
            disabled={!curtainsUp}
            onClick={() => setDefaultStartAndEnd()}
          >
            Auto start/end
          </button>
        </div>
      </div>

      <Input label="Event name" register={register('name')} errors={errors} />

      <Input
        label="Note"
        register={register('shortNote')}
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
        <a
          className="cursor-pointer"
          rel="noreferrer"
          target="_blank"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            address.address,
          )}`}
        >
          <div className="flex justify-center mb-4">
            <Image
              alt={`map of ${address.address}`}
              className="rounded-md"
              height="300"
              width="600"
              src={getStaticMap(address.lat, address.lng)}
            />
          </div>
        </a>
      )}
      <button
        type="submit"
        className={cc({ loading: mutation.isLoading }, 'btn btn-block')}
      >
        {event ? 'Update' : 'Create event'}
      </button>
    </form>
  );
};

export default NewEventForm;
const getDefaultValues = (
  event: EventDTO | undefined,
): Partial<Inputs> | undefined => {
  if (!event) {
    return undefined;
  }

  const defaultValues: Inputs = {
    start: formatTime(dayjs(event.start)),
    end: event.end ? formatTime(dayjs(event.end)) : '',
    curtainsUp: event.curtainsUp ? formatTime(dayjs(event.curtainsUp)) : '',
    date: formatDate(dayjs(event.start)),
    name: event.nameRaw || '',
    shortNote: event.shortnote || '',
    address: {
      lat: null,
      lng: null,
      address: event.address || '',
    },
  };

  return defaultValues;
};

const formatTime = (t: Dayjs) => t.format('HH:mm');
const formatDate = (d: Dayjs) => d.format('YYYY-MM-DD');

const getRequiredDateTime = (date: string, time: string) => {
  const result = getDateTime(date, time);
  if (!result) {
    throw new Error('date or time missing');
  }
  return result;
};

const getDateTime = (date: string, time: string) => {
  return getDayJsTime(date, time)?.toDate();
};

const getDayJsTime = (date: string, time: string) => {
  if (!date || !time) {
    return undefined;
  }
  return dayjs(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
};
