import { ShowTimerDTO } from "core/api/generated";
import moment from "moment";

import { Timers } from "./ShowTimer/types";

export const mapShowTimerDTOtoTimers = (
  timers: ShowTimerDTO
): Partial<Timers> => ({
  expectedCurtainsUp: timers.expectedCurtainsUp
    ? moment(timers.expectedCurtainsUp)
    : null,
  actOneStart: timers.showStart ? moment(timers.showStart) : null,
  intervalStart: timers.intervalStart ? moment(timers.intervalStart) : null,
  intervalEnd: timers.intervalEnd ? moment(timers.intervalEnd) : null,
  actTwoEnd: timers.showEnd ? moment(timers.showEnd) : null,
  houseOpen: timers.houseOpen ? moment(timers.houseOpen) : null,
  fohClearance: timers.actOneFOHClearance
    ? moment(timers.actOneFOHClearance)
    : null,
  intervalFohClearance: timers.actTwoFOHClearance
    ? moment(timers.actTwoFOHClearance)
    : null,
});
