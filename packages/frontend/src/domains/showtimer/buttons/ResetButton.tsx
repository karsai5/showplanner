import cc from "classnames";
import { useState } from "react";
import { useLongPress } from "use-long-press";

import { emptyTimers } from "../ShowTimer/ShowTimer";
import { Timers } from "../ShowTimer/types";

export const ResetButton: React.FC<{
  setTimers: (updatedTimers: Partial<Timers>) => void;
  className?: string;
}> = ({ setTimers, className }) => {
  const [holding, setHolding] = useState(false);
  const handleReset = () => setTimers(emptyTimers);

  const bind = useLongPress(
    () => {
      setHolding(false);
      handleReset();
    },
    {
      onCancel: () => setHolding(false),
      onStart: () => setHolding(true),
      threshold: 1500,
    }
  );
  return (
    <button className={cc("btn", className)} {...bind()}>
      {holding ? "Hold" : "Reset all timers"}
    </button>
  );
};
