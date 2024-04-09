import confetti from "canvas-confetti";
import { ClipboardIcon, EmailIcon } from "core/components/Icons";
import { useCopyToClipboard } from "core/hooks/useCopyToClipboard";
import { NextButton } from "domains/showtimer/buttons/NextButton";
import { ChronoButton } from "domains/showtimer/ChronoButton";
import moment, { Moment } from "moment";
import React, { createContext, FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Beginners } from "./Beginners";
import { CurrentTimeCard } from "./CurrentTimeCard";
import { EditTimes } from "./EditTimes";
import { Interval } from "./Interval";
import { getShowLengths } from "./TimingDetails";
import { calculateCurrentPhase, Phase, Timers } from "./types";

const TIMERS_KEY = "timers";

export const emptyTimers: Timers = {
  actOneStart: null,
  intervalStart: null,
  intervalEnd: null,
  actTwoEnd: null,

  houseOpen: null,
  fohClearance: null,

  intervalFohClearance: null,
  bowsStart: null,
  orchestraEnd: null,
};

const rehydrateTimers = (timers: string | undefined) => {
  if (timers) {
    const parsedTimers = JSON.parse(timers);
    Object.keys(parsedTimers).forEach((key) => {
      const currentValue = parsedTimers[key];
      parsedTimers[key] = currentValue ? moment(currentValue) : null;
    });
    return parsedTimers;
  }
  return emptyTimers;
};

export const ConfettiContext = createContext<
  (options: confetti.Options) => void
>(() => {});

export const ShowTimer: FC = () => {
  const [, copy] = useCopyToClipboard();
  const initialTimers = rehydrateTimers(undefined);

  const [timers, unsafeSetTimers] = useState<Timers>(initialTimers);
  const phase = calculateCurrentPhase(timers);

  useEffect(() => {
    window.localStorage.getItem(TIMERS_KEY);
  }, []);

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
    window.localStorage.setItem(TIMERS_KEY, JSON.stringify(newTimers));
    unsafeSetTimers(newTimers);
  };

  return (
    <ConfettiContext.Provider value={(options) => confetti(options)}>
      <div className="w-full sm:w-80">
        <div className="card card-compact w-full bg-base-100 shadow-md mb-4 p-4">
          <CurrentTimeCard timers={timers} phase={phase} />
          <NextButton
            timers={timers}
            setTimers={setTimers}
            phase={phase}
            sendEmailOfTimes={sendEmailOfTimes}
          />
        </div>
        {phase === Phase.beginners && <Beginners />}
        {phase === Phase.interval && <Interval timers={timers} />}
        <div className="flex gap-2 mb-4">
          <ChronoButton className="flex-1" id="one" />
          <ChronoButton className="flex-1" id="two" />
          <ChronoButton className="flex-1" id="three" />
        </div>
        <div className="flex gap-2 mb-4">
          <button
            onClick={sendEmailOfTimes}
            className="btn btn-outline flex-1 flex flex-nowrap"
          >
            <EmailIcon className="mr-2" />
            Share via email
          </button>
          <button
            onClick={copyTimes}
            className="btn btn-outline flex-1 flex flex-nowrap"
          >
            <ClipboardIcon className="mr-2" />
            Copy to clipboard
          </button>
        </div>
        <EditTimes timers={timers} setTimers={setTimers} />
      </div>
    </ConfettiContext.Provider>
  );
};

const getTimersAndNotesSummary = (timers: Timers) => {
  const formatTime = (value: Moment | null) =>
    value ? moment(value).format("hh:mma") : "";
  const {
    actTwoLength,
    intervalLength,
    showLength,
    actOneLength,
  } = getShowLengths(timers);

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
