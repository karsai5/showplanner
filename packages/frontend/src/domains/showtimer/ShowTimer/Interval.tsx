import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";
import React, { useEffect, useState } from "react";

import { TimeTill } from "./Beginners";
import { Timers } from "./types";

const BEGINNERS_DURATION = 5;
const INTERVAL_DURATION = 20;

type Call = {
  duration: number;
  name?: string;
};

const calls: Array<Call> = [
  { duration: 15 },
  { duration: 10 },
  { duration: 5 },
];

export const Interval: React.FC<
  React.PropsWithChildren<{
    timers: Timers;
  }>
> = ({ timers }) => {
  const intervalStart = timers.intervalStart;
  const [nowPerSecond, setNow] = useState(moment());

  useEffect(() => {
    const tick = setInterval(() => {
      setNow(moment());
    }, 1000);
    return () => {
      clearInterval(tick);
    };
  }, []);

  if (!intervalStart) {
    return <p>Start interval to see call times.</p>;
  }

  const beginners = moment(intervalStart)
    .add(INTERVAL_DURATION, "m")
    .subtract(BEGINNERS_DURATION, "m");
  const curtainsUp = moment(intervalStart).add(INTERVAL_DURATION, "m");

  const diffTillCurtainsUp = moment(curtainsUp).diff(nowPerSecond);

  const diffTillBeginners = moment(beginners).diff(nowPerSecond);

  const firstCall = moment(beginners).subtract(calls[0].duration, "m");
  const minutesDifference = moment(curtainsUp).diff(firstCall, "minutes");
  const difference = moment().diff(firstCall, "minutes");

  const percent = Math.round((difference / minutesDifference) * 100);

  return (
    <div className="card card-compact w-full bg-base-100 shadow-md mb-4 p-4">
      <progress
        className="progress progress-accent w-full mb-2"
        value={percent}
        max={100}
      ></progress>
      <TimeTill label="Beginners" time={beginners} diff={diffTillBeginners} />
      <TimeTill
        label="Curtains up"
        time={curtainsUp}
        diff={diffTillCurtainsUp}
      />
    </div>
  );
};
