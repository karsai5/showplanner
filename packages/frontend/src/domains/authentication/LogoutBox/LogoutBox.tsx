import React from "react";

export const LogoutBox: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="card card-compact w-full sm:w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Logging out</h2>
        <p>One moment while you are logged out of the system</p>
        <progress className="progress"></progress>
      </div>
    </div>
  );
};
