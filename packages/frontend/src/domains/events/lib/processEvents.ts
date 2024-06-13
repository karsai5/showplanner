import dayjs from "dayjs";
import { Dictionary } from "lodash";
import groupBy from "lodash/groupBy";
import orderBy from "lodash/orderBy";
import uniqBy from "lodash/uniqBy";

export type EventWithStart = {
  start: Date;
};

export const processEvents = <T extends EventWithStart>(
  unprocessedEvents?: Array<{ start: Date }>,
  hidePastEvents?: boolean
) => {
  const startOfToday = dayjs().startOf("day");
  const filteredEvents =
    unprocessedEvents?.filter((e) => {
      if (!hidePastEvents) return true;
      return dayjs(e.start).isAfter(startOfToday);
    }) || [];

  const uniqueDays = uniqBy(
    orderBy(filteredEvents, [(e) => e.start], ["asc"]).map((e) =>
      dayjs(e.start).startOf("day")
    ),
    (day) => day.toString()
  );

  const groupedEvents = groupBy(filteredEvents, (e) =>
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
