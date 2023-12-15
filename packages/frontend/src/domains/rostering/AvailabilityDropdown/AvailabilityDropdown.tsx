import { ChangeEventHandler } from "react";

import { useUpdateAvailability } from "../lib/api";
import { Availability } from "../lib/types";

const YES = "Yes";
const NO = "No";
const UNKNOWN = "Unknown";

export const AvailabilityDropdown: React.FC<{
  availability?: Availability;
  loading?: boolean;
  event: {
    id: string | number;
  };
}> = ({ availability, loading: loadingAvailabilities, event }) => {
  const updateAvailability = useUpdateAvailability(availability, event.id);
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    console.log("value", getBooleanFromString(event.target.value));
    updateAvailability.mutate(getBooleanFromString(event.target.value));
  };
  if (updateAvailability.isLoading) {
    return <progress className="progress w-29"></progress>;
  }
  return (
    <select
      className="select w-29 -my-4 -mx-4 bg-transparent"
      onChange={handleChange}
      value={getStringFromBoolean(availability?.availability)}
    >
      {loadingAvailabilities && <option disabled>Loading</option>}
      {!loadingAvailabilities && (
        <>
          <option disabled>{UNKNOWN}</option>
          <option>{YES}</option>
          <option>{NO}</option>
        </>
      )}
    </select>
  );
};

const getStringFromBoolean = (value: boolean | undefined) => {
  if (value === true) {
    return YES;
  }
  if (value === false) {
    return NO;
  }
  return UNKNOWN;
};

const getBooleanFromString = (value: string) => {
  if (value === YES) {
    return true;
  }
  if (value === NO) {
    return false;
  }
  throw new Error("Could not get value from " + value);
};
