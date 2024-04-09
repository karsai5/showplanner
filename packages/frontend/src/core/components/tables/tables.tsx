import cc from "classnames";
import { KeyboardEventHandler } from "react";

export const Td: React.FC<{
  children: React.ReactNode;
  rowSpan?: number;
  className?: string;
  onClick?: () => void;
  tabIndex?: number | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLTableDataCellElement> | undefined;
}> = ({ children, rowSpan, className, onClick, tabIndex, onKeyDown }) => {
  return (
    <td
      className={cc("border-l border-slate-200 last:border-r", className)}
      rowSpan={rowSpan}
      onClick={onClick}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    >
      {children}
    </td>
  );
};

export const GapRow = ({ length }: { length: number }) => (
  <tr>
    <td colSpan={length}></td>
  </tr>
);
