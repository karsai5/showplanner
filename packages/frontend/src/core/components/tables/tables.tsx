import cc from "classnames";
import { KeyboardEventHandler } from "react";

export const Td: React.FC<{
  children: React.ReactNode;
  rowSpan?: number;
  colSpan?: number;
  className?: string;
  onClick?: () => void;
  tabIndex?: number | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLTableDataCellElement> | undefined;
}> = ({
  children,
  rowSpan,
  colSpan,
  className,
  onClick,
  tabIndex,
  onKeyDown,
}) => {
  return (
    <td
      className={cc("border-l border-slate-200 last:border-r", className)}
      rowSpan={rowSpan}
      colSpan={colSpan}
      onClick={onClick}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    >
      {children}
    </td>
  );
};

export const GapRow = ({
  length,
  className,
  children,
}: {
  length: number;
  className?: string;
  children?: React.ReactNode;
}) => (
  <tr>
    <td colSpan={length} className={className}>
      {children}
    </td>
  </tr>
);
