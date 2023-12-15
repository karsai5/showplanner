export enum PermissionType {
  GENERAL,
  SHOW,
}

export type PermissionDefinition = {
  name: string;
  value: string;
  type: PermissionType;
  description?: string;
};

export type UserPermission = {
  showSlug?: string;
  permission: PermissionDefinition;
};
