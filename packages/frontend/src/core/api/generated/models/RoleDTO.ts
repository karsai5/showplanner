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

/**
 *
 * @export
 * @interface RoleDTO
 */
export interface RoleDTO {
  /**
   *
   * @type {number}
   * @memberof RoleDTO
   */
  id?: number;
  /**
   *
   * @type {string}
   * @memberof RoleDTO
   */
  name?: string;
  /**
   *
   * @type {PersonSummaryDTO}
   * @memberof RoleDTO
   */
  person?: PersonSummaryDTO;
}

/**
 * Check if a given object implements the RoleDTO interface.
 */
export function instanceOfRoleDTO(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function RoleDTOFromJSON(json: any): RoleDTO {
  return RoleDTOFromJSONTyped(json, false);
}

export function RoleDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): RoleDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "id") ? undefined : json["id"],
    name: !exists(json, "name") ? undefined : json["name"],
    person: !exists(json, "person")
      ? undefined
      : PersonSummaryDTOFromJSON(json["person"]),
  };
}

export function RoleDTOToJSON(value?: RoleDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    person: PersonSummaryDTOToJSON(value.person),
  };
}
