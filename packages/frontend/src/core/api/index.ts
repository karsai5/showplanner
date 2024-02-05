import { API_URL } from "core/config";

import { Configuration, DefaultApi } from "./generated";

const config = new Configuration({
  basePath: API_URL,
});

export const getApi = (): DefaultApi => {
  return new DefaultApi(config);
};

export const api = new DefaultApi(config);
