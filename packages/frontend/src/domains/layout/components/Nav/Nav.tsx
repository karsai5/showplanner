import {
  CalendarDaysIcon,
  DocumentCheckIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import cc from "classnames";
import { BarsThreeLeft, BarsThreeRight } from "core/components/Icons";
import { useBreakpoint } from "core/hooks/useBreakpoint";
import { HasPermission, PERMISSION } from "core/permissions";
import { useShowSlugFromUrl } from "domains/shows/lib/helpers";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Session from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

import styles from "./Nav.module.scss";

export const Nav: React.FC<{ showShowMenu?: boolean }> = ({ showShowMenu }) => {
  const isSmall = useBreakpoint("sm");

  if (isSmall) {
    return <MobileNav showShowMenu={showShowMenu} />;
  }
  return (
    <div className="navbar bg-base-100 drop-shadow-md rounded-md z-50 sticky left-0">
      <div className="flex-1">
        <Title />
      </div>
      <div className="flex-none">
        <NavList className="menu menu-horizontal p-0" />
      </div>
    </div>
  );
};

const MobileNav: React.FC<{ showShowMenu?: boolean }> = ({ showShowMenu }) => {
  return (
    <div className="navbar bg-base-100 drop-shadow-md rounded-md z-50 sticky left-0">
      <div className="navbar-start">
        {showShowMenu && (
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <BarsThreeLeft />
            </label>
            <ShowNavList className="menu menu-compact dropdown-content left-0 mt-3 p-2 shadow bg-base-100 rounded-box w-52" />
          </div>
        )}
      </div>
      <div className="navbar-center">
        <Title />
      </div>
      <div className="navbar-end">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <BarsThreeRight />
          </label>
          <NavList className="menu menu-compact dropdown-content right-0 mt-3 p-2 shadow bg-base-100 rounded-box w-52" />
        </div>
      </div>
    </div>
  );
};

const Title = () => (
  <Link href="/" className="btn btn-ghost normal-case text-xl">
    ShowPlanner
  </Link>
);

const NavList: React.FC<{ className?: string }> = ({ className }) => (
  <ul className={className} tabIndex={0}>
    <li>
      <Link href="/tools/showtimer">ShowTimer</Link>
    </li>
    <AuthItems />
  </ul>
);

export const ShowNavList: React.FC<{ className?: string }> = ({
  className,
}) => {
  const slug = useShowSlugFromUrl();
  const show = useShowSummary();

  return (
    <ul className={className} tabIndex={0}>
      <Item
        url={`/shows/${slug}`}
        name={"Schedule"}
        icon={<HomeIcon className="h-6 w-6" />}
      />
      <HasPermission showId={show.id} permission={PERMISSION.rostering}>
        <Item
          url={`/shows/${slug}/availabilities`}
          name={"Availabilities"}
          icon={<DocumentCheckIcon className="h-6 w-6" />}
        />
      </HasPermission>
      <HasPermission showId={show.id} permission={PERMISSION.personnel}>
        <Item
          url={`/shows/${slug}/people`}
          name={"People"}
          icon={<UsersIcon className="h-6 w-6" />}
        />
      </HasPermission>
      <HasPermission showId={show.id} permission={PERMISSION.rostering}>
        <Item
          url={`/shows/${slug}/roster`}
          name={"Roster"}
          icon={<CalendarDaysIcon className="h-6 w-6" />}
        />
      </HasPermission>
    </ul>
  );
};

const Item: React.FC<{
  url: string;
  name: string;
  icon: React.ReactNode;
}> = ({ url, name, icon }) => {
  const path = usePathname();
  const active = path === url;
  return (
    <li>
      <Link href={url} className={cc({ active: active })}>
        {icon}
        <span className={styles.label}>{name}</span>
      </Link>
    </li>
  );
};

const AuthItems: React.FC = () => {
  async function onLogout() {
    await signOut();
    window.location.href = "/";
  }
  const session = Session.useSessionContext();
  if (session.loading) {
    return null;
  }

  if (session.doesSessionExist) {
    return (
      <>
        <li>
          <Link href="/shows">Shows</Link>
        </li>
        <li>
          <a onClick={onLogout}>Log out</a>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <Link href="/auth">Log in</Link>
      </li>
    </>
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
