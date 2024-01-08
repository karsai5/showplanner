export const SUPERTOKENS_URL = process.env.NEXT_PUBLIC_SUPERTOKENS_URL;
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: "Showplanner",
  apiDomain: SUPERTOKENS_URL,
  websiteDomain: FRONTEND_URL,
  apiBasePath: "/auth",
  websiteBasePath: "/auth",
};
