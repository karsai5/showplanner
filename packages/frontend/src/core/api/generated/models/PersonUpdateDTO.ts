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
 * @interface PersonUpdateDTO
 */
export interface PersonUpdateDTO {
  /**
   *
   * @type {string}
   * @memberof PersonUpdateDTO
   */
  pronoun?: string | null;
  /**
   *
   * @type {string}
   * @memberof PersonUpdateDTO
   */
  firstName: string;
  /**
   *
   * @type {string}
   * @memberof PersonUpdateDTO
   */
  lastName: string;
  /**
   *
   * @type {string}
   * @memberof PersonUpdateDTO
   */
  preferredName?: string | null;
  /**
   *
   * @type {string}
   * @memberof PersonUpdateDTO
   */
  phone: string;
  /**
   *
   * @type {string}
   * @memberof PersonUpdateDTO
   */
  wwc?: string | null;
  /**
   *
   * @type {string}
   * @memberof PersonUpdateDTO
   */
  dob: string;
  /**
   *
   * @type {string}
   * @memberof PersonUpdateDTO
   */
  allergies: string;
  /**
   *
   * @type {string}
   * @memberof PersonUpdateDTO
   */
  emergencyPhone: string;
  /**
   *
   * @type {string}
   * @memberof PersonUpdateDTO
   */
  emergencyName: string;
  /**
   *
   * @type {string}
   * @memberof PersonUpdateDTO
   */
  emergencyRelationship: string;
}

/**
 * Check if a given object implements the PersonUpdateDTO interface.
 */
export function instanceOfPersonUpdateDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "firstName" in value;
  isInstance = isInstance && "lastName" in value;
  isInstance = isInstance && "phone" in value;
  isInstance = isInstance && "dob" in value;
  isInstance = isInstance && "allergies" in value;
  isInstance = isInstance && "emergencyPhone" in value;
  isInstance = isInstance && "emergencyName" in value;
  isInstance = isInstance && "emergencyRelationship" in value;

  return isInstance;
}

export function PersonUpdateDTOFromJSON(json: any): PersonUpdateDTO {
  return PersonUpdateDTOFromJSONTyped(json, false);
}

export function PersonUpdateDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PersonUpdateDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    pronoun: !exists(json, "pronoun") ? undefined : json["pronoun"],
    firstName: json["firstName"],
    lastName: json["lastName"],
    preferredName: !exists(json, "preferredName")
      ? undefined
      : json["preferredName"],
    phone: json["phone"],
    wwc: !exists(json, "wwc") ? undefined : json["wwc"],
    dob: json["dob"],
    allergies: json["allergies"],
    emergencyPhone: json["emergencyPhone"],
    emergencyName: json["emergencyName"],
    emergencyRelationship: json["emergencyRelationship"],
  };
}

export function PersonUpdateDTOToJSON(value?: PersonUpdateDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    pronoun: value.pronoun,
    firstName: value.firstName,
    lastName: value.lastName,
    preferredName: value.preferredName,
    phone: value.phone,
    wwc: value.wwc,
    dob: value.dob,
    allergies: value.allergies,
    emergencyPhone: value.emergencyPhone,
    emergencyName: value.emergencyName,
    emergencyRelationship: value.emergencyRelationship,
  };
}
