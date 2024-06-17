import * as cookie from "cookie";
import { getRequiredEnvVariable } from "core/utils/envVariables";
import JsonWebToken, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { GetServerSidePropsContext } from "next/types";
import { ReactNode } from "react";
import Session from "supertokens-auth-react/recipe/session";
import {
  PermissionClaim,
  UserRoleClaim,
} from "supertokens-auth-react/recipe/userroles";

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

export const enum PERMISSION {
  addEvents = "add-events",
  viewEvents = "view-events",
  personnel = "personnel",
  personnelEdit = "add-personnel",
  personnelPrivateDetails = "personnel-private-details",
  rostering = "rostering",
  addShow = "add-show",
}

type showIdType = string | number | undefined | null;

export const showPermission = (showId: showIdType, permission: PERMISSION) => {
  return `show:${showId}:${permission}`;
};

export const useIsLoggedIn = () => {
  const session = Session.useSessionContext();
  if (session.loading || !session.doesSessionExist) {
    return false;
  }
  return true;
};

export const useUserId = () => {
  const session = Session.useSessionContext();
  if (session.loading || !session.doesSessionExist) {
    return undefined;
  }
  return session.userId;
};

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

export const useHasPermission = () => {
  const claimValue = Session.useClaimValue(PermissionClaim);

  return (permission: string) => {
    if (claimValue.loading || !claimValue.doesSessionExist) {
      return false;
    }
    const permissions = claimValue?.value;

    return Array.isArray(permissions) && permissions.includes(permission);
  };
};

export const useHasRole = () => {
  const claimValue = Session.useClaimValue(UserRoleClaim);

  return (role: string) => {
    if (claimValue.loading || !claimValue.doesSessionExist) {
      return false;
    }
    const roles = claimValue?.value;

    return Array.isArray(roles) && roles.includes(role);
  };
};

export const HasPermission: React.FC<{
  showId?: showIdType;
  permission: PERMISSION;
  children: ReactNode;
}> = ({ showId, permission, children }) => {
  const permissionString = showId
    ? showPermission(showId, permission)
    : permission.toString();
  const authorised = useHasPermission()(permissionString);
  if (!authorised) {
    return null;
  }
  return <>{children}</>;
};
