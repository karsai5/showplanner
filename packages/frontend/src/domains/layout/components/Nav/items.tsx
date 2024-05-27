import {
  CalendarDaysIcon,
  ClockIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "core/components/Icons";
import {
  PERMISSION,
  showPermission,
  useHasPermission,
  useHasRole,
  useIsLoggedIn,
} from "core/permissions";
import { useShowSlugFromUrl } from "domains/shows/lib/helpers";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

export type NavItem = {
  title: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
};

export const useMainNavItems = (): NavItem[] => {
  const isLoggedIn = useIsLoggedIn();
  const hasRole = useHasRole();

  async function onLogout() {
    await signOut();
    window.location.href = "/";
  }

  const mainNav: NavItem[] = [
    {
      title: "ShowTimer",
      href: "/tools/showtimer",
      icon: <ClockIcon className="h-6 w-6" />,
    },
  ];

  if (hasRole("admin")) {
    mainNav.push({
      title: "Users",
      href: "/admin/people",
      icon: <UsersIcon className="h-6 w-6" />,
    });
  }

  if (isLoggedIn) {
    mainNav.push(
      {
        title: "Show reports",
        href: "/tools/showreports",
        icon: <DocumentTextIcon className="h-6 w-6" />,
      },
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

export const useNavItemsForShow = (): NavItem[] => {
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

  navItems.push({
    title: "Roster",
    href: `/shows/${slug}/roster`,
    icon: <CalendarDaysIcon className="h-6 w-6" />,
  });

  return navItems;
};
