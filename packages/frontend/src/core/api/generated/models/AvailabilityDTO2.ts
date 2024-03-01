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
 * @interface AvailabilityDTO2
 */
export interface AvailabilityDTO2 {
    /**
     * 
     * @type {number}
     * @memberof AvailabilityDTO2
     */
    eventId: number;
    /**
     * 
     * @type {string}
     * @memberof AvailabilityDTO2
     */
    personId: string;
    /**
     * 
     * @type {boolean}
     * @memberof AvailabilityDTO2
     */
    available: boolean;
}

/**
 * Check if a given object implements the AvailabilityDTO2 interface.
 */
export function instanceOfAvailabilityDTO2(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "eventId" in value;
    isInstance = isInstance && "personId" in value;
    isInstance = isInstance && "available" in value;

    return isInstance;
}

export function AvailabilityDTO2FromJSON(json: any): AvailabilityDTO2 {
    return AvailabilityDTO2FromJSONTyped(json, false);
}

export function AvailabilityDTO2FromJSONTyped(json: any, ignoreDiscriminator: boolean): AvailabilityDTO2 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'eventId': json['eventId'],
        'personId': json['personId'],
        'available': json['available'],
    };
}

export function AvailabilityDTO2ToJSON(value?: AvailabilityDTO2 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'eventId': value.eventId,
        'personId': value.personId,
        'available': value.available,
    };
}
