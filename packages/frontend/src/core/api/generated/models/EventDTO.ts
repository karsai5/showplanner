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
 * @interface EventDTO
 */
export interface EventDTO {
  /**
   *
   * @type {number}
   * @memberof EventDTO
   */
  id: number;
  /**
   *
   * @type {number}
   * @memberof EventDTO
   */
  showId?: number;
  /**
   *
   * @type {Date}
   * @memberof EventDTO
   */
  start: Date;
  /**
   *
   * @type {string}
   * @memberof EventDTO
   */
  name?: string | null;
  /**
   *
   * @type {string}
   * @memberof EventDTO
   */
  nameRaw?: string | null;
  /**
   *
   * @type {string}
   * @memberof EventDTO
   */
  shortnote?: string | null;
  /**
   *
   * @type {string}
   * @memberof EventDTO
   */
  address?: string | null;
  /**
   *
   * @type {Date}
   * @memberof EventDTO
   */
  curtainsUp?: Date | null;
  /**
   *
   * @type {Date}
   * @memberof EventDTO
   */
  end?: Date | null;
}

/**
 * Check if a given object implements the EventDTO interface.
 */
export function instanceOfEventDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "id" in value;
  isInstance = isInstance && "start" in value;

  return isInstance;
}

export function EventDTOFromJSON(json: any): EventDTO {
  return EventDTOFromJSONTyped(json, false);
}

export function EventDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EventDTO {
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
  };
}

export function EventDTOToJSON(value?: EventDTO | null): any {
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
  };
}
