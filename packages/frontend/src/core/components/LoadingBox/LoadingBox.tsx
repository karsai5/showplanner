import React, { FC } from "react";

export const LoadingBox: FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <progress className="progress w-full"></progress>
  </div>
);
