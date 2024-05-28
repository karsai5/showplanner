import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavItem, useMainNavItems, useNavItemsForShow } from "./items";
import { ItemAnchor, ItemLink } from "./Shared";

export const MobileNav: React.FC<{ showShowMenu?: boolean }> = ({
  showShowMenu,
}) => {
  const mainNavItems = useMainNavItems();
  return (
    <div className="navbar bg-base-100 drop-shadow-md rounded-md z-50 sticky left-0">
      <div className="navbar-start">{showShowMenu && <MobileShowMenu />}</div>
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          ShowPlanner
        </Link>
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
              <>
                {!item.children && <DropdownItem key={i} item={item} />}
                {item.children && item.children.length > 0 && (
                  <>
                    <span className="text-center mb-2 font-bold text-slate-600">
                      {item.title}
                    </span>
                    {item.children?.map((child, j) => (
                      <DropdownItem key={j} item={child} />
                    ))}
                    <MenuItem as="li"></MenuItem>
                  </>
                )}
              </>
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
            <>
              <DropdownItem key={i} item={item} />
              {item.children && item.children.length > 0 && (
                <>
                  {item.title}
                  {item.children?.map((child, j) => (
                    <DropdownItem key={j} item={child} />
                  ))}
                  <MenuItem as="li"></MenuItem>
                </>
              )}
            </>
          ))}
        </MenuItems>
      </Menu>
    </>
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
            <ItemLink
              item={{ ...item, onClick: () => handleOnClick() }}
              active={active}
            />
          );
        } else if (item.children && item.children.length > 0) {
          return <></>;
        } else {
          return (
            <ItemAnchor item={{ ...item, onClick: () => handleOnClick() }} />
          );
        }
      }}
    </MenuItem>
  );
};
