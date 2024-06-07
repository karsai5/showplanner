import moment from "moment";

import { Timers } from "./types";

export const emptyTimers: Timers = {
  expectedCurtainsUp: moment().set({
    hour: 19,
    minute: 30,
    second: 0,
    millisecond: 0,
  }),
  actOneStart: null,
  intervalStart: null,
  intervalEnd: null,
  actTwoEnd: null,

  houseOpen: null,
  fohClearance: null,

  intervalFohClearance: null,
};
