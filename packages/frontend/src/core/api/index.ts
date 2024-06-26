import { API_URL } from "core/config";
import { GetServerSidePropsContext } from "next";

import {
  Configuration,
  DefaultApi,
  PersonnelApi,
  ShowdocsApi,
} from "./generated";

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
  showdocs: new ShowdocsApi(config),
};

export const serverSideApi_deprecated = (ctx: GetServerSidePropsContext) => {
  const cookie = ctx.req.headers.cookie;
  const ssrConfig = new Configuration({
    basePath: API_URL,
    headers: {
      Cookie: cookie || "",
    },
  });
  return new DefaultApi(ssrConfig);
};

export const serverSideApi = (ctx: GetServerSidePropsContext) => {
  const cookie = ctx.req.headers.cookie;
  const ssrConfig = new Configuration({
    basePath: API_URL,
    headers: {
      Cookie: cookie || "",
    },
  });
  return {
    default: new DefaultApi(ssrConfig),
    personnel: new PersonnelApi(ssrConfig),
    showdocs: new ShowdocsApi(ssrConfig),
  };
};
