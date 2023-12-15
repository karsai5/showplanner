import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

import { dateFormatString, timeFormatString } from "./datesConstants";

export const getTimeRangeWithCurtainsUp = (
  startString?: string,
  endString?: string,
  curtainsUpString?: string
) => {
  let stringBuilder = getTimeRangeString(startString, endString);
  if (stringBuilder?.length) {
    if (curtainsUpString) {
      const curtainsUp = dayjs(curtainsUpString, "HH:mm");
      stringBuilder += ` (${curtainsUp.format(timeFormatString)} show)`;
    }
    return stringBuilder;
  }
};

export const getTimeRangeString = (
  startString?: string,
  endString?: string
) => {
  if (!startString) {
    return "";
  }
  const start = dayjs(startString);
  let stringBuilder = dayjs(start).format(timeFormatString);
  let sameDay = false;
  if (endString) {
    const end = dayjs(endString);
    const endTime = end.format(timeFormatString);
    sameDay = dayjs(endString).isSame(start, "day");

    if (sameDay) {
      stringBuilder += ` - ${endTime}`;
    } else if (
      dayjs(startString).add(1, "day").startOf("day").isSame(endString)
    ) {
      stringBuilder += " - midnight";
    } else {
      stringBuilder += ` - ${endTime} (${dayjs(endString).format(
        dateFormatString
      )})`;
    }
  }
  return stringBuilder;
};
