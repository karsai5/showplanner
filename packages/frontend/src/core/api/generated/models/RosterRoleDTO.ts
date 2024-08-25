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
import type { PersonSummaryDTO } from "./PersonSummaryDTO";
import {
  PersonSummaryDTOFromJSON,
  PersonSummaryDTOFromJSONTyped,
  PersonSummaryDTOToJSON,
} from "./PersonSummaryDTO";
import type { RosterWarningDTO } from "./RosterWarningDTO";
import {
  RosterWarningDTOFromJSON,
  RosterWarningDTOFromJSONTyped,
  RosterWarningDTOToJSON,
} from "./RosterWarningDTO";

/**
 *
 * @export
 * @interface RosterRoleDTO
 */
export interface RosterRoleDTO {
  /**
   *
   * @type {number}
   * @memberof RosterRoleDTO
   */
  id?: number;
  /**
   *
   * @type {string}
   * @memberof RosterRoleDTO
   */
  name?: string;
  /**
   *
   * @type {number}
   * @memberof RosterRoleDTO
   */
  order?: number;
  /**
   *
   * @type {PersonSummaryDTO}
   * @memberof RosterRoleDTO
   */
  person?: PersonSummaryDTO;
  /**
   *
   * @type {Array<RosterWarningDTO>}
   * @memberof RosterRoleDTO
   */
  warnings?: Array<RosterWarningDTO>;
}

/**
 * Check if a given object implements the RosterRoleDTO interface.
 */
export function instanceOfRosterRoleDTO(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function RosterRoleDTOFromJSON(json: any): RosterRoleDTO {
  return RosterRoleDTOFromJSONTyped(json, false);
}

export function RosterRoleDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): RosterRoleDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "id") ? undefined : json["id"],
    name: !exists(json, "name") ? undefined : json["name"],
    order: !exists(json, "order") ? undefined : json["order"],
    person: !exists(json, "person")
      ? undefined
      : PersonSummaryDTOFromJSON(json["person"]),
    warnings: !exists(json, "warnings")
      ? undefined
      : (json["warnings"] as Array<any>).map(RosterWarningDTOFromJSON),
  };
}

export function RosterRoleDTOToJSON(value?: RosterRoleDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    order: value.order,
    person: PersonSummaryDTOToJSON(value.person),
    warnings:
      value.warnings === undefined
        ? undefined
        : (value.warnings as Array<any>).map(RosterWarningDTOToJSON),
  };
}
