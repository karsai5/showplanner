import Router from "next/router";
import Session from "supertokens-auth-react/recipe/session";
import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword";
export const SUPERTOKENS_URL = process.env.NEXT_PUBLIC_SUPERTOKENS_URL;
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const frontendConfig = () => {
  return {
    appInfo: {
      appName: "Showplanner",
      apiDomain: SUPERTOKENS_URL || "http://localhost:8080",
      websiteDomain: FRONTEND_URL || "http://localhost:3000",
      apiBasePath: "/auth",
      websiteBasePath: "/auth",
    },
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
      Session.init(),
    ],
    windowHandler: (oI: any) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href: string) => {
            Router.push(href)
          },
        },
      }
    },
  };
};
