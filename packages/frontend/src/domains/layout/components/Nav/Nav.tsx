import { useBreakpoint } from "core/hooks/useBreakpoint";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavItem, useMainNavItems } from "./items";
import { MobileNav } from "./MobileNav";
import { ItemAnchor, ItemLink } from "./Shared";
import cc from "classnames";
import classNames from "classnames";

export const Nav: React.FC<{ showShowMenu?: boolean }> = ({ showShowMenu }) => {
  const isSmall = useBreakpoint("sm");
  const mainNavItems = useMainNavItems();

  if (isSmall) {
    return <MobileNav showShowMenu={showShowMenu} />;
  }
  return (
    <div className="navbar bg-base-100 drop-shadow-md rounded-md z-50 sticky left-0">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          ShowPlanner
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          {mainNavItems.map((item, i) => (
            <DisplayItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const DisplayItem = ({ item }: { item: NavItem }) => {
  const active = usePathname() === item.href;
  if (item.href) {
    return <DisplayLink item={item} active={active} />;
  } else if (item.children && item.children.length > 0) {
    return <DisplayDropdown item={item} />;
  } else {
    return <DisplayAnchor item={item} />;
  }
};

export const DisplayDropdown = ({
  item,
  className,
}: {
  item: NavItem;
  className?: string;
}) => {
  return (
    <li className="dropdown dropdown-hover dropdown-end">
      <a tabIndex={0} className={cc(className)}>
        {item.icon && item.icon}
        {item.title}
      </a>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {item.children?.map((child, i) => (
          <DisplayItem key={i} item={child} />
        ))}
      </ul>
    </li>
  );
};

const DisplayLink = ({ item, active }: { item: NavItem; active: boolean }) => {
  if (!item.href) {
    return null;
  }

  return (
    <li>
      <ItemLink item={item} active={active} />
    </li>
  );
};

const DisplayAnchor = ({ item }: { item: NavItem }) => {
  return (
    <li>
      <ItemAnchor item={item} />
    </li>
  );
};
