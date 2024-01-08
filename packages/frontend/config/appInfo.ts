export const SUPERTOKENS_URL = process.env.NEXT_PUBLIC_SUPERTOKENS_URL;
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: "Showplanner",
  apiDomain: SUPERTOKENS_URL || "http://localhost:8080",
  websiteDomain: FRONTEND_URL || "http://localhost:3000",
  apiBasePath: "/auth",
  websiteBasePath: "/auth",
};
