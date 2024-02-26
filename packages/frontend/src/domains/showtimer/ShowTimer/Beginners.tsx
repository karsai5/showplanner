import 'react-datepicker/dist/react-datepicker.css';

import cc from 'classnames';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';

const BEGINNERS_DURATION = 5;
const LOCALSTORAGE_KEY = 'beginners-curtainsUp';

type Call = {
  duration: number;
  name?: string;
};

const calls: Array<Call> = [
  { duration: 85 },
  { duration: 70 },
  { duration: 55 },
  { duration: 40 },
  { duration: 25 },
  { duration: 15 },
  { duration: 10 },
  { duration: 5 },
];

export const Beginners: React.FunctionComponent<
  React.PropsWithChildren<unknown>
> = () => {
  const [initialTime, setInitialTime] = useState(new Date());
  useEffect(() => {
    const storedTime = window.localStorage.getItem(LOCALSTORAGE_KEY);
    if (storedTime) {
      setInitialTime(new Date(storedTime));
    }
  }, []);

  const [curtainsUp, setCurtainsUp] = useState<Date | undefined>(initialTime);
  const [nowPerSecond, setNow] = useState(moment());

  useEffect(() => {
    const tick = setInterval(() => {
      setNow(moment());
    }, 1000);
    return () => {
      clearInterval(tick);
    };
  }, []);

  const handleUpdate = (newTime: Date) => {
    setCurtainsUp(newTime);
    window.localStorage.setItem(LOCALSTORAGE_KEY, newTime.toISOString());
  };
  const beginners = moment(curtainsUp).subtract(BEGINNERS_DURATION, 'm');

  const diffTillCurtainsUp = moment(curtainsUp).diff(nowPerSecond);

  const diffTillBeginners = moment(beginners).diff(nowPerSecond);

  const firstCall = moment(beginners).subtract(calls[0].duration, 'm');
  const minutesDifference = moment(curtainsUp).diff(firstCall, 'minutes');
  const difference = moment().diff(firstCall, 'minutes');

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
        time={moment(curtainsUp)}
        diff={diffTillCurtainsUp}
        className="mb-4"
      />
      <div className="form-control w-full max-w-xs">
        <input
          id="curtains-up"
          className="input input-bordered w-full max-w-xs"
          type="time"
          onChange={(event) =>
            handleUpdate(moment(event.target.value, 'HH:mm').toDate())
          }
          value={curtainsUp ? moment(curtainsUp).format('HH:mm') : undefined}
        />
      </div>
    </div>
  );
};

export const TimeTill: React.FC<{
  label: string;
  diff: number;
  time: moment.Moment;
  className?: string;
}> = ({ diff, time, label, className }) => {
  const timeLeft = diff > 0;
  const minutes = diff / 1000 / 60;
  const lessThanFiveMinutes = minutes < 5;
  return (
    <div className={cc({ ['opacity-30']: !timeLeft }, className)}>
      <div className="flex justify-between">
        <div className="font-bold">{label}</div>
        <div className="text-slate-500">{moment(time).format('h:mma')}</div>
      </div>
      <span className={styles.clock}>
        {timeLeft && !lessThanFiveMinutes && (
          <span>{Math.floor(minutes)} minutes left</span>
        )}
        {timeLeft && lessThanFiveMinutes && (
          <span className="countdown">
            <span
              style={
                {
                  '--value': moment.utc(diff).format('mm'),
                } as React.CSSProperties
              }
            ></span>
            :
            <span
              style={
                {
                  '--value': moment.utc(diff).format('ss'),
                } as React.CSSProperties
              }
            ></span>
          </span>
        )}
        {!timeLeft && <span>Times up!</span>}
      </span>
    </div>
  );
};
