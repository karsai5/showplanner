import { useBreakpoint } from "core/hooks/useBreakpoint";
import Sidebar from "domains/shows/Sidebar/Sidebar";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import styles from "./styles.module.scss";
import cc from "classnames";

export const DefaultLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  const useShowLayout = router.pathname.startsWith("/shows/[slug]");

  if (useShowLayout) {
    return <ShowLayout>{children}</ShowLayout>;
  }

  return <BaseLayout>{children}</BaseLayout>;
};

export const BaseLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="flex-grow m-6 relative">{children}</div>
      <Footer />
    </div>
  );
};

export const ShowLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isSmall = useBreakpoint("sm");

  return (
    <SessionAuth>
      <div className="flex flex-col h-screen overflow-auto">
        <Nav showShowMenu />
        <Sidebar isOpen={!isSmall}>
          <div className={cc("p-6", { ["w-full"]: isSmall }, styles.content)}>
            {children}
          </div>
        </Sidebar>
        <Footer />
      </div>
    </SessionAuth>
  );
};
