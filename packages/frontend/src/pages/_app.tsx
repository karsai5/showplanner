import "styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { MeContextWrapper } from "core/components/MeContext/MeContext";
import { ConfirmationModalWrapper } from "core/components/Modal/ConfirmationModal";
import { DefaultLayout } from "domains/layout/DefaultLayout";
import type { NextPage } from "next";
import Head from "next/head";
import { Router } from "next/router";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import SuperTokensReact from "supertokens-auth-react";
import { SuperTokensWrapper } from "supertokens-auth-react";

import { frontendConfig } from "../../config/frontendConfig";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "always",
    },
    mutations: {
      networkMode: "always",
    },
  },
});

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = {
  Component: NextPageWithLayout;
};

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

function MyApp({ Component }: AppPropsWithLayout) {
  const loading = usePageLoading();
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <SuperTokensWrapper>
      <ToastContainer
        position="top-center"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Zoom}
      />
      <QueryClientProvider client={queryClient}>
        <ConfirmationModalWrapper>
          {getLayout(
            <MeContextWrapper>
              <Head>
                <meta name="description" content="Your crew, in one place" />
                <link rel="icon" href="/favicon.ico" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
                <title>ShowPlanner</title>
              </Head>

              {loading ? <LoadingBox /> : <Component />}
            </MeContextWrapper>
          )}
        </ConfirmationModalWrapper>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <SpeedInsights />
    </SuperTokensWrapper>
  );
}

const usePageLoading = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return loading;
};

export default MyApp;
