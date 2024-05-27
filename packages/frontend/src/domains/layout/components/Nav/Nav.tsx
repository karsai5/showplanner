import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/outline";
import cc from "classnames";
import { useBreakpoint } from "core/hooks/useBreakpoint";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Nav.module.scss";
import { NavItem, useMainNavItems, useNavItemsForShow } from "./items";

export const Nav: React.FC<{ showShowMenu?: boolean }> = ({ showShowMenu }) => {
  const isSmall = useBreakpoint("sm");
  const mainNavItems = useMainNavItems();
  const path = usePathname();

  if (isSmall) {
    return <MobileNav showShowMenu={showShowMenu} />;
  }
  return (
    <div className="navbar bg-base-100 drop-shadow-md rounded-md z-50 sticky left-0">
      <div className="flex-1">
        <Title />
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          {mainNavItems.map((item, i) => {
            const active = path === item.href;
            if (item.href) {
              return (
                <li key={i}>
                  <Link
                    href={item.href}
                    onClick={item.onClick}
                    className={cc("gap-1", { active })}
                  >
                    {item.icon && item.icon}
                    {item.title}
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={i}>
                  <a onClick={item.onClick}>
                    {item.icon && item.icon}
                    {item.title}
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

const DropdownItem: React.FC<{ item: NavItem }> = ({ item }) => {
  const path = usePathname();
  const active = path === item.href;

  return (
    <MenuItem as="li">
      {({ close }) => {
        const handleOnClick = () => {
          if (item.onClick) {
            item.onClick();
          }
          close();
        };
        if (item.href) {
          return (
            <Link
              href={item.href}
              onClick={handleOnClick}
              className={cc({ active })}
            >
              {item.icon && item.icon}
              {item.title}
            </Link>
          );
        } else {
          return (
            <a onClick={handleOnClick}>
              {item.icon && item.icon}
              {item.title}
            </a>
          );
        }
      }}
    </MenuItem>
  );
};

const MobileNav: React.FC<{ showShowMenu?: boolean }> = ({ showShowMenu }) => {
  const mainNavItems = useMainNavItems();
  return (
    <div className="navbar bg-base-100 drop-shadow-md rounded-md z-50 sticky left-0">
      <div className="navbar-start">{showShowMenu && <MobileShowMenu />}</div>
      <div className="navbar-center">
        <Title />
      </div>
      <div className="navbar-end">
        <Menu as="div" className="dropdown">
          <MenuButton className="btn btn-ghost btn-circle">
            <Bars3BottomRightIcon className="w-6 h-6" />
          </MenuButton>
          <MenuItems
            as="ul"
            anchor="bottom"
            className="menu menu-compact dropdown-content right-0 mt-4 p-2 shadow bg-base-100 rounded-box w-52 z-50"
          >
            {mainNavItems.map((item, i) => (
              <DropdownItem key={i} item={item} />
            ))}
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

const MobileShowMenu = () => {
  const navItemsForShow = useNavItemsForShow();
  return (
    <>
      <Menu as="div" className="dropdown">
        <MenuButton className="btn btn-ghost btn-circle">
          <Bars3BottomLeftIcon className="w-6 h-6" />
        </MenuButton>
        <MenuItems
          as="ul"
          anchor="bottom"
          className="menu menu-compact dropdown-content right-0 mt-4 p-2 shadow bg-base-100 rounded-box w-52 z-50"
        >
          {navItemsForShow.map((item, i) => (
            <DropdownItem key={i} item={item} />
          ))}
        </MenuItems>
      </Menu>
    </>
  );
};

const Title = () => (
  <Link href="/" className="btn btn-ghost normal-case text-xl">
    ShowPlanner
  </Link>
);

export const ShowNavList: React.FC<{ className?: string }> = ({
  className,
}) => {
  const navItems = useNavItemsForShow();
  const path = usePathname();

  return (
    <ul className={className} tabIndex={0}>
      {navItems.map((item, i) => {
        const active = path === item.href;
        return (
          <li key={i}>
            <Link href={item.href as string} className={cc({ active: active })}>
              {item.icon}
              <span className={styles.label}>{item.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
