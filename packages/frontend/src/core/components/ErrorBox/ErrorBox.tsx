import {
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import cc from "classnames";
import React, { FC } from "react";

interface ErrorBoxProps {
  children: React.ReactNode;
  info?: boolean;
}

const ErrorBox: FC<ErrorBoxProps> = ({ children, info }) => {
  const error = !info;
  return (
    <div
      className={cc("alert alert-info mb-4", {
        ["alert-error"]: error,
        ["alert-info"]: info,
      })}
    >
      <div className="flex gap-3">
        {error && <XCircleIcon className="w-6 h-6" />}
        {info && <ExclamationCircleIcon className="w-6 h-6" />}
        <span>{children}</span>
      </div>
    </div>
  );
};

export default ErrorBox;
