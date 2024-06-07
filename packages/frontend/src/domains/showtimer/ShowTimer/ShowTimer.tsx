import confetti from "canvas-confetti";
import { ClipboardIcon, EmailIcon } from "core/components/Icons";
import { useCopyToClipboard } from "core/hooks/useCopyToClipboard";
import { NextButton } from "domains/showtimer/buttons/NextButton";
import { ChronoButton } from "domains/showtimer/ChronoButton";
import { forEach } from "lodash";
import moment, { Moment } from "moment";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";

import { Beginners } from "./Beginners";
import { ConfettiContext } from "./confettiContext";
import { CurrentTimeCard } from "./CurrentTimeCard";
import { EditTimes } from "./EditTimes";
import { emptyTimers } from "./emptyTimers";
import { Interval } from "./Interval";
import { getShowLengths } from "./TimingDetails";
import { calculateCurrentPhase, Phase, Timers, TimersOnChange } from "./types";

export const ShowTimer: FC<{
  onChange?: (timers: TimersOnChange) => void;
  initialTimers?: Partial<Timers>;
}> = ({ onChange, initialTimers }) => {
  const [, copy] = useCopyToClipboard();
  const [timers, unsafeSetTimers] = useState<Timers>({
    ...emptyTimers,
    ...initialTimers,
  });
  const phase = calculateCurrentPhase(timers);

  const sendEmailOfTimes = () => window.open(getMailToLink(timers));

  const copyTimes = async () => {
    if (await copy(getTimersAndNotesSummary(timers))) {
      toast.success("Copied summary to clipboard for sharing");
    } else {
      toast.error("Could not copy summary. Try sending as an email instead.");
    }
  };

  const setTimers = (updatedTimers: Partial<Timers>) => {
    const newTimers = { ...timers, ...updatedTimers };
    if (onChange) {
      const mappedValues: TimersOnChange = {};
      forEach(newTimers, (value, key) => {
        mappedValues[key as keyof Timers] = value ? value.toDate() : null;
      });
      onChange(mappedValues);
    }
    unsafeSetTimers(newTimers);
  };

  return (
    <ConfettiContext.Provider value={(options) => confetti(options)}>
      <div className="w-full sm:w-96">
        <div className="card card-compact w-full bg-base-100 shadow-md mb-4 p-4">
          <CurrentTimeCard timers={timers} phase={phase} />
          <NextButton
            timers={timers}
            setTimers={setTimers}
            phase={phase}
            sendEmailOfTimes={sendEmailOfTimes}
          />
        </div>
        {phase === Phase.beginners && (
          <Beginners timers={timers} setTimers={setTimers} />
        )}
        {phase === Phase.interval && <Interval timers={timers} />}
        <div className="flex gap-2 mb-4">
          <ChronoButton className="flex-1" id="one" />
          <ChronoButton className="flex-1" id="two" />
        </div>
        {timers.actTwoEnd && (
          <div className="flex gap-2 mb-4">
            <button
              onClick={sendEmailOfTimes}
              className="btn btn-primary text-white flex-1 flex flex-nowrap"
            >
              <EmailIcon className="mr-2" />
              Share via email
            </button>
            <button
              onClick={copyTimes}
              className="btn btn-primary text-white flex-1 flex flex-nowrap"
            >
              <ClipboardIcon className="mr-2" />
              Copy to clipboard
            </button>
          </div>
        )}
        <EditTimes timers={timers} setTimers={setTimers} />
      </div>
    </ConfettiContext.Provider>
  );
};

const getTimersAndNotesSummary = (timers: Timers) => {
  const formatTime = (value: Moment | null) =>
    value ? moment(value).format("hh:mma") : "";
  const { actTwoLength, intervalLength, showLength, actOneLength } =
    getShowLengths(timers);

  const {
    houseOpen,
    fohClearance,
    actOneStart,
    intervalStart,
    intervalEnd,
    intervalFohClearance,
    actTwoEnd,
  } = timers;

  let body = `Show times for ${moment().format("dddd, MMMM Do")}\n\n`;
  body = body + "SHOW TIMES\n";
  if (houseOpen && (fohClearance || actOneStart)) {
    body =
      body +
      `House open: ${formatTime(houseOpen)} - ${formatTime(
        fohClearance || actOneStart
      )} \n`;
  }
  if (actOneStart && intervalStart) {
    body =
      body +
      `Act one: ${formatTime(actOneStart)} - ${formatTime(
        intervalStart
      )} (${actOneLength})\n`;
  }
  if (intervalStart && intervalEnd) {
    body = body + `Interval: ${intervalLength}`;
    body =
      body +
      (intervalFohClearance
        ? ` (FOH clearance given at ${formatTime(intervalFohClearance)})\n`
        : "\n");
  }
  if (intervalEnd && actTwoEnd) {
    body =
      body +
      `Act two: ${formatTime(intervalEnd)} - ${formatTime(
        actTwoEnd
      )} (${actTwoLength})\n`;
  }
  if (actOneStart && actTwoEnd) {
    body =
      body +
      `Show: ${formatTime(actOneStart)} - ${formatTime(
        actTwoEnd
      )} (${showLength})\n`;
  }
  body = body + "\nDETAILED TIMESTAMPS\n";
  body =
    body +
    Object.keys(timers)
      .map((key) => {
        const value = timers[key as keyof Timers];
        const formattedValue = value ? moment(value).format("hh:mma") : "";
        return `${key}: ${formattedValue}`;
      })
      .join("\n");

  return body;
};

const getMailToLink = (timers: Timers) => {
  const encodedBody = encodeURIComponent(getTimersAndNotesSummary(timers));
  const href = `mailto:?subject=Show%20Times&body=${encodedBody}`;
  return href;
};
