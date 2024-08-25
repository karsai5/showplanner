import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const RosterWarning: React.FC = () => {
  return (
    <>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="">
          <ExclamationTriangleIcon className="w-5 h-5" />
        </div>
        <div
          tabIndex={0}
          className="dropdown-content bg-base-100 rounded-box z-[1] w-80 p-4 shadow"
        >
          <ul className="list-disc ml-4">
            <li>
              <a>Emma is unavailable as Assistant stage manager</a>
            </li>
            <li>
              <a>Emma&apos;s availability is unknown</a>
            </li>
            <li>
              <a>
                James is doing multiple roles: Stage manager, Assistant stage
                manager
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
