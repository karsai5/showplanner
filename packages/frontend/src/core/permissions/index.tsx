import { AccessDenied } from "core/components/AccessDenied/AccessDenied";
import { ReactNode } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Session from "supertokens-auth-react/recipe/session";
import {
  PermissionClaim,
  UserRoleClaim,
} from "supertokens-auth-react/recipe/userroles";

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

export const PermissionRequired: React.FC<{
  children: ReactNode;
  permission: string;
}> = ({ children, permission }) => {
  return (
    <SessionAuth
      accessDeniedScreen={AccessDenied}
      overrideGlobalClaimValidators={(globalValidators) => [
        ...globalValidators,
        PermissionClaim.validators.includes(permission),
      ]}
    >
      {children}
    </SessionAuth>
  );
};
