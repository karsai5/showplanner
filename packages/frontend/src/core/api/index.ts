import { API_URL } from "core/config";
import { GetServerSidePropsContext } from "next";

import { Configuration, DefaultApi, PersonnelApi } from "./generated";

const config = new Configuration({
  basePath: API_URL,
});

export const getApi = (): DefaultApi => {
  return new DefaultApi(config);
};

export const api_deprecated = new DefaultApi(config);
export const api = {
  personnel: new PersonnelApi(config),
  default: new DefaultApi(config),
};

export const serverSideApi = (ctx: GetServerSidePropsContext) => {
  const cookie = ctx.req.headers.cookie;
  const ssrConfig = new Configuration({
    basePath: API_URL,
    headers: {
      Cookie: cookie || "",
    },
  });
  return new DefaultApi(ssrConfig);
};
