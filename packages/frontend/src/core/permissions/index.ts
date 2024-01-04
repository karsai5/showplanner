import Session from "supertokens-auth-react/recipe/session";
import { PermissionClaim } from "supertokens-auth-react/recipe/userroles"

export const enum PERMISSION {
  addEvents = "add-events",
  viewEvents = "view-events",
}

export const showPermission = (showId: string | number | undefined | null, permission: PERMISSION) => {
  return `show:${showId}:${permission}`;
}

export const useHasPermission = () => {
  let claimValue = Session.useClaimValue(PermissionClaim)

  return (permission: string) => {

    if (claimValue.loading || !claimValue.doesSessionExist) {
      return null;
    }
    let permissions = claimValue?.value;

    return (Array.isArray(permissions) && permissions.includes(permission));
  }
}
