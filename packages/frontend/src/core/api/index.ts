import { DefaultApi } from "./generated"

export const getApi = (): DefaultApi => {
  return new DefaultApi();
}
