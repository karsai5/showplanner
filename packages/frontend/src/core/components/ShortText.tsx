import cc from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";

export const ShortText: React.FC<{
  children: ReactNode;
  className: string;
}> = ({ children, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const e = ref.current;
      if (e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth) {
        setOverflowing(true);
      }
    }
  }, [ref, setOverflowing]);

  return (
    <span
      className="tooltip text-left"
      data-tip={overflowing ? children : undefined}
    >
      {overflowing && "true"}
      <span
        className={cc(
          "whitespace-nowrap inline-block overflow-hidden overflow-ellipsis",
          className
        )}
        ref={ref}
      >
        {children}
      </span>
    </span>
  );
};
