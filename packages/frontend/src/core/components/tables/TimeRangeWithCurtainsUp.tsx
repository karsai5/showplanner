import cc from "classnames";
import { ShortText } from "core/components/ShortText";
import { getTimeRangeString } from "core/dates/dateEventHelpers";
import { timeFormatString } from "core/dates/datesConstants";
import { useIsSticky } from "core/utils/useIsSticky";
import dayjs from "dayjs";
import { useRef } from "react";

import { Indicators } from "./Indicators";

export const TimeRangeWithCurtainsUp: React.FC<{
  event: {
    start?: Date;
    end?: Date | null;
    curtainsUp?: Date | null | undefined;
    name?: string | null | undefined;
  };
  compact?: boolean;
}> = ({ event, compact }) => {
  const { start, end, curtainsUp, name } = event;

  const timeRange = getTimeRangeString(start, end);
  const startTime = dayjs(start).format(timeFormatString);
  const curtainsUpString = curtainsUp
    ? dayjs(curtainsUp).format(timeFormatString)
    : undefined;
  return (
    <div className="flex">
      <div className="leading-4">
        {name && !compact ? (
          <span className="whitespace-nowrap">{name}</span>
        ) : (
          <ShortText className="w-16">{name}</ShortText>
        )}
        {curtainsUpString && !compact && (
          <span className="pl-1.5 text-xs whitespace-nowrap text-slate-500">
            {curtainsUpString}
          </span>
        )}
        <br />
        <span className="whitespace-nowrap text-sm">
          {!compact ? timeRange : <>{startTime}</>}
        </span>
      </div>
    </div>
  );
};

export const TimeRangeWithCurtainsUpCell: React.FC<
  React.ComponentProps<typeof TimeRangeWithCurtainsUp>
> = (props) => {
  const ref = useRef(null);
  const isSticky = useIsSticky(ref);
  const indicators = [
    {
      content: dayjs(props.event.start).format("ddd D/M"),
      className: "bg-gray-100",
    },
  ];

  return (
    <td
      className={cc(
        "border-l border-slate-200 last:border-r w-40 sticky left-0 bg-white z-30 p-0"
      )}
      ref={ref}
    >
      <div className={cc({ ["border-r"]: isSticky }, "flex p-2")}>
        {isSticky && <Indicators items={indicators} />}
        <TimeRangeWithCurtainsUp {...props} compact={isSticky} />
      </div>
    </td>
  );
};
