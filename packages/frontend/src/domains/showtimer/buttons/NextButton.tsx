import cc from "classnames";
import { HoldButton } from "domains/showtimer/HoldButton/HoldButton";
import { Phase, TimerLabels, Timers } from "domains/showtimer/ShowTimer/types";
import moment from "moment";
import { useState } from "react";
import { useLongPress } from "use-long-press";

import { ResetButton } from "./ResetButton";

export const NextButton: React.FC<
  React.PropsWithChildren<{
    timers: Timers;
    setTimers: (updatedTimers: Partial<Timers>) => void;
    sendEmailOfTimes: () => void;
    phase: Phase;
  }>
> = ({ timers, setTimers, phase: currentPhase }) => {
  const callback = (key: keyof Timers) => () => {
    setTimers({ [key]: moment() });
  };

  const TimeButton: React.FC<
    React.PropsWithChildren<{ timerKey: keyof Timers; className?: string }>
  > = ({ timerKey, className }) => {
    const [holding, setHolding] = useState(false);
    const value = timers[timerKey];

    const bind = useLongPress(
      value
        ? () => {
            callback(timerKey)();
            setHolding(false);
          }
        : null,
      {
        onCancel: () => setHolding(false),
        onStart: () => setHolding(true),
        threshold: 1500,
      }
    );

    return (
      <button
        {...bind()}
        onClick={value ? () => {} : callback(timerKey)}
        className={cc("btn flex flex-col flex-1", className)}
      >
        {TimerLabels[timerKey]}
        {value && (
          <span className="text-xs">
            {holding ? "Hold" : value.format("hh:mma")}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      <div className="">
        {currentPhase === Phase.beginners && (
          <>
            <div className="flex gap-2 w-full mb-2">
              <TimeButton timerKey="houseOpen" />
              <TimeButton timerKey="fohClearance" />
            </div>
            <HoldButton
              label="Start Act One"
              callback={callback("actOneStart")}
              helperText="Hold down button to start act one"
              confetti
            />
          </>
        )}
        {currentPhase === Phase.actOne && (
          <HoldButton
            label="Start Interval"
            callback={callback("intervalStart")}
            helperText="Hold down button to start interval"
            confetti
          />
        )}
        {currentPhase === Phase.interval && (
          <>
            <TimeButton
              timerKey="intervalFohClearance"
              className="mb-2 btn-block"
            />
            <HoldButton
              label="Start Act Two"
              callback={callback("intervalEnd")}
              helperText="Hold down button to start act two"
              confetti
            />
          </>
        )}
        {currentPhase === Phase.actTwo && (
          <>
            <HoldButton
              label="Curtain down"
              helperText="Hold down button to end show"
              callback={callback("actTwoEnd")}
              confetti
            />
          </>
        )}
        {currentPhase === Phase.postShow && (
          <ResetButton setTimers={setTimers} className="w-full" />
        )}
      </div>
    </>
  );
};
