import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

export const OutboundLink: React.FC<{
  children: ReactNode;
  href: string;
  hideIcon?: boolean;
}> = ({ children, href, hideIcon }) => {
  return (
    <a className="link" target="_blank" rel="noreferrer" href={href}>
      {children}
      {!hideIcon && (
        <ArrowTopRightOnSquareIcon className="w-3 h-3 inline mb-1 ml-0.5" />
      )}
    </a>
  );
};
