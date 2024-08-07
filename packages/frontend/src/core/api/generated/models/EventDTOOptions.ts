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
 * @interface EventDTOOptions
 */
export interface EventDTOOptions {
  /**
   *
   * @type {string}
   * @memberof EventDTOOptions
   */
  divider?: string | null;
}

/**
 * Check if a given object implements the EventDTOOptions interface.
 */
export function instanceOfEventDTOOptions(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function EventDTOOptionsFromJSON(json: any): EventDTOOptions {
  return EventDTOOptionsFromJSONTyped(json, false);
}

export function EventDTOOptionsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EventDTOOptions {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    divider: !exists(json, "divider") ? undefined : json["divider"],
  };
}

export function EventDTOOptionsToJSON(value?: EventDTOOptions | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    divider: value.divider,
  };
}
