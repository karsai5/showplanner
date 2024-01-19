import cc from "classnames";
import {
  CalendarIcon,
} from "core/components/Icons";
import { useShowSlugFromUrl } from "domains/shows/lib/helpers";
import Link from "next/link";
import React, { FC, ReactNode, useState } from "react";

import styles from "./Sidebar.module.scss";

interface SidebarProps {
  isOpen: boolean;
  children: ReactNode;
}

enum STATE {
  fullWidth,
  collapsed,
  mobile,
}

const Sidebar: FC<SidebarProps> = ({ isOpen, children }) => {
  const [state] = useState(STATE.collapsed);
  const collapsed = state === STATE.collapsed;
  const slug = useShowSlugFromUrl();
  return (
    <div className="flex flex-grow">
      {isOpen && (
        <div className={cc({ [styles.mobile]: state === STATE.collapsed })}>
          <div className="h-full w-60 border-r border-slate-200 py-4">
            <ul className="menu">
              <Item
                url={`/shows/${slug}`}
                collapsed={collapsed}
                name={"Schedule"}
                icon={<CalendarIcon />}
              />
            </ul>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

const Item: React.FC<{
  url: string;
  collapsed: boolean;
  name: string;
  icon: React.ReactNode;
}> = ({ url, collapsed, name, icon }) => {
  return (
    <li>
      <Link href={url}>
        <div
          className={cc({ tooltip: collapsed }, "tooltip-right z-50")}
          data-tip={name}
        >
          {icon}
          <span className={styles.label}>{name}</span>
        </div>
      </Link>
    </li>
  );
};

export default Sidebar;
