import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { RosterWarningDTO } from "core/api/generated";

export const RosterWarning: React.FC<{ warnings?: RosterWarningDTO[] }> = ({
  warnings,
}) => {
  if (!warnings || warnings.length === 0) {
    return null;
  }
  return (
    <>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="">
          <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
        </div>
        <div
          tabIndex={0}
          className="dropdown-content bg-base-100 rounded-box z-50 w-80 p-4 shadow"
        >
          <ul className="list-disc ml-4">
            {warnings.map((warning) => (
              <li key={warning.id}>{warning.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
