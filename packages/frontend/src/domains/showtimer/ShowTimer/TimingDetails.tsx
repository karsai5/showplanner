import moment from "moment";

import { Timers } from "./types";

export const getShowLengths = (timers: Timers) => {
  const showDiff = moment(timers.actTwoEnd).diff(timers.actOneStart);
  const actOneDiff = moment(timers.intervalStart).diff(timers.actOneStart);
  const intervalDiff = moment(timers.intervalEnd).diff(timers.intervalStart);
  const actTwoDiff = moment(timers.actTwoEnd).diff(timers.intervalEnd);

  return {
    showDiff,
    actOneDiff,
    intervalDiff,
    actTwoDiff,
    actTwoLength: moment.utc(actTwoDiff).format("HH:mm:ss"),
    intervalLength: moment.utc(intervalDiff).format("HH:mm:ss"),
    showLength: moment.utc(showDiff).format("HH:mm:ss"),
    actOneLength: moment.utc(actOneDiff).format("HH:mm:ss"),
  };
};
