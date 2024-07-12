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
import type { PersonSummaryDTO } from './PersonSummaryDTO';
import {
    PersonSummaryDTOFromJSON,
    PersonSummaryDTOFromJSONTyped,
    PersonSummaryDTOToJSON,
} from './PersonSummaryDTO';
import type { ShowDTO } from './ShowDTO';
import {
    ShowDTOFromJSON,
    ShowDTOFromJSONTyped,
    ShowDTOToJSON,
} from './ShowDTO';

/**
 * 
 * @export
 * @interface InvitationDTO
 */
export interface InvitationDTO {
    /**
     * 
     * @type {string}
     * @memberof InvitationDTO
     */
    id?: string;
    /**
     * 
     * @type {PersonSummaryDTO}
     * @memberof InvitationDTO
     */
    person?: PersonSummaryDTO;
    /**
     * 
     * @type {string}
     * @memberof InvitationDTO
     */
    email?: string | null;
    /**
     * 
     * @type {ShowDTO}
     * @memberof InvitationDTO
     */
    show?: ShowDTO;
    /**
     * 
     * @type {Date}
     * @memberof InvitationDTO
     */
    dateCreated?: Date;
}

/**
 * Check if a given object implements the InvitationDTO interface.
 */
export function instanceOfInvitationDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function InvitationDTOFromJSON(json: any): InvitationDTO {
    return InvitationDTOFromJSONTyped(json, false);
}

export function InvitationDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): InvitationDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'person': !exists(json, 'person') ? undefined : PersonSummaryDTOFromJSON(json['person']),
        'email': !exists(json, 'email') ? undefined : json['email'],
        'show': !exists(json, 'show') ? undefined : ShowDTOFromJSON(json['show']),
        'dateCreated': !exists(json, 'dateCreated') ? undefined : (new Date(json['dateCreated'])),
    };
}

export function InvitationDTOToJSON(value?: InvitationDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'person': PersonSummaryDTOToJSON(value.person),
        'email': value.email,
        'show': ShowDTOToJSON(value.show),
        'dateCreated': value.dateCreated === undefined ? undefined : (value.dateCreated.toISOString()),
    };
}

