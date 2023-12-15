import { LayoutWithBackgroundImage } from "domains/layout/LayoutWithBackgroundImage";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { redirectToAuth } from "supertokens-auth-react";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react/ui";

const SuperTokensComponentNoSSR = dynamic<{}>(
  new Promise((res) =>
    res(() => getRoutingComponent([ThirdPartyEmailPasswordPreBuiltUI]))
  ),
  { ssr: false }
);

const Auth = () => {
  // if the user visits a page that is not handled by us (like /auth/random), then we redirect them back to the auth page.
  useEffect(() => {
    if (canHandleRoute([ThirdPartyEmailPasswordPreBuiltUI]) === false) {
      redirectToAuth();
    }
  }, []);

  return (
    <div className="z-10 relative">
      <SuperTokensComponentNoSSR />
    </div>
  );
};

Auth.getLayout = (page: any) => (
  <LayoutWithBackgroundImage>{page}</LayoutWithBackgroundImage>
);

export default Auth;
