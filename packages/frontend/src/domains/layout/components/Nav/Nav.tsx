import { BarsThreeLeft, BarsThreeRight } from 'core/components/Icons';
import { useBreakpoint } from 'core/hooks/useBreakpoint';
import Link from 'next/link';
import Session from 'supertokens-auth-react/recipe/session';
import { signOut } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';

export const Nav: React.FC<{ mobile?: MobileNavProps }> = ({ mobile }) => {
  const isSmall = useBreakpoint('sm');

  if (isSmall) {
    return <MobileNav {...mobile} />;
  }
  return (
    <div className="navbar bg-base-100 drop-shadow-md rounded-md z-50">
      <div className="flex-1">
        <Title />
      </div>
      <div className="flex-none">
        <NavList className="menu menu-horizontal p-0" />
      </div>
    </div>
  );
};

type MobileNavProps = {
  toggleSidebar?: () => void;
};

const MobileNav: React.FC<MobileNavProps> = ({ toggleSidebar }) => {
  return (
    <div className="navbar bg-base-100 drop-shadow-md rounded-md z-50">
      <div className="navbar-start">
        {toggleSidebar && (
          <button
            tabIndex={0}
            className="btn btn-ghost btn-circle"
            onClick={toggleSidebar}
          >
            <BarsThreeLeft />
          </button>
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
  <ul className={className}>
    <li>
      <Link href="/tools/showtimer">ShowTimer</Link>
    </li>
    <AuthItems />
  </ul>
);

const AuthItems: React.FC = () => {
  async function onLogout() {
    await signOut();
    window.location.href = '/';
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
