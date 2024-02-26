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

import { exists, mapValues } from '../runtime';
import type { PersonSummaryDTO } from './PersonSummaryDTO';
import {
  PersonSummaryDTOFromJSON,
  PersonSummaryDTOFromJSONTyped,
  PersonSummaryDTOToJSON,
} from './PersonSummaryDTO';

/**
 *
 * @export
 * @interface PersonnelDTO
 */
export interface PersonnelDTO {
  /**
   *
   * @type {Array<PersonSummaryDTO>}
   * @memberof PersonnelDTO
   */
  people?: Array<PersonSummaryDTO>;
}

/**
 * Check if a given object implements the PersonnelDTO interface.
 */
export function instanceOfPersonnelDTO(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function PersonnelDTOFromJSON(json: any): PersonnelDTO {
  return PersonnelDTOFromJSONTyped(json, false);
}

export function PersonnelDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): PersonnelDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    people: !exists(json, 'people')
      ? undefined
      : (json['people'] as Array<any>).map(PersonSummaryDTOFromJSON),
  };
}

export function PersonnelDTOToJSON(value?: PersonnelDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    people:
      value.people === undefined
        ? undefined
        : (value.people as Array<any>).map(PersonSummaryDTOToJSON),
  };
}
