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
  CreateEventDTO,
  CreateShowDTO,
  EventDTO,
  PublicScheduleGet200Response,
  ShowDTO,
  ShowSummaryDTO,
} from '../models/index';
import {
    CreateEventDTOFromJSON,
    CreateEventDTOToJSON,
    CreateShowDTOFromJSON,
    CreateShowDTOToJSON,
    EventDTOFromJSON,
    EventDTOToJSON,
    PublicScheduleGet200ResponseFromJSON,
    PublicScheduleGet200ResponseToJSON,
    ShowDTOFromJSON,
    ShowDTOToJSON,
    ShowSummaryDTOFromJSON,
    ShowSummaryDTOToJSON,
} from '../models/index';

export interface EventsGetRequest {
    showId: number;
}

export interface EventsIdPostRequest {
    id: string;
    event?: CreateEventDTO;
}

export interface EventsPostRequest {
    event?: CreateEventDTO;
}

export interface PublicScheduleGetRequest {
    showSlug: string;
}

export interface ShowsPostRequest {
    show?: CreateShowDTO;
}

export interface ShowsShowSlugSummaryGetRequest {
    showSlug: string;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Returns a list of events.
     */
    async eventsGetRaw(requestParameters: EventsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<EventDTO>>> {
        if (requestParameters.showId === null || requestParameters.showId === undefined) {
            throw new runtime.RequiredError('showId','Required parameter requestParameters.showId was null or undefined when calling eventsGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.showId !== undefined) {
            queryParameters['showId'] = requestParameters.showId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/events`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(EventDTOFromJSON));
    }

    /**
     * Returns a list of events.
     */
    async eventsGet(requestParameters: EventsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<EventDTO>> {
        const response = await this.eventsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update event
     */
    async eventsIdPostRaw(requestParameters: EventsIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ShowDTO>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling eventsIdPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/events/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateEventDTOToJSON(requestParameters.event),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ShowDTOFromJSON(jsonValue));
    }

    /**
     * Update event
     */
    async eventsIdPost(requestParameters: EventsIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ShowDTO> {
        const response = await this.eventsIdPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates an event
     */
    async eventsPostRaw(requestParameters: EventsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EventDTO>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/events`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateEventDTOToJSON(requestParameters.event),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EventDTOFromJSON(jsonValue));
    }

    /**
     * Creates an event
     */
    async eventsPost(requestParameters: EventsPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EventDTO> {
        const response = await this.eventsPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Returns a list of events.
     */
    async publicScheduleGetRaw(requestParameters: PublicScheduleGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublicScheduleGet200Response>> {
        if (requestParameters.showSlug === null || requestParameters.showSlug === undefined) {
            throw new runtime.RequiredError('showSlug','Required parameter requestParameters.showSlug was null or undefined when calling publicScheduleGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.showSlug !== undefined) {
            queryParameters['showSlug'] = requestParameters.showSlug;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/public/schedule`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PublicScheduleGet200ResponseFromJSON(jsonValue));
    }

    /**
     * Returns a list of events.
     */
    async publicScheduleGet(requestParameters: PublicScheduleGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublicScheduleGet200Response> {
        const response = await this.publicScheduleGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Returns a list of shows
     */
    async showsGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ShowDTO>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/shows`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ShowDTOFromJSON));
    }

    /**
     * Returns a list of shows
     */
    async showsGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ShowDTO>> {
        const response = await this.showsGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Creates a show
     */
    async showsPostRaw(requestParameters: ShowsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ShowDTO>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/shows`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateShowDTOToJSON(requestParameters.show),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ShowDTOFromJSON(jsonValue));
    }

    /**
     * Creates a show
     */
    async showsPost(requestParameters: ShowsPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ShowDTO> {
        const response = await this.showsPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Return details about a show
     */
    async showsShowSlugSummaryGetRaw(requestParameters: ShowsShowSlugSummaryGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ShowSummaryDTO>> {
        if (requestParameters.showSlug === null || requestParameters.showSlug === undefined) {
            throw new runtime.RequiredError('showSlug','Required parameter requestParameters.showSlug was null or undefined when calling showsShowSlugSummaryGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/shows/{showSlug}/summary`.replace(`{${"showSlug"}}`, encodeURIComponent(String(requestParameters.showSlug))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ShowSummaryDTOFromJSON(jsonValue));
    }

    /**
     * Return details about a show
     */
    async showsShowSlugSummaryGet(requestParameters: ShowsShowSlugSummaryGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ShowSummaryDTO> {
        const response = await this.showsShowSlugSummaryGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Optional extended description in Markdown.
     * Returns a list of users.
     */
    async usersGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Optional extended description in Markdown.
     * Returns a list of users.
     */
    async usersGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.usersGetRaw(initOverrides);
    }

}
