import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfirmationModalWrapper } from "core/components/Modal/ConfirmationModal";
import { googleMapsScriptUrl } from "core/maps/maps";
import { Layout } from "domains/layout/Layout";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import Script from "next/script";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";

import { frontendConfig } from "../../config/frontendConfig";

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout;
};

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const loading = usePageLoading();
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <SuperTokensWrapper>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <ConfirmationModalWrapper>
            {getLayout(
              <>
                <Script src={googleMapsScriptUrl}></Script>
                <Head>
                  <meta name="description" content="Your crew, in one place" />
                  <link rel="icon" href="/favicon.ico" />
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                  />
                  <title>ShowPlanner</title>
                </Head>
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

                {loading ? (
                  <progress className="progress w-full"></progress>
                ) : (
                  <Component {...(pageProps as any)} />
                )}
              </>
            )}
          </ConfirmationModalWrapper>
        </QueryClientProvider>
      </SessionProvider>
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
