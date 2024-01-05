import { useQuery } from "@tanstack/react-query";
import { getApi } from "core/api";
import { AccessDenied } from "core/components/AccessDenied/AccessDenied";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { PERMISSION, showPermission } from "core/permissions";
import { Footer } from "domains/layout/components/Footer";
import { Nav } from "domains/layout/components/Nav";
import Sidebar from "domains/shows/Sidebar/Sidebar";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { PermissionClaim } from "supertokens-auth-react/recipe/userroles"

import { ShowSummaryContext } from "./lib/summaryContext";

export const LayoutWithShowSidebar: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = getApi();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {
    query: { slug },
  } = useRouter();
  const { data: show, isLoading, isError } = useQuery(
    ["Show", slug],
    () => {
      if (!slug) {
        return null;
      }
      return api.showsShowSlugSummaryGet({ showSlug: slug as string });
    }
  );

  return (
    <div className="flex flex-col h-screen">
      <Nav mobile={{ toggleSidebar: () => setSidebarOpen(!sidebarOpen) }} />
      {isLoading && <LoadingBox className="flex-1"/>}
      {isError && <ErrorBox>Something went wrong getting show</ErrorBox>}
      {show && <SessionAuth
        accessDeniedScreen={AccessDenied}
        overrideGlobalClaimValidators={(globalValidators) => [...globalValidators,
        PermissionClaim.validators.includes(showPermission(show?.id, PERMISSION.viewEvents))]}>
        <Sidebar isOpen={sidebarOpen}>
          <div className="p-6 h-full overflow-auto flex-grow">
            {show && (
              <ShowSummaryContext.Provider value={show}>
                {children}
              </ShowSummaryContext.Provider>
            )}
          </div>
        </Sidebar>
      </SessionAuth>}
      <Footer />
    </div>
  );
};
