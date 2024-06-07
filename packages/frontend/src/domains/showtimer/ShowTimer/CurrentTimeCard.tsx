import { GapRow } from "core/components/tables/tables";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";

import { Phase, Timers } from "./types";

type Props = {
  timers: Timers;
  phase: Phase;
};

type PhaseDescription = {
  phase: Phase;
  label: string;
  start: keyof Timers;
  end: keyof Timers;
};

const phaseActOne: PhaseDescription = {
  phase: Phase.actOne,
  label: "Act one",
  start: "actOneStart",
  end: "intervalStart",
};
const phaseInterval: PhaseDescription = {
  phase: Phase.interval,
  label: "Interval",
  start: "intervalStart",
  end: "intervalEnd",
};
const phaseActTwo: PhaseDescription = {
  phase: Phase.actTwo,
  label: "Act two",
  start: "intervalEnd",
  end: "actTwoEnd",
};

const phaseDescriptions: Array<PhaseDescription> = [
  phaseActOne,
  phaseInterval,
  phaseActTwo,
];

export const CurrentTimeCard: React.FC<Props> = ({ timers, phase }) => {
  const [, setNow] = useState(moment()); // Needed to refresh every second

  useEffect(() => {
    setNow(moment());
  }, [timers]);

  useEffect(() => {
    const tick = setInterval(() => {
      setNow(moment());
    }, 1000);
    return () => {
      clearInterval(tick);
    };
  }, []);

  return (
    <div className="mb-4">
      <BigClock phase={phase} timers={timers} />
      {timers.actOneStart && (
        <table className="table">
          <thead>
            <tr>
              <th>Phase</th>
              <th>Time</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <DurationRow
              label={"Show length"}
              start={timers["actOneStart"]}
              end={timers["actTwoEnd"]}
            />
            <GapRow length={3} className="p-1" />
            <SingleTimeRow label={"House open"} time={timers["houseOpen"]} />
            <SingleTimeRow
              label={"FOH clearance"}
              time={timers["fohClearance"]}
            />
            <DurationRow
              label={"Act one"}
              start={timers["actOneStart"]}
              end={timers["intervalStart"]}
            />
            <DurationRow
              label={"Interval"}
              start={timers["intervalStart"]}
              end={timers["intervalEnd"]}
            />
            <SingleTimeRow
              label={"FOH clearance"}
              time={timers["intervalFohClearance"]}
            />
            <DurationRow
              label={"Act two"}
              start={timers["intervalEnd"]}
              end={timers["actTwoEnd"]}
            />
          </tbody>
        </table>
      )}
    </div>
  );
};

const DurationRow: React.FC<{
  label: string;
  start: Moment | null;
  end?: Moment | null;
}> = ({ label, start, end }) => {
  if (!start) {
    return null;
  }
  return (
    <tr key={label}>
      <th className="whitespace-nowrap">{label}</th>
      <td>
        <span className="whitespace-nowrap">
          <TimeRange start={start} end={end} />
        </span>
      </td>
      <td>
        <Duration start={start} end={end} />
      </td>
    </tr>
  );
};

const SingleTimeRow: React.FC<{ label: string; time: Moment | null }> = ({
  label,
  time,
}) => {
  if (!time) {
    return null;
  }
  return (
    <tr key={label}>
      <td className="whitespace-nowrap">{label}</td>
      <td colSpan={2}>{time.format("h:mma")}</td>
    </tr>
  );
};

const TimeRange: React.FC<{ start: Moment | null; end?: Moment | null }> = ({
  start,
  end,
}) => {
  if (!start) {
    return null;
  }
  return (
    <>
      {" "}
      {start.format("h:mma")} - {end ? end.format("h:mma") : "ongoing"}{" "}
    </>
  );
};

const TimerDisplay: React.FC<{ start: Moment | null }> = ({ start }) => {
  if (!start) {
    return null;
  }
  const diff = moment(moment()).diff(start);
  const length = moment.utc(diff);
  return (
    <span className="countdown">
      <span
        style={{ ["--value"]: length.hours() } as React.CSSProperties}
      ></span>
      :
      <span
        style={{ "--value": length.minutes() } as React.CSSProperties}
      ></span>
      :
      <span
        style={{ "--value": length.seconds() } as React.CSSProperties}
      ></span>
    </span>
  );
};

const BigClock: React.FC<Props> = ({ phase, timers }) => {
  const now = moment();
  const currentPhaseTimer = phaseDescriptions.find((pd) => pd.phase === phase);
  if (currentPhaseTimer) {
    return (
      <BigTimeWithLabel label={currentPhaseTimer.label}>
        <TimerDisplay start={timers[currentPhaseTimer.start]} />
      </BigTimeWithLabel>
    );
  }
  return (
    <BigTimeWithLabel label="Current time" secondaryLabel={phase}>
      <span className="countdown ">
        <span
          style={{ "--value": now.format("h") } as React.CSSProperties}
        ></span>
        :
        <span
          style={{ "--value": now.format("mm") } as React.CSSProperties}
        ></span>
        {now.format("a")}
      </span>
    </BigTimeWithLabel>
  );
};

const BigTimeWithLabel: React.FC<{
  label: string;
  secondaryLabel?: string;
  children: React.ReactNode;
}> = ({ label, secondaryLabel, children }) => {
  return (
    <div className="flex justify-between">
      <div>
        <div className="font-bold">{label}</div>
        <div className="font-mono font-bold text-4xl">{children}</div>
      </div>
      {secondaryLabel && <div className="text-slate-500">{secondaryLabel}</div>}
    </div>
  );
};

const Duration: React.FC<{
  start: Moment | null;
  end: Moment | null | undefined;
}> = ({ start, end }) => {
  const diff = moment(end || moment()).diff(start);
  const length = moment.utc(diff);
  return (
    <span className="countdown">
      <span
        style={{ "--value": length.format("HH") } as React.CSSProperties}
      ></span>
      :
      <span
        style={{ "--value": length.format("mm") } as React.CSSProperties}
      ></span>
    </span>
  );
};
