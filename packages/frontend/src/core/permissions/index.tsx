import { ReactNode } from "react";
import Session from "supertokens-auth-react/recipe/session";
import { PermissionClaim } from "supertokens-auth-react/recipe/userroles"

export const enum PERMISSION {
  addEvents = "add-events",
  viewEvents = "view-events",
  personnel = "personnel",

  addShow = "add-show",
}

type showIdType = string | number | undefined | null

export const showPermission = (showId: showIdType, permission: PERMISSION) => {
  return `show:${showId}:${permission}`;
}

export const useHasPermission = () => {
  let claimValue = Session.useClaimValue(PermissionClaim)

  return (permission: string) => {

    if (claimValue.loading || !claimValue.doesSessionExist) {
      return false;
    }
    let permissions = claimValue?.value;

    return (Array.isArray(permissions) && permissions.includes(permission));
  }
}

export const HasPermission: React.FC<{showId?: showIdType, permission: PERMISSION, children: ReactNode}> = 
({showId, permission ,children}) => {
  const permissionString = showId ? showPermission(showId, permission) : permission.toString();
  const authorised = useHasPermission()(permissionString);
  if (!authorised) {
    return null;
  }
  return <>{children}</>
}
