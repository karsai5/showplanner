import { API_URL } from "core/config";

import { Configuration, DefaultApi } from "./generated";
import { GetServerSidePropsContext } from "next";

const config = new Configuration({
  basePath: API_URL,
});

export const getApi = (): DefaultApi => {
  return new DefaultApi(config);
};

export const api = new DefaultApi(config);

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
