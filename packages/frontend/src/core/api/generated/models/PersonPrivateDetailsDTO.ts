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
import type { PersonPrivateDetailsDTOEmergencyContact } from './PersonPrivateDetailsDTOEmergencyContact';
import {
    PersonPrivateDetailsDTOEmergencyContactFromJSON,
    PersonPrivateDetailsDTOEmergencyContactFromJSONTyped,
    PersonPrivateDetailsDTOEmergencyContactToJSON,
} from './PersonPrivateDetailsDTOEmergencyContact';

/**
 * 
 * @export
 * @interface PersonPrivateDetailsDTO
 */
export interface PersonPrivateDetailsDTO {
    /**
     * 
     * @type {string}
     * @memberof PersonPrivateDetailsDTO
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPrivateDetailsDTO
     */
    phone?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonPrivateDetailsDTO
     */
    wwc?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof PersonPrivateDetailsDTO
     */
    dob?: Date;
    /**
     * 
     * @type {string}
     * @memberof PersonPrivateDetailsDTO
     */
    allergies?: string;
    /**
     * 
     * @type {PersonPrivateDetailsDTOEmergencyContact}
     * @memberof PersonPrivateDetailsDTO
     */
    emergencyContact?: PersonPrivateDetailsDTOEmergencyContact;
}

/**
 * Check if a given object implements the PersonPrivateDetailsDTO interface.
 */
export function instanceOfPersonPrivateDetailsDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PersonPrivateDetailsDTOFromJSON(json: any): PersonPrivateDetailsDTO {
    return PersonPrivateDetailsDTOFromJSONTyped(json, false);
}

export function PersonPrivateDetailsDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): PersonPrivateDetailsDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': !exists(json, 'email') ? undefined : json['email'],
        'phone': !exists(json, 'phone') ? undefined : json['phone'],
        'wwc': !exists(json, 'wwc') ? undefined : json['wwc'],
        'dob': !exists(json, 'dob') ? undefined : (new Date(json['dob'])),
        'allergies': !exists(json, 'allergies') ? undefined : json['allergies'],
        'emergencyContact': !exists(json, 'emergencyContact') ? undefined : PersonPrivateDetailsDTOEmergencyContactFromJSON(json['emergencyContact']),
    };
}

export function PersonPrivateDetailsDTOToJSON(value?: PersonPrivateDetailsDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'phone': value.phone,
        'wwc': value.wwc,
        'dob': value.dob === undefined ? undefined : (value.dob.toISOString().substring(0,10)),
        'allergies': value.allergies,
        'emergencyContact': PersonPrivateDetailsDTOEmergencyContactToJSON(value.emergencyContact),
    };
}

