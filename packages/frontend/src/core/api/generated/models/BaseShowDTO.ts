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
/**
 *
 * @export
 * @interface BaseShowDTO
 */
export interface BaseShowDTO {
  /**
   *
   * @type {number}
   * @memberof BaseShowDTO
   */
  id?: number;
  /**
   *
   * @type {string}
   * @memberof BaseShowDTO
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof BaseShowDTO
   */
  company: string;
  /**
   *
   * @type {string}
   * @memberof BaseShowDTO
   */
  slug: string;
}

/**
 * Check if a given object implements the BaseShowDTO interface.
 */
export function instanceOfBaseShowDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'name' in value;
  isInstance = isInstance && 'company' in value;
  isInstance = isInstance && 'slug' in value;

  return isInstance;
}

export function BaseShowDTOFromJSON(json: any): BaseShowDTO {
  return BaseShowDTOFromJSONTyped(json, false);
}

export function BaseShowDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): BaseShowDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, 'id') ? undefined : json['id'],
    name: json['name'],
    company: json['company'],
    slug: json['slug'],
  };
}

export function BaseShowDTOToJSON(value?: BaseShowDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    company: value.company,
    slug: value.slug,
  };
}
