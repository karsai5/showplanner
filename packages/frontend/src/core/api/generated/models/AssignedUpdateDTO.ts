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
 * @interface AssignedUpdateDTO
 */
export interface AssignedUpdateDTO {
    /**
     * 
     * @type {number}
     * @memberof AssignedUpdateDTO
     */
    eventId: number;
    /**
     * 
     * @type {string}
     * @memberof AssignedUpdateDTO
     */
    personId: string;
    /**
     * 
     * @type {number}
     * @memberof AssignedUpdateDTO
     */
    roleId: number;
}

/**
 * Check if a given object implements the AssignedUpdateDTO interface.
 */
export function instanceOfAssignedUpdateDTO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "eventId" in value;
    isInstance = isInstance && "personId" in value;
    isInstance = isInstance && "roleId" in value;

    return isInstance;
}

export function AssignedUpdateDTOFromJSON(json: any): AssignedUpdateDTO {
    return AssignedUpdateDTOFromJSONTyped(json, false);
}

export function AssignedUpdateDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AssignedUpdateDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'eventId': json['eventId'],
        'personId': json['personId'],
        'roleId': json['roleId'],
    };
}

export function AssignedUpdateDTOToJSON(value?: AssignedUpdateDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'eventId': value.eventId,
        'personId': value.personId,
        'roleId': value.roleId,
    };
}

