import { useSession } from "next-auth/react";

import { PERMISSIONS, SHOW_PERMISSIONS } from "./permissions";
import { PermissionDefinition, PermissionType, UserPermission } from "./types";

export const getShowPermissionString = (showSlug: string, permission: string) =>
  `show::${showSlug}::${permission}`;

export const hasPermission = (
  usersPermissions: string | undefined,
  permission: PermissionDefinition,
  showSlug?: string
): boolean => {
  let permissionString = permission.value;
  if (permission.type === PermissionType.SHOW) {
    if (!showSlug) {
      console.error(`Couldn't find show for permission ${permission.value}`);
      return false;
    }
    permissionString = getShowPermissionString(showSlug, permission.value);
  }

  if (usersPermissions) {
    const permissionsArray = usersPermissions
      .split(",")
      .map((p: string) => p.trim());
    if (permissionsArray.includes(permissionString)) {
      return true;
    }
  }
  return false;
};

export const useHasPermission = (
  permission: PermissionDefinition,
  showSlug?: string
): boolean => {
  const { data: session } = useSession();
  return hasPermission(session?.permissions, permission, showSlug);
};

export const getPermissionsFromString = (
  value?: string
): Array<UserPermission> => {
  const permissionStrings = value
    ?.split(",")
    .map((s) => s.trim().toLowerCase());
  const permissions: Array<UserPermission> = [];
  permissionStrings?.forEach((permissionString) => {
    const permission = getPermissionFromString(permissionString);
    if (permission) {
      permissions.push(permission);
    }
  });
  return permissions;
};

const GENERAL = "general";
const SHOW = "show";

const getPermissionFromString = (
  permissionString: string
): UserPermission | undefined => {
  const tokens = permissionString.split("::");
  if (tokens.length === 2 && tokens[0] === GENERAL) {
    const permission = Object.values(PERMISSIONS).find(
      (p) => p.value === permissionString
    );
    return permission
      ? {
          permission: permission,
        }
      : undefined;
  }
  if (tokens.length === 3 && tokens[0] === SHOW) {
    const permission = Object.values(SHOW_PERMISSIONS).find(
      (p) => p.value === tokens[2]
    );
    return permission
      ? {
          permission: permission,
          showSlug: tokens[1],
        }
      : undefined;
  }
  return undefined;
};
