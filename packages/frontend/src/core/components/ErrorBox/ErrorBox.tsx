import React, { FC } from "react";

import { CrossIcon } from "../Icons";

interface ErrorBoxProps {
  children: React.ReactNode;
}

const ErrorBox: FC<ErrorBoxProps> = ({ children }) => (
  <div className="alert alert-error mb-4">
    <div>
      <CrossIcon />
      <span>{children}</span>
    </div>
  </div>
);

export default ErrorBox;
