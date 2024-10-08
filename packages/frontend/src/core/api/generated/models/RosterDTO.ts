/* tslint:disable */
/* eslint-disable */
/**
 * Showplanner backend
 * API description in Markdown.
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from "../runtime";
import type { RosterEventDTO } from "./RosterEventDTO";
import {
  RosterEventDTOFromJSON,
  RosterEventDTOFromJSONTyped,
  RosterEventDTOToJSON,
} from "./RosterEventDTO";
import type { RosterRoleDTO } from "./RosterRoleDTO";
import {
  RosterRoleDTOFromJSON,
  RosterRoleDTOFromJSONTyped,
  RosterRoleDTOToJSON,
} from "./RosterRoleDTO";

/**
 *
 * @export
 * @interface RosterDTO
 */
export interface RosterDTO {
  /**
   *
   * @type {Array<RosterRoleDTO>}
   * @memberof RosterDTO
   */
  roles?: Array<RosterRoleDTO>;
  /**
   *
   * @type {Array<RosterEventDTO>}
   * @memberof RosterDTO
   */
  events?: Array<RosterEventDTO>;
}

/**
 * Check if a given object implements the RosterDTO interface.
 */
export function instanceOfRosterDTO(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function RosterDTOFromJSON(json: any): RosterDTO {
  return RosterDTOFromJSONTyped(json, false);
}

export function RosterDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): RosterDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    roles: !exists(json, "roles")
      ? undefined
      : (json["roles"] as Array<any>).map(RosterRoleDTOFromJSON),
    events: !exists(json, "events")
      ? undefined
      : (json["events"] as Array<any>).map(RosterEventDTOFromJSON),
  };
}

export function RosterDTOToJSON(value?: RosterDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    roles:
      value.roles === undefined
        ? undefined
        : (value.roles as Array<any>).map(RosterRoleDTOToJSON),
    events:
      value.events === undefined
        ? undefined
        : (value.events as Array<any>).map(RosterEventDTOToJSON),
  };
}
