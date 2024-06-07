import cc from "classnames";
import { useConfirmationModal } from "core/components/Modal/ConfirmationModal";
import { emptyTimers } from "domains/showtimer/ShowTimer/ShowTimer";
import { Timers } from "domains/showtimer/ShowTimer/types";

export const ResetButton: React.FC<{
  setTimers: (updatedTimers: Partial<Timers>) => void;
  className?: string;
}> = ({ setTimers, className }) => {
  const confirmationModal = useConfirmationModal();
  const handleReset = () => {
    confirmationModal(
      "Reset timers",
      "Are you sure you want to reset all timers? This is irreversible.",
      () => setTimers(emptyTimers)
    );
  };
  return (
    <button className={cc("btn", className)} onClick={handleReset}>
      Reset all timers
    </button>
  );
};
