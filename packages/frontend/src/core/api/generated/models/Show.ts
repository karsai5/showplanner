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
 * @interface Show
 */
export interface Show {
    /**
     * 
     * @type {string}
     * @memberof Show
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Show
     */
    company: string;
    /**
     * 
     * @type {string}
     * @memberof Show
     */
    slug: string;
}

/**
 * Check if a given object implements the Show interface.
 */
export function instanceOfShow(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "company" in value;
    isInstance = isInstance && "slug" in value;

    return isInstance;
}

export function ShowFromJSON(json: any): Show {
    return ShowFromJSONTyped(json, false);
}

export function ShowFromJSONTyped(json: any, ignoreDiscriminator: boolean): Show {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'company': json['company'],
        'slug': json['slug'],
    };
}

export function ShowToJSON(value?: Show | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'company': value.company,
        'slug': value.slug,
    };
}

