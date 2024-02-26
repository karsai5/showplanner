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
import type { AvailabilityDTO } from './AvailabilityDTO';
import {
  AvailabilityDTOFromJSON,
  AvailabilityDTOFromJSONTyped,
  AvailabilityDTOToJSON,
} from './AvailabilityDTO';

/**
 *
 * @export
 * @interface ScheduleEventDTO
 */
export interface ScheduleEventDTO {
  /**
   *
   * @type {number}
   * @memberof ScheduleEventDTO
   */
  id: number;
  /**
   *
   * @type {number}
   * @memberof ScheduleEventDTO
   */
  showId?: number;
  /**
   *
   * @type {Date}
   * @memberof ScheduleEventDTO
   */
  start: Date;
  /**
   *
   * @type {string}
   * @memberof ScheduleEventDTO
   */
  name?: string | null;
  /**
   *
   * @type {string}
   * @memberof ScheduleEventDTO
   */
  nameRaw?: string | null;
  /**
   *
   * @type {string}
   * @memberof ScheduleEventDTO
   */
  shortnote?: string | null;
  /**
   *
   * @type {string}
   * @memberof ScheduleEventDTO
   */
  address?: string | null;
  /**
   *
   * @type {Date}
   * @memberof ScheduleEventDTO
   */
  curtainsUp?: Date | null;
  /**
   *
   * @type {Date}
   * @memberof ScheduleEventDTO
   */
  end?: Date | null;
  /**
   *
   * @type {AvailabilityDTO}
   * @memberof ScheduleEventDTO
   */
  availability?: AvailabilityDTO;
}

/**
 * Check if a given object implements the ScheduleEventDTO interface.
 */
export function instanceOfScheduleEventDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'id' in value;
  isInstance = isInstance && 'start' in value;

  return isInstance;
}

export function ScheduleEventDTOFromJSON(json: any): ScheduleEventDTO {
  return ScheduleEventDTOFromJSONTyped(json, false);
}

export function ScheduleEventDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): ScheduleEventDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    showId: !exists(json, 'showId') ? undefined : json['showId'],
    start: new Date(json['start']),
    name: !exists(json, 'name') ? undefined : json['name'],
    nameRaw: !exists(json, 'nameRaw') ? undefined : json['nameRaw'],
    shortnote: !exists(json, 'shortnote') ? undefined : json['shortnote'],
    address: !exists(json, 'address') ? undefined : json['address'],
    curtainsUp: !exists(json, 'curtainsUp')
      ? undefined
      : json['curtainsUp'] === null
      ? null
      : new Date(json['curtainsUp']),
    end: !exists(json, 'end')
      ? undefined
      : json['end'] === null
      ? null
      : new Date(json['end']),
    availability: !exists(json, 'availability')
      ? undefined
      : AvailabilityDTOFromJSON(json['availability']),
  };
}

export function ScheduleEventDTOToJSON(value?: ScheduleEventDTO | null): any {
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
    availability: AvailabilityDTOToJSON(value.availability),
  };
}
