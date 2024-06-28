import * as cookie from "cookie";
import { serverSideApi, ApiType } from "core/api";
import { ResponseError } from "core/api/generated";
import { getRequiredEnvVariable } from "core/utils/envVariables";
import JsonWebToken, {
  JwtHeader,
  JwtPayload,
  SigningKeyCallback,
} from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { GetServerSidePropsContext } from "next/types";

const client = jwksClient({
  jwksUri: `${getRequiredEnvVariable(
    process.env.NEXT_PUBLIC_SUPERTOKENS_URL
  )}/auth/jwt/jwks.json`,
});

function getKey(header: JwtHeader, callback: SigningKeyCallback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key?.getPublicKey();
    callback(err, signingKey);
  });
}

export const getDecodedJWT = async (ctx: GetServerSidePropsContext) => {
  const c = ctx.req.headers.cookie;
  if (!c) {
    return undefined;
  }
  const sAccessToken = cookie.parse(c).sAccessToken;
  if (!sAccessToken) {
    return undefined;
  }

  try {
    const jwt = await new Promise<JsonWebToken.JwtPayload>(
      (resolve, reject) => {
        JsonWebToken.verify(sAccessToken, getKey, {}, function (err, decoded) {
          if (err) {
            return reject(err);
          }
          if (decoded === undefined || typeof decoded === "string") {
            return reject(new Error("Decoded value incorrect type"));
          }
          resolve(decoded);
        });
      }
    );
    return jwt;
  } catch (err) {
    return undefined;
  }
};

export const getLoggedIn = async (ctx: GetServerSidePropsContext) => {
  const jwt = await getDecodedJWT(ctx);

  return !!jwt;
};

function getAccessToken(
  context: GetServerSidePropsContext
): string | undefined {
  return context.req.cookies["sAccessToken"];
}

function getPublicKey(header: JwtHeader, callback: SigningKeyCallback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
    } else {
      const signingKey = key?.getPublicKey();
      callback(null, signingKey);
    }
  });
}

async function verifyToken(token: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    JsonWebToken.verify(token, getPublicKey, {}, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as JwtPayload);
      }
    });
  });
}

/**
 * A helper function to retrieve session details on the server side.
 *
 * NOTE: This function does not use the getSession or verifySession functions from the supertokens-node SDK
 * because they can update the access token. These updated tokens would not be
 * propagated to the client side, as request interceptors do not run on the server side.
 */
export async function getSSRSessionHelper(
  context: GetServerSidePropsContext
): Promise<{
  accessTokenPayload: JwtPayload | undefined;
  hasToken: boolean;
  error: Error | undefined;
}> {
  const accessToken = getAccessToken(context);
  const hasToken = !!accessToken;
  try {
    if (accessToken) {
      const decoded = await verifyToken(accessToken);
      return { accessTokenPayload: decoded, hasToken, error: undefined };
    }
    return { accessTokenPayload: undefined, hasToken, error: undefined };
  } catch (error) {
    if (error instanceof JsonWebToken.TokenExpiredError) {
      return { accessTokenPayload: undefined, hasToken, error: undefined };
    }
    return { accessTokenPayload: undefined, hasToken, error: error as Error };
  }
}

export const doesSSRTokenNeedRefresh = async (
  context: GetServerSidePropsContext
) => {
  const { accessTokenPayload, error } = await getSSRSessionHelper(context);

  if (error) {
    throw error;
  }

  if (accessTokenPayload === undefined) {
    // This occurs if the token has expired or doesn't exist.
    // Either way, sending this response prompts the frontend to attempt a session refresh.
    //
    // Case 1: Token doesn't exist
    // - The refresh will fail, and the user will be redirected to the login page.
    //
    // Case 2: Token has expired
    // - The client will call the refresh API and update the session tokens.

    return {
      redirect: {
        destination: `/refresh-session?redirect=${context.resolvedUrl}`,
        permanent: false,
      },
    };
  }
  return null;
};

type SSRWrapperReturnType<T> = (ctx: GetServerSidePropsContext) => Promise<
  | {
      redirect: {
        destination: string;
        permanent: boolean;
      };
    }
  | T
>;

/** This will automatically handle the session refresh logic for you.
 * If the session is invalid, it will redirect to the refresh-session page.
 * If the session is valid, it will call the callback with the SSRApi.
 * If the callback throws an error, it will redirect to the appropriate error page.
 */
export function ssrWrapper<T>(
  callback: (ctx: GetServerSidePropsContext, api: ApiType) => T
): SSRWrapperReturnType<T> {
  return async (ctx: GetServerSidePropsContext) => {
    const redirect = await doesSSRTokenNeedRefresh(ctx);
    if (redirect) {
      return redirect;
    }
    try {
      const ssrApi = serverSideApi(ctx);
      return callback(ctx, ssrApi);
    } catch (err) {
      return getSSRErrorReturn(err);
    }
  };
}

const getSSRErrorReturn = (err: unknown) => {
  if (!(err instanceof ResponseError)) {
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }

  switch (err.response.status) {
    case 404:
      return {
        redirect: {
          destination: "/500",
          permanent: false,
        },
      };
    case 401:
      return {
        redirect: {
          destination: "/400",
          permanent: false,
        },
      };
    case 500:
    default:
      return {
        redirect: {
          destination: "/500",
          permanent: false,
        },
      };
  }
};

export const ifResponseErrorCode = (err: unknown, code: number) => {
  if (err instanceof ResponseError) {
    return err.response.status === code;
  }
  return false;
};
