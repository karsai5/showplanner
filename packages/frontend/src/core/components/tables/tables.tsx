import cc from 'classnames';

export const Td: React.FC<{
  children: React.ReactNode;
  rowSpan?: number;
  className?: string;
}> = ({ children, rowSpan, className }) => {
  return (
    <td
      className={cc('border-l border-slate-200 last:border-r', className)}
      rowSpan={rowSpan}
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
