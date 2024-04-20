import { ShortText } from "core/components/ShortText";
import { getTimeRangeString } from "core/dates/dateEventHelpers";
import { timeFormatString } from "core/dates/datesConstants";
import dayjs from "dayjs";

import { Indicators } from "./Indicators";

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
  const indicators = curtainsUp
    ? [
        {
          content: dayjs(curtainsUp).format(timeFormatString),
          className: "bg-gray-100",
        },
      ]
    : [];
  return (
    <div className="flex">
      <Indicators items={indicators} className="mr-1.5" />
      <div className="leading-4">
        <span>
          {name && <ShortText className="max-w-32">{name}</ShortText>}
        </span>
        <br />
        <span className="whitespace-nowrap text-sm">{timeRange}</span>
      </div>
    </div>
  );
};
