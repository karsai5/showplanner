import { PermissionDefinition } from "core/permissions";
import { Session } from "next-auth";
import { IconType } from "react-icons";

type NavPropShow = {
  slug: string;
  name: string;
  hideRoles?: boolean;
};

export type NavProps = {
  show?: NavPropShow;
  shows?: Array<{ name: string; slug: string }>;
  user?: Session;
};

export enum TYPE {
  "divider",
  "item",
}
type BaseType = {
  type: TYPE;
};

export type MenuItemType = BaseType & {
  type: TYPE.item;
  label: string;
  subLabel?: string;
  children?: Array<ChildType>;
  icon?: IconType;
  to?: string;
  isOpen?: boolean;
  onClick?: () => void;
  toShow?: string;
  imageUrl?: string;
  permission?: PermissionDefinition;
  mustBeLoggedIn?: boolean;
  hide?: (showOptions?: NavPropShow, user?: Session) => boolean;
};

export type ProcessedMenuItemType = BaseType & {
  type: TYPE.item;
  label: string;
  subLabel?: string;
  children?: Array<ProcessedChildType>;
  isOpen?: boolean;
  to: string;
  icon?: IconType;
  onClick?: () => void;
  imageUrl?: string;
};

export type DividerType = BaseType & {
  type: TYPE.divider;
};

export type ChildType = MenuItemType | DividerType;
export type ProcessedChildType = ProcessedMenuItemType | DividerType;
