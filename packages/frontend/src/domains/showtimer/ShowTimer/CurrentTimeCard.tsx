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

const phaseDescriptions: Array<PhaseDescription> = [
  {
    phase: Phase.actOne,
    label: "Act one",
    start: "actOneStart",
    end: "intervalStart",
  },
  {
    phase: Phase.interval,
    label: "Interval",
    start: "intervalStart",
    end: "intervalEnd",
  },
  {
    phase: Phase.actTwo,
    label: "Act two",
    start: "intervalEnd",
    end: "actTwoEnd",
  },
];

export const CurrentTimeCard: React.FC<Props> = ({ timers, phase }) => {
  const [now, setNow] = useState(moment());

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

  const showDiff = moment(timers.actTwoEnd || now).diff(timers.actOneStart);

  const finishedPhases = phaseDescriptions.filter(
    (pd) => timers[pd.start] && timers[pd.end]
  );

  return (
    <div className="mb-4">
      <BigClock phase={phase} timers={timers} />
      {timers.actOneStart && <div className="divider my-1" />}
      {showDiff > 0 && (
        <SmallTimeWithLabel
          label="Show length"
          start={timers.actOneStart}
          end={timers.actTwoEnd}
        />
      )}
      {finishedPhases.length > 0 && <div className="divider my-1" />}
      {finishedPhases.map((pd) => (
        <SmallTimeWithLabel
          key={pd.label}
          start={timers[pd.start]}
          end={timers[pd.end]}
          label={pd.label}
        />
      ))}
    </div>
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
      <BigTimeWithLabel
        label={currentPhaseTimer.label}
        secondaryLabel={timers[currentPhaseTimer.start]?.format("h:mma")}
      >
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

export const SmallTimeWithLabel: React.FC<{
  label: string;
  secondaryLabel?: string;
  start?: Moment | null;
  end?: Moment | null;
}> = ({ label, secondaryLabel, start, end }) => {
  if (!start) {
    return null;
  }
  const diff = moment(end || moment()).diff(start);
  const length = moment.utc(diff);
  return (
    <div className="flex justify-between">
      <div>
        <div className="font-bold">{label}</div>
        <span className="countdown">
          <span
            style={{ "--value": length.format("HH") } as React.CSSProperties}
          ></span>
          :
          <span
            style={{ "--value": length.format("mm") } as React.CSSProperties}
          ></span>
        </span>
      </div>
      {secondaryLabel && <div className="text-slate-500">{secondaryLabel}</div>}
    </div>
  );
};
