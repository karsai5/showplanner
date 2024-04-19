import { useQuery } from "@tanstack/react-query";
import { getApi } from "core/api";
import { AccessDenied } from "core/components/AccessDenied/AccessDenied";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { useBreakpoint } from "core/hooks/useBreakpoint";
import { PERMISSION, showPermission } from "core/permissions";
import { Footer } from "domains/layout/components/Footer";
import { Nav } from "domains/layout/components/Nav";
import Sidebar from "domains/shows/Sidebar/Sidebar";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { PermissionClaim } from "supertokens-auth-react/recipe/userroles";

import { ShowSummaryContext } from "./lib/summaryContext";

export const LayoutWithShowSidebar: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = getApi();
  const [sidebarOpen, setSidebarOpen] = useState(
    getInitiaValueForSidebarOpen()
  );
  const isSmall = useBreakpoint("sm");

  useEffect(() => {
    if (isSmall) {
      setSidebarOpen(getInitiaValueForSidebarOpen());
    } else {
      setSidebarOpen(true);
    }
  }, [isSmall]);

  const handleSidebar = (value: boolean) => {
    setSidebarOpen(value);
    storeValueForSidebarOpen(value);
  };
  const {
    query: { slug },
  } = useRouter();
  const {
    data: show,
    isLoading,
    isError,
  } = useQuery(["Show", slug], () => {
    if (!slug) {
      return null;
    }
    return api.showsShowSlugSummaryGet({ showSlug: slug as string });
  });

  return (
    <SessionAuth>
      <div className="flex flex-col h-screen overflow-auto">
        <Nav mobile={{ toggleSidebar: () => handleSidebar(!sidebarOpen) }} />
        {isLoading && <LoadingBox className="flex-1" />}
        {isError && <ErrorBox>Something went wrong getting show</ErrorBox>}
        {show && !isError && (
          <SessionAuth
            accessDeniedScreen={AccessDenied}
            overrideGlobalClaimValidators={(globalValidators) => [
              ...globalValidators,
              PermissionClaim.validators.includes(
                showPermission(show?.id, PERMISSION.viewEvents)
              ),
            ]}
          >
            {show && (
              <ShowSummaryContext.Provider value={show}>
                <Sidebar isOpen={sidebarOpen}>
                  <div className="p-6 w-full">{children}</div>
                </Sidebar>
              </ShowSummaryContext.Provider>
            )}
          </SessionAuth>
        )}
        <Footer />
      </div>
    </SessionAuth>
  );
};

const SIDEBAR_OPEN = "sidebarOpen";

const getInitiaValueForSidebarOpen = (): boolean => {
  if (typeof window === "undefined") {
    return true;
  }

  const res = localStorage.getItem(SIDEBAR_OPEN);
  switch (res) {
    case "true":
      return true;
    default:
    case "false":
      return false;
  }
};

const storeValueForSidebarOpen = (value: boolean) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(SIDEBAR_OPEN, `${value}`);
};
