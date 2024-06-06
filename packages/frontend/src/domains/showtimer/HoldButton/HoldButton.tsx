import cc from "classnames";
import { ConfettiContext } from "domains/showtimer/ShowTimer/ShowTimer";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
  useContext,
  useRef,
} from "react";

export const HoldButton: React.FC<
  React.PropsWithChildren<{
    label: ReactNode;
    callback: () => void;
    helperText?: string;
    confetti?: boolean;
    buttonProps?: DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >;
    className?: string;
  }>
> = ({ label, callback, buttonProps = {}, confetti = false, className }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const makeConfetti = useContext(ConfettiContext);

  const handleClick = () => {
    if (confetti) {
      let x = 0.5;
      let y = 0.5;
      const rect = ref?.current?.getBoundingClientRect();
      if (rect) {
        const { innerWidth: width, innerHeight: height } = window;
        const centerX = rect.left + (rect.right - rect.left) / 2;
        const centerY = rect.top + (rect.bottom - rect.top) / 2;
        x = centerX / width;
        y = centerY / height;
      }
      makeConfetti({
        origin: {
          x,
          y,
        },
      });
    }
    callback();
  };

  return (
    <button
      onClick={handleClick}
      className={cc("btn btn-primary btn-block", className, {})}
      ref={ref}
      {...buttonProps}
    >
      {label}
    </button>
  );
};
