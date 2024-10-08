import { API_URL } from "core/config";
import { GetServerSidePropsContext } from "next";

import {
  Configuration,
  DefaultApi,
  PersonnelApi,
  RosteringApi,
  ShowdocsApi,
  ShowsApi,
} from "./generated";

const config = new Configuration({
  basePath: API_URL,
});

export type ApiType = {
  default: DefaultApi;
  personnel: PersonnelApi;
  showdocs: ShowdocsApi;
  rostering: RosteringApi;
  shows: ShowsApi;
};

export const getApi = (): DefaultApi => {
  return new DefaultApi(config);
};

export const api_deprecated = new DefaultApi(config);
export const api: ApiType = {
  personnel: new PersonnelApi(config),
  default: new DefaultApi(config),
  showdocs: new ShowdocsApi(config),
  rostering: new RosteringApi(config),
  shows: new ShowsApi(config),
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
    rostering: new RosteringApi(ssrConfig),
    shows: new ShowsApi(ssrConfig),
  };
};
