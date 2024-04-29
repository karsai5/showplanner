import cc from "classnames";
import { ShowNavList } from "domains/layout/components/Nav";
import { FC, ReactNode } from "react";

import styles from "./Sidebar.module.scss";

interface SidebarProps {
  isOpen: boolean;
  children: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, children }) => {
  return (
    <div className="flex flex-grow">
      {isOpen && (
        <div>
          <div
            className={cc(
              styles.sidebar,
              "h-full border-r border-slate-200 py-4 overflow-hidden"
            )}
          >
            <ShowNavList className="menu" />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Sidebar;
