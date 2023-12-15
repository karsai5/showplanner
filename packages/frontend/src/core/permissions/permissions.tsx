import { PermissionType } from "./types";

export const SHOW_PERMISSIONS = {
  PERSONNEL: {
    value: "personnel",
    name: "Personnel",
    type: PermissionType.SHOW,
    description:
      "Allows viewing crew assigned to a show, includes personal information like medical details",
  },
  ROSTERING: {
    value: "rostering",
    name: "Rostering",
    type: PermissionType.SHOW,
    description:
      "Rostering allows assigning crew to different roles for different events",
  },
  EVENT_EDIT: {
    value: "event-edit",
    name: "Edit events",
    type: PermissionType.SHOW,
    description: "Allows editing of events",
  },
};

export const PERMISSIONS = {
  PERMISSIONS_EDIT: {
    value: "general::permissions-edit",
    name: "Edit permissions",
    type: PermissionType.GENERAL,
    description:
      "Allows viewing, adding and removing permissions from all users",
  },
  PERSONNEL: {
    value: "general::personnel",
    name: "All personnel",
    type: PermissionType.GENERAL,
    description: "Gives the ability to view all crew",
  },
  LOCATIONS_EDIT: {
    value: "general::locations-edit",
    name: "Edit locations",
    type: PermissionType.GENERAL,
    description: "Gives the ability to edit locations",
  },
  SHOWS_ADD: {
    value: "general::shows-add",
    name: "Add Shows",
    type: PermissionType.GENERAL,
    description: "Ability to add shows",
  },
};
