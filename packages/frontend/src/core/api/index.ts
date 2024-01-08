import { Configuration, DefaultApi } from "./generated"

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const config = new Configuration({
  basePath: API_URL,
});

export const getApi = (): DefaultApi => {
  return new DefaultApi(config);
}
