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
/**
 *
 * @export
 * @interface PersonSummaryDTO
 */
export interface PersonSummaryDTO {
  /**
   *
   * @type {string}
   * @memberof PersonSummaryDTO
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof PersonSummaryDTO
   */
  firstName?: string;
  /**
   *
   * @type {string}
   * @memberof PersonSummaryDTO
   */
  lastName?: string;
}

/**
 * Check if a given object implements the PersonSummaryDTO interface.
 */
export function instanceOfPersonSummaryDTO(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function PersonSummaryDTOFromJSON(json: any): PersonSummaryDTO {
  return PersonSummaryDTOFromJSONTyped(json, false);
}

export function PersonSummaryDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PersonSummaryDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "id") ? undefined : json["id"],
    firstName: !exists(json, "firstName") ? undefined : json["firstName"],
    lastName: !exists(json, "lastName") ? undefined : json["lastName"],
  };
}

export function PersonSummaryDTOToJSON(value?: PersonSummaryDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    firstName: value.firstName,
    lastName: value.lastName,
  };
}
