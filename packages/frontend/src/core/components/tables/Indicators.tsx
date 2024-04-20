import cc from "classnames";
import { Fragment, ReactNode } from "react";

export type Indicator = {
  content: ReactNode;
  className?: string;
};

export const Indicators: React.FC<{
  items: Indicator[];
  className?: string;
}> = ({ items, className }) => {
  return (
    <div className={cc(className, "flex")}>
      {items.map(({ content, className: childClassName }, i) => (
        <Fragment key={i}>
          <div className="indicator-spacer w-5 h-full"></div>
          <div
            style={{ left: `${i * 1.25}rem` }}
            className={cc(childClassName, "indicator-box w-5")}
          >
            {content}
          </div>
        </Fragment>
      ))}
    </div>
  );
};
