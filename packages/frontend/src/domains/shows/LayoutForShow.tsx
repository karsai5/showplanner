import { useQuery } from "@tanstack/react-query";
import { getApi } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { Footer } from "domains/layout/components/Footer";
import { Nav } from "domains/layout/components/Nav";
import Sidebar from "domains/shows/Sidebar/Sidebar";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";

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
    () => api.showsShowSlugGet({showSlug: slug as string})
  );
  return (
    <div className="flex flex-col h-screen">
      <Nav mobile={{ toggleSidebar: () => setSidebarOpen(!sidebarOpen) }} />
      <Sidebar isOpen={sidebarOpen}>
        <div className="p-6 h-full overflow-auto flex-grow">
          {isLoading && <progress className="progress w-full"></progress>}
          {isError && <ErrorBox>Something went wrong getting show</ErrorBox>}
          {show && (
            <ShowSummaryContext.Provider value={show}>
              {children}
            </ShowSummaryContext.Provider>
          )}
        </div>
      </Sidebar>
      <Footer />
    </div>
  );
};
