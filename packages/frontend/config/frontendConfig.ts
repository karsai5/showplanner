import Router from "next/router";
import Session from "supertokens-auth-react/recipe/session";
import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword";

import { appInfo } from "./appInfo";

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        signInAndUpFeature: {
          providers: [
            ThirdPartyEmailPasswordReact.Google.init(),
            // ThirdPartyEmailPasswordReact.Facebook.init(),
            // ThirdPartyEmailPasswordReact.Github.init(),
            // ThirdPartyEmailPasswordReact.Apple.init(),
          ],
        },
      }),
      Session.init({
        tokenTransferMethod: 'header'
      }),
    ],
    windowHandler: (oI: any) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href: string) => {
            Router.push(href);
          },
        },
      };
    },
  };
};
