import cc from "classnames";
import { ClockIcon, PauseIcon, PlayIcon } from "core/components/Icons";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";
import { useLongPress } from "use-long-press";

dayjs.extend(duration);

const localStorageKey = (key?: string) =>
  key ? `chrono-button-state-${key}` : undefined;

const getInitialValue = (key?: string) => {
  if (!key) {
    return 0;
  }
  const valueFromLocalStorage = window.localStorage.getItem(key);
  if (!valueFromLocalStorage) {
    return 0;
  }
  try {
    return parseInt(valueFromLocalStorage, 10);
  } catch (err) {
    window.localStorage.removeItem(key);
    return 0;
  }
};

export const ChronoButton: React.FC<{ id?: string; className?: string }> = ({
  id: key,
  className,
}) => {
  const [milliseconds, setMilliseconds] = useState(0);

  useEffect(() => {
    getInitialValue(localStorageKey(key));
  });

  const [holding, setHolding] = useState(false);
  const [interval, saveInterval] = useState<NodeJS.Timer | undefined>(
    undefined
  );

  const startTimer = () => {
    saveInterval(
      setInterval(() => {
        setMilliseconds((milliseconds) => {
          if (key) {
            window.localStorage.setItem(
              localStorageKey(key) as string,
              (milliseconds + 1000).toString()
            );
          }
          return milliseconds + 1000;
        });
      }, 1000)
    );
  };

  const pauseTimer = () => {
    clearInterval(interval);
    saveInterval(undefined);
  };

  const resetTimer = () => {
    pauseTimer();
    setMilliseconds(0);
    if (key) {
      window.localStorage.removeItem(localStorageKey(key) as string);
    }
  };

  const handleClickOnRuningTimer = () => {
    if (interval) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const bind = useLongPress(
    () => {
      setHolding(false);
      resetTimer();
    },
    {
      onCancel: () => {
        setHolding(false);
        handleClickOnRuningTimer();
      },
      onStart: () => setHolding(true),
      threshold: 1500,
    }
  );

  if (milliseconds > 0 || interval) {
    if (interval) {
      return (
        <RunningTimer
          bind={bind}
          milliseconds={milliseconds}
          className={className}
        />
      );
    }
    return (
      <PausedTimer
        bind={bind}
        milliseconds={milliseconds}
        className={className}
      />
    );
  }
  return <DormantTimer onClick={startTimer} className={className} />;
};

const RunningTimer: React.FC<{
  bind: any;
  milliseconds: number;
  className?: string;
}> = ({ bind, milliseconds, className }) => {
  const [showTooltip, setShowTooltip] = useState(true);
  useEffect(() => {
    setTimeout(() => setShowTooltip(false), 3000);
  });
  return (
    <div
      className={cc(
        { ["tooltip-open"]: showTooltip },
        "tooltip tooltip-bottom",
        className
      )}
      data-tip="Tap to pause, hold to reset"
    >
      <button
        className="btn btn-block flex flex-nowrap btn-primary"
        {...bind()}
      >
        <PlayIcon className="mr-1" />
        <span className="countdown">
          <span
            style={
              { "--value": dayjs.duration(milliseconds).format("mm") } as any
            }
          ></span>
          :
          <span
            style={
              { "--value": dayjs.duration(milliseconds).format("ss") } as any
            }
          ></span>
        </span>
      </button>
    </div>
  );
};

const PausedTimer: React.FC<{
  bind: any;
  milliseconds: number;
  className?: string;
}> = ({ bind, milliseconds, className }) => {
  const [showTooltip, setShowTooltip] = useState(true);
  useEffect(() => {
    setTimeout(() => setShowTooltip(false), 3000);
  });
  return (
    <div
      className={cc(
        { ["tooltip-open"]: showTooltip },
        "tooltip tooltip-bottom",
        className
      )}
      data-tip="Tap to continue, hold to reset"
    >
      <button
        className="btn btn-block flex flex-nowrap btn-secondary"
        {...bind()}
      >
        <PauseIcon className="mr-1" />
        <span className="countdown">
          <span
            style={
              { "--value": dayjs.duration(milliseconds).format("mm") } as any
            }
          ></span>
          :
          <span
            style={
              { "--value": dayjs.duration(milliseconds).format("ss") } as any
            }
          ></span>
        </span>
      </button>
    </div>
  );
};

const DormantTimer: React.FC<{ onClick: any; className?: string }> = ({
  onClick,
  className,
}) => (
  <button
    onClick={onClick}
    className={cc("btn btn-block flex flex-nowrap", className)}
  >
    <ClockIcon className="mr-1" />
    00:00
  </button>
);
