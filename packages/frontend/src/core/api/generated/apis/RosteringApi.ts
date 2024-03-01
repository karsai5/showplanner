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


import * as runtime from '../runtime';
import type {
  AssignedDTO,
  AssignedUpdateDTO,
} from '../models/index';
import {
    AssignedDTOFromJSON,
    AssignedDTOToJSON,
    AssignedUpdateDTOFromJSON,
    AssignedUpdateDTOToJSON,
} from '../models/index';

export interface AssignmentIdDeleteRequest {
    id: number;
}

export interface AssignmentIdPutRequest {
    id: number;
    assignment?: AssignedUpdateDTO;
}

export interface AssignmentPostRequest {
    assignment?: AssignedUpdateDTO;
}

/**
 * 
 */
export class RosteringApi extends runtime.BaseAPI {

    /**
     * Deletes an assignment
     */
    async assignmentIdDeleteRaw(requestParameters: AssignmentIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling assignmentIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/assignment/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes an assignment
     */
    async assignmentIdDelete(requestParameters: AssignmentIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.assignmentIdDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * Assign a person to a role for an event
     */
    async assignmentIdPutRaw(requestParameters: AssignmentIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AssignedDTO>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling assignmentIdPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/assignment/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: AssignedUpdateDTOToJSON(requestParameters.assignment),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AssignedDTOFromJSON(jsonValue));
    }

    /**
     * Assign a person to a role for an event
     */
    async assignmentIdPut(requestParameters: AssignmentIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AssignedDTO> {
        const response = await this.assignmentIdPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Assign a person to a role for an event
     */
    async assignmentPostRaw(requestParameters: AssignmentPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AssignedDTO>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/assignment`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AssignedUpdateDTOToJSON(requestParameters.assignment),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AssignedDTOFromJSON(jsonValue));
    }

    /**
     * Assign a person to a role for an event
     */
    async assignmentPost(requestParameters: AssignmentPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AssignedDTO> {
        const response = await this.assignmentPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
