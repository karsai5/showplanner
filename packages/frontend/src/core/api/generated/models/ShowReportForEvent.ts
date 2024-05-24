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
import type { ShowReportDTO } from "./ShowReportDTO";
import {
  ShowReportDTOFromJSON,
  ShowReportDTOFromJSONTyped,
  ShowReportDTOToJSON,
} from "./ShowReportDTO";

/**
 *
 * @export
 * @interface ShowReportForEvent
 */
export interface ShowReportForEvent {
  /**
   *
   * @type {ShowReportDTO}
   * @memberof ShowReportForEvent
   */
  showReport?: ShowReportDTO;
  /**
   *
   * @type {string}
   * @memberof ShowReportForEvent
   */
  title?: string;
  /**
   *
   * @type {string}
   * @memberof ShowReportForEvent
   */
  subtitle?: string;
}

/**
 * Check if a given object implements the ShowReportForEvent interface.
 */
export function instanceOfShowReportForEvent(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function ShowReportForEventFromJSON(json: any): ShowReportForEvent {
  return ShowReportForEventFromJSONTyped(json, false);
}

export function ShowReportForEventFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ShowReportForEvent {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    showReport: !exists(json, "showReport")
      ? undefined
      : ShowReportDTOFromJSON(json["showReport"]),
    title: !exists(json, "title") ? undefined : json["title"],
    subtitle: !exists(json, "subtitle") ? undefined : json["subtitle"],
  };
}

export function ShowReportForEventToJSON(
  value?: ShowReportForEvent | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    showReport: ShowReportDTOToJSON(value.showReport),
    title: value.title,
    subtitle: value.subtitle,
  };
}