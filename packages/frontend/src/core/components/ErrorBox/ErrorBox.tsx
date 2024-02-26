import { CrossIcon } from 'core/components/Icons';
import React, { FC } from 'react';

interface ErrorBoxProps {
  children: React.ReactNode;
}

const ErrorBox: FC<ErrorBoxProps> = ({ children }) => (
  <div className="alert alert-error mb-4">
    <div className="flex gap-3">
      <CrossIcon />
      <span>{children}</span>
    </div>
  </div>
);

export default ErrorBox;
