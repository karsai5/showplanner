import axios from "axios";
import { GraphQLClient } from "graphql-request";
import {
  GetServerSidePropsContext,
  NextApiRequest,
} from "next";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const GRAPHQL_URL = `${API_URL}/graphql`;

if (!API_URL) {
  console.warn("No API URL defined");
}

export const useAuthenticatedClient = () => {
  return new GraphQLClient(GRAPHQL_URL);
};

export const getServerSideAuthenticatedClient = (req: NextApiRequest) => {
  return new GraphQLClient(GRAPHQL_URL, {
    headers: {
      Authorization: `${req.headers.authorization}`,
    },
  });
};

export const getUnauthenticatedAxiosClient = () => {
  return axios.create({
    baseURL: API_URL + "/api",
  });
};

export const useAuthenticatedAxiosClient = (baseUrl?: string) => {
  return axios.create({
    baseURL: baseUrl || API_URL + "/api",
    headers: {
      Authorization: `Bearer `,
    },
  });
};

export const checkLoggedIn = async (context: GetServerSidePropsContext) => {
  const session = undefined;
  let redirect = undefined;
  return { session, redirect };
};

const homeRedirect = {
  redirect: {
    permanent: false,
    destination: "/",
  },
};

export const checkPermission = async (
  context: GetServerSidePropsContext,
  permissionsArray: Array<string>
) => {
  const { session, redirect } = await checkLoggedIn(context);
  if (redirect) {
    return { session, redirect };
  }
  const sessionPermissions = "";
  const matchingPermissions = permissionsArray.filter((p) =>
    sessionPermissions.includes(p)
  );
  if (matchingPermissions.length === 0) {
    return { session, redirect: homeRedirect };
  }
  return { session };
};
