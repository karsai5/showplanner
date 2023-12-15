import { UserPermission } from "core/permissions";

export type Person = {
  id: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  shows: Array<string>;
  userid?: string;
  permissions?: Array<UserPermission>;
};

export type RoleGroup = {
  name: string;
  id: string;
  roles: Array<ShowRole>;
};

export type ShowRole = {
  name: string;
  id: string;
  rostered: boolean;
  note: string;
};
