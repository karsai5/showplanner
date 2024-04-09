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
import type { AvailabilityDTO } from "./AvailabilityDTO";
import {
  AvailabilityDTOFromJSON,
  AvailabilityDTOFromJSONTyped,
  AvailabilityDTOToJSON,
} from "./AvailabilityDTO";

/**
 *
 * @export
 * @interface AvailabilitiesDTOEvents
 */
export interface AvailabilitiesDTOEvents {
  /**
   *
   * @type {number}
   * @memberof AvailabilitiesDTOEvents
   */
  id: number;
  /**
   *
   * @type {number}
   * @memberof AvailabilitiesDTOEvents
   */
  showId?: number;
  /**
   *
   * @type {Date}
   * @memberof AvailabilitiesDTOEvents
   */
  start: Date;
  /**
   *
   * @type {string}
   * @memberof AvailabilitiesDTOEvents
   */
  name?: string | null;
  /**
   *
   * @type {string}
   * @memberof AvailabilitiesDTOEvents
   */
  nameRaw?: string | null;
  /**
   *
   * @type {string}
   * @memberof AvailabilitiesDTOEvents
   */
  shortnote?: string | null;
  /**
   *
   * @type {string}
   * @memberof AvailabilitiesDTOEvents
   */
  address?: string | null;
  /**
   *
   * @type {Date}
   * @memberof AvailabilitiesDTOEvents
   */
  curtainsUp?: Date | null;
  /**
   *
   * @type {Date}
   * @memberof AvailabilitiesDTOEvents
   */
  end?: Date | null;
  /**
   *
   * @type {Array<AvailabilityDTO>}
   * @memberof AvailabilitiesDTOEvents
   */
  availabilities?: Array<AvailabilityDTO> | null;
}

/**
 * Check if a given object implements the AvailabilitiesDTOEvents interface.
 */
export function instanceOfAvailabilitiesDTOEvents(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "id" in value;
  isInstance = isInstance && "start" in value;

  return isInstance;
}

export function AvailabilitiesDTOEventsFromJSON(
  json: any
): AvailabilitiesDTOEvents {
  return AvailabilitiesDTOEventsFromJSONTyped(json, false);
}

export function AvailabilitiesDTOEventsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AvailabilitiesDTOEvents {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    showId: !exists(json, "showId") ? undefined : json["showId"],
    start: new Date(json["start"]),
    name: !exists(json, "name") ? undefined : json["name"],
    nameRaw: !exists(json, "nameRaw") ? undefined : json["nameRaw"],
    shortnote: !exists(json, "shortnote") ? undefined : json["shortnote"],
    address: !exists(json, "address") ? undefined : json["address"],
    curtainsUp: !exists(json, "curtainsUp")
      ? undefined
      : json["curtainsUp"] === null
      ? null
      : new Date(json["curtainsUp"]),
    end: !exists(json, "end")
      ? undefined
      : json["end"] === null
      ? null
      : new Date(json["end"]),
    availabilities: !exists(json, "availabilities")
      ? undefined
      : json["availabilities"] === null
      ? null
      : (json["availabilities"] as Array<any>).map(AvailabilityDTOFromJSON),
  };
}

export function AvailabilitiesDTOEventsToJSON(
  value?: AvailabilitiesDTOEvents | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    showId: value.showId,
    start: value.start.toISOString(),
    name: value.name,
    nameRaw: value.nameRaw,
    shortnote: value.shortnote,
    address: value.address,
    curtainsUp:
      value.curtainsUp === undefined
        ? undefined
        : value.curtainsUp === null
        ? null
        : value.curtainsUp.toISOString(),
    end:
      value.end === undefined
        ? undefined
        : value.end === null
        ? null
        : value.end.toISOString(),
    availabilities:
      value.availabilities === undefined
        ? undefined
        : value.availabilities === null
        ? null
        : (value.availabilities as Array<any>).map(AvailabilityDTOToJSON),
  };
}
