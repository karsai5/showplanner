import { TrashIcon } from "@heroicons/react/24/outline";
import cc from "classnames";
import { ClockIcon, PauseIcon, PlayIcon } from "core/components/Icons";
import { useConfirmationModal } from "core/components/Modal/ConfirmationModal";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";

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
  const confirmationModal = useConfirmationModal();
  const [milliseconds, setMilliseconds] = useState(0);

  useEffect(() => {
    getInitialValue(localStorageKey(key));
  });

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
    confirmationModal(
      "Reset timer",
      "Are you sure you want to reset this timer?",
      () => {
        pauseTimer();
        setMilliseconds(0);
        if (key) {
          window.localStorage.removeItem(localStorageKey(key) as string);
        }
      }
    );
  };

  if (milliseconds > 0 || interval) {
    return (
      <div className="flex gap-1 w-full">
        {interval ? (
          <RunningTimer
            onClick={() => pauseTimer()}
            milliseconds={milliseconds}
            className={className}
          />
        ) : (
          <PausedTimer
            onClick={() => startTimer()}
            milliseconds={milliseconds}
            className={className}
          />
        )}
        <button className="btn btn-secondary" onClick={resetTimer}>
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    );
  }
  return <DormantTimer onClick={startTimer} className={className} />;
};

const RunningTimer: React.FC<{
  onClick: () => void;
  milliseconds: number;
  className?: string;
}> = ({ onClick, milliseconds, className }) => {
  return (
    <div className={className}>
      <button
        className="btn btn-block flex flex-nowrap btn-primary"
        onClick={onClick}
      >
        <PlayIcon className="mr-1" />
        <span className="countdown">
          <span
            style={
              {
                "--value": dayjs.duration(milliseconds).format("mm"),
              } as React.CSSProperties
            }
          ></span>
          :
          <span
            style={
              {
                "--value": dayjs.duration(milliseconds).format("ss"),
              } as React.CSSProperties
            }
          ></span>
        </span>
      </button>
    </div>
  );
};

const PausedTimer: React.FC<{
  onClick: () => void;
  milliseconds: number;
  className?: string;
}> = ({ onClick, milliseconds, className }) => {
  return (
    <div className={className} data-tip="Tap to continue, hold to reset">
      <button
        className="btn btn-block flex flex-nowrap btn-secondary"
        onClick={onClick}
      >
        <PauseIcon className="mr-1" />
        <span className="countdown">
          <span
            style={
              {
                "--value": dayjs.duration(milliseconds).format("mm"),
              } as React.CSSProperties
            }
          ></span>
          :
          <span
            style={
              {
                "--value": dayjs.duration(milliseconds).format("ss"),
              } as React.CSSProperties
            }
          ></span>
        </span>
      </button>
    </div>
  );
};

const DormantTimer: React.FC<{ onClick: () => void; className?: string }> = ({
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
