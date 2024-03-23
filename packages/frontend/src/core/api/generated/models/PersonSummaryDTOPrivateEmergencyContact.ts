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
 * @interface PersonSummaryDTOPrivateEmergencyContact
 */
export interface PersonSummaryDTOPrivateEmergencyContact {
    /**
     * 
     * @type {string}
     * @memberof PersonSummaryDTOPrivateEmergencyContact
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonSummaryDTOPrivateEmergencyContact
     */
    relationship?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonSummaryDTOPrivateEmergencyContact
     */
    phone?: string;
}

/**
 * Check if a given object implements the PersonSummaryDTOPrivateEmergencyContact interface.
 */
export function instanceOfPersonSummaryDTOPrivateEmergencyContact(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PersonSummaryDTOPrivateEmergencyContactFromJSON(json: any): PersonSummaryDTOPrivateEmergencyContact {
    return PersonSummaryDTOPrivateEmergencyContactFromJSONTyped(json, false);
}

export function PersonSummaryDTOPrivateEmergencyContactFromJSONTyped(json: any, ignoreDiscriminator: boolean): PersonSummaryDTOPrivateEmergencyContact {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'relationship': !exists(json, 'relationship') ? undefined : json['relationship'],
        'phone': !exists(json, 'phone') ? undefined : json['phone'],
    };
}

export function PersonSummaryDTOPrivateEmergencyContactToJSON(value?: PersonSummaryDTOPrivateEmergencyContact | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'relationship': value.relationship,
        'phone': value.phone,
    };
}
