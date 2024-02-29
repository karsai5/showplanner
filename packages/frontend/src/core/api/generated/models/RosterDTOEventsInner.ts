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
import type { RosterAssignedDTO } from './RosterAssignedDTO';
import {
    RosterAssignedDTOFromJSON,
    RosterAssignedDTOFromJSONTyped,
    RosterAssignedDTOToJSON,
} from './RosterAssignedDTO';

/**
 * 
 * @export
 * @interface RosterDTOEventsInner
 */
export interface RosterDTOEventsInner {
    /**
     * 
     * @type {number}
     * @memberof RosterDTOEventsInner
     */
    id: number;
    /**
     * 
     * @type {number}
     * @memberof RosterDTOEventsInner
     */
    showId?: number;
    /**
     * 
     * @type {Date}
     * @memberof RosterDTOEventsInner
     */
    start: Date;
    /**
     * 
     * @type {string}
     * @memberof RosterDTOEventsInner
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RosterDTOEventsInner
     */
    nameRaw?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RosterDTOEventsInner
     */
    shortnote?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RosterDTOEventsInner
     */
    address?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof RosterDTOEventsInner
     */
    curtainsUp?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof RosterDTOEventsInner
     */
    end?: Date | null;
    /**
     * 
     * @type {Array<RosterAssignedDTO>}
     * @memberof RosterDTOEventsInner
     */
    assignments?: Array<RosterAssignedDTO> | null;
}

/**
 * Check if a given object implements the RosterDTOEventsInner interface.
 */
export function instanceOfRosterDTOEventsInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "start" in value;

    return isInstance;
}

export function RosterDTOEventsInnerFromJSON(json: any): RosterDTOEventsInner {
    return RosterDTOEventsInnerFromJSONTyped(json, false);
}

export function RosterDTOEventsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): RosterDTOEventsInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'showId': !exists(json, 'showId') ? undefined : json['showId'],
        'start': (new Date(json['start'])),
        'name': !exists(json, 'name') ? undefined : json['name'],
        'nameRaw': !exists(json, 'nameRaw') ? undefined : json['nameRaw'],
        'shortnote': !exists(json, 'shortnote') ? undefined : json['shortnote'],
        'address': !exists(json, 'address') ? undefined : json['address'],
        'curtainsUp': !exists(json, 'curtainsUp') ? undefined : (json['curtainsUp'] === null ? null : new Date(json['curtainsUp'])),
        'end': !exists(json, 'end') ? undefined : (json['end'] === null ? null : new Date(json['end'])),
        'assignments': !exists(json, 'assignments') ? undefined : (json['assignments'] === null ? null : (json['assignments'] as Array<any>).map(RosterAssignedDTOFromJSON)),
    };
}

export function RosterDTOEventsInnerToJSON(value?: RosterDTOEventsInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'showId': value.showId,
        'start': (value.start.toISOString()),
        'name': value.name,
        'nameRaw': value.nameRaw,
        'shortnote': value.shortnote,
        'address': value.address,
        'curtainsUp': value.curtainsUp === undefined ? undefined : (value.curtainsUp === null ? null : value.curtainsUp.toISOString()),
        'end': value.end === undefined ? undefined : (value.end === null ? null : value.end.toISOString()),
        'assignments': value.assignments === undefined ? undefined : (value.assignments === null ? null : (value.assignments as Array<any>).map(RosterAssignedDTOToJSON)),
    };
}

