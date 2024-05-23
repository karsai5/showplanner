import { ShowReportDTO } from "core/api/generated";
import dayjs from "dayjs";
import { pickBy } from "lodash";

import { ShowReportInputs } from "./ShowReportForm";

export const getDefaultValuesForShowReport = (
  showReport: ShowReportDTO | null
): ShowReportInputs => {
  if (!showReport) {
    return {};
  }
  const valuesFromShowReport: ShowReportInputs = {
    title: showReport.title || undefined,
    subtitle: showReport.subtitle || undefined,
    notes: showReport.notes || undefined,

    showStart: parseTime(showReport.showStart),
    showEnd: parseTime(showReport.showEnd),
    intervalStart: parseTime(showReport.intervalStart),
    intervalEnd: parseTime(showReport.intervalEnd),
    houseOpen: parseTime(showReport.houseOpen),
    actOneFOHClearance: parseTime(showReport.actOneFOHClearance),
    actTwoFOHClearance: parseTime(showReport.actTwoFOHClearance),

    eventId: showReport.eventId || undefined,
  };

  return pickBy(valuesFromShowReport, (x) => x);
};

const parseTime = (time: Date | null | undefined) => {
  if (!time) {
    return undefined;
  }
  return dayjs(time).format("HH:mm");
};
