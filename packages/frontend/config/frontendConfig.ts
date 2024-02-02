import { getRequiredEnvVariable } from "core/utils/envVariables";
import Router from "next/router";
import Session from "supertokens-auth-react/recipe/session";
import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword";

export const frontendConfig = () => {
  return {
    appInfo: {
      appName: "Showplanner",
      apiDomain: getRequiredEnvVariable(process.env.NEXT_PUBLIC_SUPERTOKENS_URL),
      websiteDomain: getRequiredEnvVariable(process.env.NEXT_PUBLIC_FRONTEND_URL),
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
      Session.init({
        sessionTokenBackendDomain: getRequiredEnvVariable(process.env.NEXT_PUBLIC_COOKIE_DOMAIN),
      }),
    ],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
