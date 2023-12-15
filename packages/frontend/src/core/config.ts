import axios from "axios";
import { GraphQLClient } from "graphql-request";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getToken } from "next-auth/jwt";
import { getSession, useSession } from "next-auth/react";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const GRAPHQL_URL = `${API_URL}/graphql`;

if (!API_URL) {
  console.warn("No API URL defined");
}

export const useAuthenticatedClient = () => {
  // const { data: session } = useSession();
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
  const { data: session } = useSession();
  return axios.create({
    baseURL: baseUrl || API_URL + "/api",
    headers: {
      Authorization: `Bearer ${session?.jwt}`,
    },
  });
};

export const checkLoggedIn = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);
  let redirect = undefined;
  if (!session?.jwt) {
    redirect = {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  } else if (session && !session.person) {
    redirect = {
      redirect: {
        permanent: false,
        destination: "/auth/newperson",
      },
    };
  }
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
  const sessionPermissions = session?.permissions || "";
  const matchingPermissions = permissionsArray.filter((p) =>
    sessionPermissions.includes(p)
  );
  if (matchingPermissions.length === 0) {
    return { session, redirect: homeRedirect };
  }
  return { session };
};
