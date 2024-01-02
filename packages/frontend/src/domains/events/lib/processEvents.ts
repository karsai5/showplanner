import dayjs from "dayjs";
import { Dictionary } from "lodash";
import groupBy from "lodash/groupBy";
import orderBy from "lodash/orderBy";
import uniqBy from "lodash/uniqBy";

export const processEvents = <T>(
  unprocessedEvents?: Array<{ start: Date }>
) => {
  const uniqueDays = uniqBy(
    orderBy(unprocessedEvents, [(e) => e.start], ["asc"]).map((e) =>
      dayjs(e.start).startOf("day")
    ),
    (day) => day.toString()
  );

  const groupedEvents = groupBy(unprocessedEvents, (e) =>
    dayjs(e.start).startOf("day")
  ) as Dictionary<T[]>;

  const daysWithGaps = [];

  for (let i = 0; i < uniqueDays.length; i++) {
    const day = uniqueDays[i];
    const nextDay = i + 1 <= uniqueDays.length ? uniqueDays[i + 1] : undefined;

    const difference = nextDay ? nextDay.diff(day, "days") : 0;
    daysWithGaps.push({
      date: day,
      gapAfter: difference > 1,
    });
  }
  return { dates: daysWithGaps, groupedEvents: groupedEvents };
};
