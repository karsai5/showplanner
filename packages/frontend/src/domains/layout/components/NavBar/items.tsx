import { hasPermission, PERMISSIONS, SHOW_PERMISSIONS } from "core/permissions";
import {
  FaCalendar,
  FaRegCalendarCheck,
  FaThList,
  FaToolbox,
  FaUserFriends,
  FaUserGraduate,
  FaUserShield,
} from "react-icons/fa";

import { ChildType, MenuItemType, TYPE } from "./types";

export const showItems: Array<ChildType> = [
  {
    type: TYPE.item,
    label: "Overview",
    toShow: "/",
  },
  {
    type: TYPE.divider,
  },
  {
    type: TYPE.item,
    label: "Schedule",
    icon: FaCalendar,
    toShow: "/schedule",
    subLabel: "Dates and times",
  },
  {
    type: TYPE.item,
    label: "Availabilities",
    icon: FaRegCalendarCheck,
    toShow: "/availabilities",
    subLabel: "Who is available when",
  },
  {
    type: TYPE.item,
    label: "Roster",
    icon: FaThList,
    toShow: "/roster",
    subLabel: "Who is assigned to do what for each show",
  },
  {
    type: TYPE.divider,
  },
  {
    type: TYPE.item,
    label: "Crew",
    toShow: "/crew",
    icon: FaUserFriends,
    permission: SHOW_PERMISSIONS.PERSONNEL,
  },
  {
    type: TYPE.item,
    label: "Roles",
    toShow: "/roles",
    hide: (showOptions, user) => {
      const permission = hasPermission(
        user?.permissions,
        SHOW_PERMISSIONS.PERSONNEL,
        showOptions?.slug
      );
      if (permission) {
        return false;
      }
      if (showOptions && showOptions.hideRoles) {
        return true;
      }
      return false;
    },
    icon: FaUserGraduate,
  },
];

export const NAV_ITEMS_RIGHT: Array<MenuItemType> = [
  {
    type: TYPE.item,
    label: "Toolbox",
    icon: FaToolbox,
    children: [
      {
        type: TYPE.item,
        label: "Calls",
        subLabel: "Timer for recording show length",
        to: "/timer",
      },
    ],
  },
  {
    type: TYPE.item,
    label: "Admin",
    icon: FaUserShield,
    children: [
      {
        type: TYPE.item,
        label: "All Crew",
        to: "/crew",
        permission: PERMISSIONS.PERSONNEL,
      },
      {
        type: TYPE.item,
        label: "Locations",
        to: "/locations",
        permission: PERMISSIONS.LOCATIONS_EDIT,
      },
      {
        type: TYPE.item,
        label: "Permissions",
        to: "/permissions",
        permission: PERMISSIONS.PERMISSIONS_EDIT,
        subLabel: "Edit other users permissions",
      },
      // {
      //   type: TYPE.item,
      //   label: 'Log',
      //   to: '/application-events',
      //   permission: PERMISSIONS.APPLICATION_EVENTS,
      //   subLabel: 'List of event that occur on the ShowPlanner',
      // },
    ],
  },
];
