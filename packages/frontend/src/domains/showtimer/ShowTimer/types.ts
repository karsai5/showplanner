import { Moment } from "moment";

export type Timers = {
  expectedCurtainsUp: Moment | null;

  actOneStart: Moment | null;
  intervalStart: Moment | null;
  intervalEnd: Moment | null;
  actTwoEnd: Moment | null;

  houseOpen: Moment | null;
  fohClearance: Moment | null;

  intervalFohClearance: Moment | null;
  bowsStart: Moment | null;
  orchestraEnd: Moment | null;
};

export type TimersOnChange = Partial<Record<keyof Timers, Date | null>>;

export const TimerLabels = {
  actOneStart: "Act one start",
  expectedCurtainsUp: "Expected curtains up",
  intervalStart: "Interval start",
  intervalEnd: "Act two start",
  actTwoEnd: "Curtains down",

  houseOpen: "House open",
  fohClearance: "FOH clearance",

  intervalFohClearance: "Interval FOH clearance",
  bowsStart: "Bows start",
  orchestraEnd: "Orchestra end",
};

export enum Phase {
  beginners = "Beginners",
  actOne = "Act One",
  interval = "Interval",
  actTwo = "Act Two",
  postShow = "Post show",
  unknown = "Unknown",
}

export const calculateCurrentPhase = (timers: Timers) => {
  if (
    !timers.actOneStart &&
    !timers.actTwoEnd &&
    !timers.intervalStart &&
    !timers.intervalEnd
  ) {
    return Phase.beginners;
  }

  if (
    timers.actOneStart &&
    !timers.intervalStart &&
    !timers.intervalEnd &&
    !timers.actTwoEnd
  ) {
    return Phase.actOne;
  }

  if (
    timers.actOneStart &&
    timers.intervalStart &&
    !timers.intervalEnd &&
    !timers.actTwoEnd
  ) {
    return Phase.interval;
  }

  if (
    timers.actOneStart &&
    timers.intervalStart &&
    timers.intervalEnd &&
    !timers.actTwoEnd
  ) {
    return Phase.actTwo;
  }

  if (
    timers.actOneStart &&
    timers.actTwoEnd &&
    timers.intervalStart &&
    timers.intervalEnd
  ) {
    return Phase.postShow;
  }

  return Phase.unknown;
};
