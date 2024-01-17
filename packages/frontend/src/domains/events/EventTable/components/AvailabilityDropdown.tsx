import { useMutation } from "@tanstack/react-query";
import cc from 'classnames';
import { getApi } from "core/api";
import { AvailabilityDTO, EventDTO, ScheduleEventDTO } from "core/api/generated";
import { useUserId } from "core/permissions";
import { useState } from "react";
import { toast } from "react-toastify";

const YES = "YES";
const NO = "NO";
const UNKNOWN = "UNKNOWN";

export const AvailabiltyDropdown: React.FC<{ event: ScheduleEventDTO }> = ({ event }) => {
  const api = getApi();

  const [value, setValue] = useState<string>(getStringFromBoolean(event.availability?.available));
  const userId = useUserId();
  const mutation = useMutation<AvailabilityDTO, any, boolean>({
    mutationFn: (bool) => api.availabilitiesPost({
      availability: {
        eventId: event.id,
        userId: userId || '',
        available: bool,
      }
    }),
    onError: (e) => {
      toast.error("Something went wrong updating availability");
      console.error("Could not update availability", e);
    },
    onSuccess: (a) => {
      setValue(getStringFromBoolean(a.available));
    },
  });

  const handleChange = (value: string) => {
    const available = getBooleanFromString(value)
    mutation.mutate(!!available);
  }

  return (
    <div className="w-32">
      {mutation.isLoading && <div className="bg-white absolute top-0 bottom-0 left-0 right-0 z-10">
        <div className="flex h-full justify-center items-center">
          <span className="loading loading-spinner loading-xs"></span>
        </div>
      </div>}
      <div className={cc(getBgColor(value), "absolute top-0 bottom-0 left-0 right-0")}>
        <select className="select w-full h-full bg-transparent" onChange={e => handleChange(e.target.value)} value={value}>
          <option value={UNKNOWN} disabled selected>Unknown</option>
          <option value={YES}>Yes</option>
          <option value={NO}>No</option>
        </select>
      </div>
    </div>
  )
}

const getBgColor = (value: string) => {
  switch (value) {
    case YES:
      return "bg-green-300";
    case NO:
      return "bg-red-300";
    case UNKNOWN:
      return "bg-amber-300";
    default:
      return "";
  }
}

const getBooleanFromString = (value: string) => {
  switch (value) {
    case YES:
      return true;
    case NO:
      return false;
    case UNKNOWN:
      return undefined;
    default:
      throw new Error(`Value cannot be transformed: ${value}`);
  }
}

const getStringFromBoolean = (value: boolean | undefined) => {
  switch (value) {
    case true:
      return YES;
    case false:
      return NO;
    case undefined:
      return UNKNOWN
    default:
      throw new Error(`Value cannot be transformed: ${value}`);
  }
}
