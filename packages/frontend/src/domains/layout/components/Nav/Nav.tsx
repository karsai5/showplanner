import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
  CalendarDaysIcon,
  DocumentCheckIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import cc from "classnames";
import { UserIcon } from "core/components/Icons";
import { useBreakpoint } from "core/hooks/useBreakpoint";
import { PERMISSION, showPermission, useHasPermission } from "core/permissions";
import { useShowSlugFromUrl } from "domains/shows/lib/helpers";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Session from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

import styles from "./Nav.module.scss";

type NavItem = {
  title: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
};

const useMainNavItems = (): NavItem[] => {
  const mainNav: NavItem[] = [
    {
      title: "ShowTimer",
      href: "/tools/showtimer",
    },
  ];

  async function onLogout() {
    await signOut();
    window.location.href = "/";
  }
  const session = Session.useSessionContext();
  if (session.loading) {
    return mainNav;
  }

  if (session.doesSessionExist) {
    mainNav.push(
      {
        title: "Shows",
        href: "/shows",
      },
      {
        title: "Log out",
        onClick: () => onLogout(),
      }
    );
  } else {
    mainNav.push({
      title: "Log in",
      href: "/auth",
    });
  }
  return mainNav;
};

const useNavItemsForShow = (): NavItem[] => {
  const slug = useShowSlugFromUrl();
  const show = useShowSummary();

  const hasPermission = useHasPermission();

  const navItems: NavItem[] = [
    {
      title: "Schedule",
      href: `/shows/${slug}`,
      icon: <HomeIcon className="h-6 w-6" />,
    },
  ];

  if (hasPermission(showPermission(show.id, PERMISSION.rostering))) {
    navItems.push({
      title: "Availabilities",
      href: `/shows/${slug}/availabilities`,
      icon: <DocumentCheckIcon className="h-6 w-6" />,
    });
  }

  if (hasPermission(showPermission(show.id, PERMISSION.personnel))) {
    navItems.push({
      title: "People",
      href: `/shows/${slug}/people`,
      icon: <UserIcon className="h-6 w-6" />,
    });
  }

  if (hasPermission(showPermission(show.id, PERMISSION.rostering))) {
    navItems.push({
      title: "Roster",
      href: `/shows/${slug}/roster`,
      icon: <CalendarDaysIcon className="h-6 w-6" />,
    });
  }

  return navItems;
};

export const Nav: React.FC<{ showShowMenu?: boolean }> = ({ showShowMenu }) => {
  const isSmall = useBreakpoint("sm");
  const mainNavItems = useMainNavItems();

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
            if (item.href) {
              return (
                <li key={i}>
                  <Link href={item.href} onClick={item.onClick}>
                    {item.title}
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={i}>
                  <a onClick={item.onClick}>{item.title}</a>
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

// DROPDOWN example
// const DropdownExample = () => {
//   return (
//     <li tabIndex={0}>
//       <a>
//         <ArchiveBoxIcon />
//         Toolbox
//         <svg
//           className="fill-current"
//           xmlns="http://www.w3.org/2000/svg"
//           width="20"
//           height="20"
//           viewBox="0 0 24 24"
//         >
//           <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
//         </svg>
//       </a>
//       <ul className="p-2 bg-base-100">
//         <li>
//           <a>
//             <ClockIcon />
//             ShowTimer
//           </a>
//         </li>
//       </ul>
//     </li>
//   );
// };
