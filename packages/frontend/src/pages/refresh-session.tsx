import React from "react";
import SuperTokens from "supertokens-auth-react";
import Session from "supertokens-auth-react/recipe/session";

export default function AttemptRefresh() {
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
        window.location.href = urlParams.get("redirect")!;
      } else {
        // we redirect to the login page since the user
        // is now logged out
        SuperTokens.redirectToAuth();
      }
    });
    return () => {
      cancel = true;
    };
  }, []);
  return null;
}
