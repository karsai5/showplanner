import { Dialog } from "@headlessui/react";
import { PencilIcon } from "core/components/Icons";
import { ResetButton } from "domains/showtimer/buttons/ResetButton";
import moment from "moment";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

import { TimerLabels, Timers } from "./types";

type Props = {
  timers: Timers;
  setTimers: (updatedTimers: Partial<Timers>) => void;
};

const ButtonRow: React.FC<Props & { timerKey: keyof Timers }> = ({
  setTimers,
  timers,
  timerKey,
}) => {
  const thisTimer = timers[timerKey];
  const handleStart = () => setTimers({ [timerKey]: moment() });
  const handleReset = () => setTimers({ [timerKey]: null });
  const handleUpdate = (newDate: any) =>
    setTimers({ [timerKey]: moment(newDate) });
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{TimerLabels[timerKey]}</span>
      </label>
      <div className="flex gap-2 mb-2">
        <input
          id={timerKey}
          className="input input-bordered w-full max-w-xs"
          type="time"
          onChange={(event) =>
            handleUpdate(moment(event.target.value, "HH:mm").toDate())
          }
          value={thisTimer?.format("HH:mm") || ""}
        />
        <button className="btn" onClick={handleStart}>
          Now
        </button>
        <button className="btn" onClick={handleReset}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export const EditTimes: React.FC<Props> = ({ timers, setTimers }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className="btn btn-outline btn-block btn-sm"
        onClick={() => setIsOpen(true)}
      >
        <PencilIcon />
        Edit times
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="modal modal-open"
      >
        <Dialog.Panel className="modal-box">
          <Dialog.Title className="text-2xl font-bold">Edit times</Dialog.Title>

          <ButtonRow
            timers={timers}
            setTimers={setTimers}
            timerKey="actOneStart"
          />
          <ButtonRow
            timers={timers}
            setTimers={setTimers}
            timerKey="intervalStart"
          />
          <ButtonRow
            timers={timers}
            setTimers={setTimers}
            timerKey="intervalEnd"
          />
          <ButtonRow
            timers={timers}
            setTimers={setTimers}
            timerKey="actTwoEnd"
          />
          <div className="divider" />
          <ButtonRow
            timers={timers}
            setTimers={setTimers}
            timerKey="houseOpen"
          />
          <ButtonRow
            timers={timers}
            setTimers={setTimers}
            timerKey="fohClearance"
          />
          <ButtonRow
            timers={timers}
            setTimers={setTimers}
            timerKey="intervalFohClearance"
          />
          <ButtonRow
            timers={timers}
            setTimers={setTimers}
            timerKey="bowsStart"
          />
          <ButtonRow
            timers={timers}
            setTimers={setTimers}
            timerKey="orchestraEnd"
          />
          <div className="flex justify-end gap-2 mt-4">
            <ResetButton setTimers={setTimers} />
            <button className="btn" onClick={() => setIsOpen(false)}>
              Done
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
