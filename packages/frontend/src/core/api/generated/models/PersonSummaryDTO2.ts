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
 * @interface PersonSummaryDTO2
 */
export interface PersonSummaryDTO2 {
    /**
     * 
     * @type {string}
     * @memberof PersonSummaryDTO2
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonSummaryDTO2
     */
    firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonSummaryDTO2
     */
    lastName?: string;
}

/**
 * Check if a given object implements the PersonSummaryDTO2 interface.
 */
export function instanceOfPersonSummaryDTO2(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PersonSummaryDTO2FromJSON(json: any): PersonSummaryDTO2 {
    return PersonSummaryDTO2FromJSONTyped(json, false);
}

export function PersonSummaryDTO2FromJSONTyped(json: any, ignoreDiscriminator: boolean): PersonSummaryDTO2 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'firstName': !exists(json, 'firstName') ? undefined : json['firstName'],
        'lastName': !exists(json, 'lastName') ? undefined : json['lastName'],
    };
}

export function PersonSummaryDTO2ToJSON(value?: PersonSummaryDTO2 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'firstName': value.firstName,
        'lastName': value.lastName,
    };
}

