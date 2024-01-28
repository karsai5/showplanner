import cc from "classnames";
import {
  CalendarIcon, DocumentCheckIcon,
} from "core/components/Icons";
import { HasPermission, PERMISSION } from "core/permissions";
import { useShowSlugFromUrl } from "domains/shows/lib/helpers";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const show = useShowSummary();
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
              <HasPermission showId={show.id} permission={PERMISSION.rostering}>
                <Item
                  url={`/shows/${slug}/availabilities`}
                  collapsed={collapsed}
                  name={"Availabilities"}
                  icon={<DocumentCheckIcon />}
                />
              </HasPermission>
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
  const path = usePathname();
  const active = path === url;
  return (
    <li>
      <Link href={url} className={cc({ active: active })}>
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
