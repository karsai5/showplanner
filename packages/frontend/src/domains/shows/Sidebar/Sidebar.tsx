import cc from "classnames";
import { useNavItemsForShow } from "domains/layout/components/Nav/items";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

import styles from "./Sidebar.module.scss";

interface SidebarProps {
  isOpen: boolean;
  children: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, children }) => {
  const navItems = useNavItemsForShow();
  const path = usePathname();
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
            <ul className="menu" tabIndex={0}>
              {navItems.map((item, i) => {
                const active = path === item.href;
                return (
                  <li key={i}>
                    <Link
                      href={item.href as string}
                      className={cc({ active: active })}
                    >
                      {item.icon}
                      <span className={styles.label}>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Sidebar;
