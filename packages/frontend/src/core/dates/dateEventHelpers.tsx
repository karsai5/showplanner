import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);


import { dateFormatString, timeFormatString } from "./datesConstants";

export const getTimeRangeWithCurtainsUp = (
  start?: Date,
  end?: Date | null,
  curtainsUp?: Date
) => {
  let stringBuilder = getTimeRangeString(start, end);
  if (stringBuilder?.length) {
    if (curtainsUp) {
      stringBuilder += ` (${dayjs(curtainsUp).format(timeFormatString)} show)`;
    }
    return stringBuilder;
  }
};

export const TimeRangeWithCurtainsUp: React.FC<{
  event: {
    start?: Date;
    end?: Date | null;
    curtainsUp?: Date | null | undefined;
    name?: string | null | undefined;
  };
}> = ({ event }) => {
  const { start, end, curtainsUp, name } = event;

  const timeRange = getTimeRangeString(start, end);
  return (
    <div className="flex gap-1">
      <div className="cover-box-container">
        {curtainsUp && (
          <div className="cover-box bg-gray-100">
            <div className="cover-box-content">
              {dayjs(curtainsUp).format(timeFormatString)}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div>
          {name && <span className="whitespace-nowrap mr-2">{name}</span>}
        </div>
        <span className="whitespace-nowrap text-sm">{timeRange}</span>
      </div>
    </div>
  );
};

export const getTimeRangeString = (
  startString?: Date,
  endString?: Date | null
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
