import { useMutation, useQueryClient } from "@tanstack/react-query";
import cc from "classnames";
import { getApi } from "core/api";
import { AvailabilityDTO, ScheduleEventDTO } from "core/api/generated";
import { useUserId } from "core/permissions";
import {
  getBgColor,
  getBooleanFromString,
  getStringFromBoolean,
  NO,
  UNKNOWN,
  YES,
} from "domains/rostering/helpers";
import { useState } from "react";
import { toast } from "react-toastify";

export const AvailabilityDropdown: React.FC<{ event: ScheduleEventDTO }> = ({
  event,
}) => {
  const api = getApi();

  const attendanceRequired = !!event.options?.attendanceRequired;
  const [value, setValue] = useState<string>(
    getStringFromBoolean(event.availability?.available)
  );
  const userId = useUserId();
  const queryClient = useQueryClient();
  const mutation = useMutation<AvailabilityDTO, unknown, boolean>({
    mutationFn: (bool) =>
      api.availabilitiesPost({
        availability: {
          eventId: event.id,
          personId: userId || "",
          available: bool,
        },
      }),
    onError: (e) => {
      toast.error("Something went wrong updating availability");
      console.error("Could not update availability", e);
    },
    onSuccess: (a) => {
      setValue(getStringFromBoolean(a.available));
      queryClient.invalidateQueries({ queryKey: ["EventsList", event.showId] });
    },
  });

  const handleChange = (value: string) => {
    const available = getBooleanFromString(value);
    mutation.mutate(!!available);
  };

  return (
    <div className="w-32">
      {mutation.isLoading && (
        <div className="bg-white absolute top-0 bottom-0 left-0 right-0 z-10">
          <div className="flex h-full justify-center items-center">
            <span className="loading loading-spinner loading-xs"></span>
          </div>
        </div>
      )}
      <div
        className={cc(
          getBgColor(value, {
            alternateColors: attendanceRequired,
          }),
          "absolute top-0 bottom-0 left-0 right-0"
        )}
      >
        <select
          className="select w-full h-full bg-transparent"
          onChange={(e) => handleChange(e.target.value)}
          value={value}
        >
          <option value={UNKNOWN} disabled>
            Unknown
          </option>
          <option value={YES}>
            {attendanceRequired ? "Attending" : "Available"}
          </option>
          <option value={NO}>
            {attendanceRequired ? "Not Attending" : "Unavailble"}
          </option>
        </select>
      </div>
    </div>
  );
};
