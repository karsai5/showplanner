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
import type { EventOptionsDTO } from "./EventOptionsDTO";
import {
  EventOptionsDTOFromJSON,
  EventOptionsDTOFromJSONTyped,
  EventOptionsDTOToJSON,
} from "./EventOptionsDTO";

/**
 *
 * @export
 * @interface CreateEventDTO
 */
export interface CreateEventDTO {
  /**
   *
   * @type {number}
   * @memberof CreateEventDTO
   */
  showId: number;
  /**
   *
   * @type {Date}
   * @memberof CreateEventDTO
   */
  start: Date;
  /**
   *
   * @type {Date}
   * @memberof CreateEventDTO
   */
  end?: Date | null;
  /**
   *
   * @type {Date}
   * @memberof CreateEventDTO
   */
  curtainsUp?: Date | null;
  /**
   *
   * @type {string}
   * @memberof CreateEventDTO
   */
  name?: string | null;
  /**
   *
   * @type {string}
   * @memberof CreateEventDTO
   */
  shortnote?: string | null;
  /**
   *
   * @type {string}
   * @memberof CreateEventDTO
   */
  address?: string | null;
  /**
   *
   * @type {EventOptionsDTO}
   * @memberof CreateEventDTO
   */
  options?: EventOptionsDTO;
}

/**
 * Check if a given object implements the CreateEventDTO interface.
 */
export function instanceOfCreateEventDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "showId" in value;
  isInstance = isInstance && "start" in value;

  return isInstance;
}

export function CreateEventDTOFromJSON(json: any): CreateEventDTO {
  return CreateEventDTOFromJSONTyped(json, false);
}

export function CreateEventDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CreateEventDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    showId: json["showId"],
    start: new Date(json["start"]),
    end: !exists(json, "end")
      ? undefined
      : json["end"] === null
      ? null
      : new Date(json["end"]),
    curtainsUp: !exists(json, "curtainsUp")
      ? undefined
      : json["curtainsUp"] === null
      ? null
      : new Date(json["curtainsUp"]),
    name: !exists(json, "name") ? undefined : json["name"],
    shortnote: !exists(json, "shortnote") ? undefined : json["shortnote"],
    address: !exists(json, "address") ? undefined : json["address"],
    options: !exists(json, "options")
      ? undefined
      : EventOptionsDTOFromJSON(json["options"]),
  };
}

export function CreateEventDTOToJSON(value?: CreateEventDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    showId: value.showId,
    start: value.start.toISOString(),
    end:
      value.end === undefined
        ? undefined
        : value.end === null
        ? null
        : value.end.toISOString(),
    curtainsUp:
      value.curtainsUp === undefined
        ? undefined
        : value.curtainsUp === null
        ? null
        : value.curtainsUp.toISOString(),
    name: value.name,
    shortnote: value.shortnote,
    address: value.address,
    options: EventOptionsDTOToJSON(value.options),
  };
}
