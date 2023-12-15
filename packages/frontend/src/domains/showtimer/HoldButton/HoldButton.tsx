import cc from "classnames";
import { ReactNode, useContext, useRef, useState } from "react";
import { useLongPress } from "use-long-press";

import { ConfettiContext } from "../ShowTimer/ShowTimer";
import styles from "./HoldButton.module.scss";

export const HoldButton: React.FC<
  React.PropsWithChildren<{
    label: ReactNode;
    callback: any;
    helperText?: string;
    confetti?: boolean;
    shake?: boolean;
    onClick?: any;
    buttonProps?: any;
    className?: string;
  }>
> = ({
  label,
  callback,
  onClick,
  buttonProps = {},
  helperText,
  shake = true,
  confetti = false,
  className,
}) => {
  const [holding, setHolding] = useState(false);
  const [showHelperText, setHelperTextVisibility] = useState(false);
  const ref = useRef(null);
  const makeConfetti = useContext(ConfettiContext);

  const bind = useLongPress(
    () => {
      if (confetti) {
        let x = 0.5;
        let y = 0.5;
        const rect = (ref as any)?.current?.getBoundingClientRect();
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
      setHolding(false);
      callback();
    },
    {
      onCancel: () => {
        if (onClick) {
          onClick();
        }
        setHelperTextVisibility(true);
        setTimeout(() => {
          setHelperTextVisibility(false);
        }, 2000);
        setHolding(false);
      },
      onStart: () => setHolding(true),
      threshold: 1500,
    }
  );

  return (
    <div
      className={cc({ ["tooltip-open"]: showHelperText }, "tooltip w-full")}
      data-tip={helperText}
    >
      <button
        {...bind()}
        className={cc("btn btn-primary btn-block", className, {
          ["shake shake-constant"]: shake && holding,
          [styles.holding]: holding,
        })}
        ref={ref}
        {...buttonProps}
      >
        {holding ? "Hold" : label}
      </button>
    </div>
  );
};
