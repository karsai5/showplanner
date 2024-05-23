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
 * @interface UpdateShowreportDTO
 */
export interface UpdateShowreportDTO {
  /**
   *
   * @type {string}
   * @memberof UpdateShowreportDTO
   */
  title?: string | null;
  /**
   *
   * @type {string}
   * @memberof UpdateShowreportDTO
   */
  subtitle?: string | null;
  /**
   *
   * @type {Date}
   * @memberof UpdateShowreportDTO
   */
  showStart?: Date | null;
  /**
   *
   * @type {Date}
   * @memberof UpdateShowreportDTO
   */
  showEnd?: Date | null;
  /**
   *
   * @type {Date}
   * @memberof UpdateShowreportDTO
   */
  intervalStart?: Date | null;
  /**
   *
   * @type {Date}
   * @memberof UpdateShowreportDTO
   */
  intervalEnd?: Date | null;
  /**
   *
   * @type {Date}
   * @memberof UpdateShowreportDTO
   */
  houseOpen?: Date | null;
  /**
   *
   * @type {Date}
   * @memberof UpdateShowreportDTO
   */
  actOneFOHClearance?: Date | null;
  /**
   *
   * @type {Date}
   * @memberof UpdateShowreportDTO
   */
  actTwoFOHClearance?: Date | null;
  /**
   *
   * @type {string}
   * @memberof UpdateShowreportDTO
   */
  notes?: string | null;
  /**
   *
   * @type {number}
   * @memberof UpdateShowreportDTO
   */
  eventId?: number | null;
}

/**
 * Check if a given object implements the UpdateShowreportDTO interface.
 */
export function instanceOfUpdateShowreportDTO(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function UpdateShowreportDTOFromJSON(json: any): UpdateShowreportDTO {
  return UpdateShowreportDTOFromJSONTyped(json, false);
}

export function UpdateShowreportDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): UpdateShowreportDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    title: !exists(json, "title") ? undefined : json["title"],
    subtitle: !exists(json, "subtitle") ? undefined : json["subtitle"],
    showStart: !exists(json, "showStart")
      ? undefined
      : json["showStart"] === null
      ? null
      : new Date(json["showStart"]),
    showEnd: !exists(json, "showEnd")
      ? undefined
      : json["showEnd"] === null
      ? null
      : new Date(json["showEnd"]),
    intervalStart: !exists(json, "intervalStart")
      ? undefined
      : json["intervalStart"] === null
      ? null
      : new Date(json["intervalStart"]),
    intervalEnd: !exists(json, "intervalEnd")
      ? undefined
      : json["intervalEnd"] === null
      ? null
      : new Date(json["intervalEnd"]),
    houseOpen: !exists(json, "houseOpen")
      ? undefined
      : json["houseOpen"] === null
      ? null
      : new Date(json["houseOpen"]),
    actOneFOHClearance: !exists(json, "actOneFOHClearance")
      ? undefined
      : json["actOneFOHClearance"] === null
      ? null
      : new Date(json["actOneFOHClearance"]),
    actTwoFOHClearance: !exists(json, "actTwoFOHClearance")
      ? undefined
      : json["actTwoFOHClearance"] === null
      ? null
      : new Date(json["actTwoFOHClearance"]),
    notes: !exists(json, "notes") ? undefined : json["notes"],
    eventId: !exists(json, "eventId") ? undefined : json["eventId"],
  };
}

export function UpdateShowreportDTOToJSON(
  value?: UpdateShowreportDTO | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    title: value.title,
    subtitle: value.subtitle,
    showStart:
      value.showStart === undefined
        ? undefined
        : value.showStart === null
        ? null
        : value.showStart.toISOString(),
    showEnd:
      value.showEnd === undefined
        ? undefined
        : value.showEnd === null
        ? null
        : value.showEnd.toISOString(),
    intervalStart:
      value.intervalStart === undefined
        ? undefined
        : value.intervalStart === null
        ? null
        : value.intervalStart.toISOString(),
    intervalEnd:
      value.intervalEnd === undefined
        ? undefined
        : value.intervalEnd === null
        ? null
        : value.intervalEnd.toISOString(),
    houseOpen:
      value.houseOpen === undefined
        ? undefined
        : value.houseOpen === null
        ? null
        : value.houseOpen.toISOString(),
    actOneFOHClearance:
      value.actOneFOHClearance === undefined
        ? undefined
        : value.actOneFOHClearance === null
        ? null
        : value.actOneFOHClearance.toISOString(),
    actTwoFOHClearance:
      value.actTwoFOHClearance === undefined
        ? undefined
        : value.actTwoFOHClearance === null
        ? null
        : value.actTwoFOHClearance.toISOString(),
    notes: value.notes,
    eventId: value.eventId,
  };
}
