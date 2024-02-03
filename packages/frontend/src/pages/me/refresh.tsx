import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { useRouter } from "next/router";
import React from "react";
import SuperTokens from "supertokens-auth-react";
import Session from "supertokens-auth-react/recipe/session";

export const AttemptRefresh = () => {
  const router = useRouter();
  React.useEffect(() => {
    let cancel = false;
    Session.attemptRefreshingSession().then((success) => {
      if (cancel) {
        // component has unmounted somehow..
        return;
      }
      if (success) {
        // we have new session tokens, so we redirect the user back
        // to where they were.
        const urlParams = new URLSearchParams(window.location.search);
        router.push(urlParams.get("redirectBack") || "/");
      } else {
        // we redirect to the login page since the user
        // is now logged out
        SuperTokens.redirectToAuth();
      }
    });
    return () => {
      cancel = true;
    };
  }, [router]);
  return <LoadingBox />;
};

export const useRefreshToken = () => {
  const router = useRouter();
  const path = encodeURIComponent(router.route);
  return () => {
    router.push(`/me/refresh?redirectBack=${path}`);
  };
};

export default AttemptRefresh;
