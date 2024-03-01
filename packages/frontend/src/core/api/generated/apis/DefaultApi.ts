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
  ArrayOfPersonSummaryDTO,
  AssignedDTO,
  AssignedUpdateDTO,
  AvailabilitiesDTO,
  AvailabilityDTO,
  CreateEventDTO,
  CreateShowDTO,
  EventDTO,
  HealthCheck,
  MeDetailsDTO,
  PersonUpdateDTO,
  PublicScheduleGet200Response,
  RoleDTO,
  RoleUpdateDTO,
  RosterDTO,
  ScheduleEventDTO,
  ShowDTO,
  ShowSummaryDTO,
} from '../models/index';
import {
    ArrayOfPersonSummaryDTOFromJSON,
    ArrayOfPersonSummaryDTOToJSON,
    AssignedDTOFromJSON,
    AssignedDTOToJSON,
    AssignedUpdateDTOFromJSON,
    AssignedUpdateDTOToJSON,
    AvailabilitiesDTOFromJSON,
    AvailabilitiesDTOToJSON,
    AvailabilityDTOFromJSON,
    AvailabilityDTOToJSON,
    CreateEventDTOFromJSON,
    CreateEventDTOToJSON,
    CreateShowDTOFromJSON,
    CreateShowDTOToJSON,
    EventDTOFromJSON,
    EventDTOToJSON,
    HealthCheckFromJSON,
    HealthCheckToJSON,
    MeDetailsDTOFromJSON,
    MeDetailsDTOToJSON,
    PersonUpdateDTOFromJSON,
    PersonUpdateDTOToJSON,
    PublicScheduleGet200ResponseFromJSON,
    PublicScheduleGet200ResponseToJSON,
    RoleDTOFromJSON,
    RoleDTOToJSON,
    RoleUpdateDTOFromJSON,
    RoleUpdateDTOToJSON,
    RosterDTOFromJSON,
    RosterDTOToJSON,
    ScheduleEventDTOFromJSON,
    ScheduleEventDTOToJSON,
    ShowDTOFromJSON,
    ShowDTOToJSON,
    ShowSummaryDTOFromJSON,
    ShowSummaryDTOToJSON,
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

export interface AvailabilitiesGetRequest {
    showId: number;
}

export interface AvailabilitiesPostRequest {
    availability?: AvailabilityDTO;
}

export interface EventsIdDeleteRequest {
    id: number;
}

export interface EventsIdPostRequest {
    id: number;
    event?: CreateEventDTO;
}

export interface EventsPostRequest {
    event?: CreateEventDTO;
}

export interface MePostRequest {
    personalDetails?: PersonUpdateDTO;
}

export interface PersonnelAssignPostRequest {
    showId: number;
    personId: string;
}

export interface PersonnelAssignableGetRequest {
    showId: number;
}

export interface PersonnelAssignedGetRequest {
    showId: number;
}

export interface PublicCalendarIdGetRequest {
    id: string;
}

export interface PublicScheduleGetRequest {
    showSlug: string;
}

export interface RolesGetRequest {
    showId: number;
}

export interface RolesIdDeleteRequest {
    id: number;
}

export interface RolesIdPutRequest {
    id: number;
    roleDetails?: RoleUpdateDTO;
}

export interface RolesPostRequest {
    roleDetails?: RoleUpdateDTO;
}

export interface RosterGetRequest {
    showId: number;
}

export interface ScheduleGetRequest {
    showId: number;
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
     * Assign a person to a role for an event
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
     * Assign a person to a role for an event
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

    /**
     * Returns availabilities for all the members of a show
     */
    async availabilitiesGetRaw(requestParameters: AvailabilitiesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AvailabilitiesDTO>> {
        if (requestParameters.showId === null || requestParameters.showId === undefined) {
            throw new runtime.RequiredError('showId','Required parameter requestParameters.showId was null or undefined when calling availabilitiesGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.showId !== undefined) {
            queryParameters['showId'] = requestParameters.showId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/availabilities`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AvailabilitiesDTOFromJSON(jsonValue));
    }

    /**
     * Returns availabilities for all the members of a show
     */
    async availabilitiesGet(requestParameters: AvailabilitiesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AvailabilitiesDTO> {
        const response = await this.availabilitiesGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create or update availability
     */
    async availabilitiesPostRaw(requestParameters: AvailabilitiesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AvailabilityDTO>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/availabilities`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AvailabilityDTOToJSON(requestParameters.availability),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AvailabilityDTOFromJSON(jsonValue));
    }

    /**
     * Create or update availability
     */
    async availabilitiesPost(requestParameters: AvailabilitiesPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AvailabilityDTO> {
        const response = await this.availabilitiesPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete\'s an event
     */
    async eventsIdDeleteRaw(requestParameters: EventsIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling eventsIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/events/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete\'s an event
     */
    async eventsIdDelete(requestParameters: EventsIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.eventsIdDeleteRaw(requestParameters, initOverrides);
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
     */
    async meGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MeDetailsDTO>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/me`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MeDetailsDTOFromJSON(jsonValue));
    }

    /**
     */
    async meGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MeDetailsDTO> {
        const response = await this.meGetRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async mePostRaw(requestParameters: MePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/me`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PersonUpdateDTOToJSON(requestParameters.personalDetails),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async mePost(requestParameters: MePostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.mePostRaw(requestParameters, initOverrides);
    }

    /**
     * Adds a person to a show
     */
    async personnelAssignPostRaw(requestParameters: PersonnelAssignPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.showId === null || requestParameters.showId === undefined) {
            throw new runtime.RequiredError('showId','Required parameter requestParameters.showId was null or undefined when calling personnelAssignPost.');
        }

        if (requestParameters.personId === null || requestParameters.personId === undefined) {
            throw new runtime.RequiredError('personId','Required parameter requestParameters.personId was null or undefined when calling personnelAssignPost.');
        }

        const queryParameters: any = {};

        if (requestParameters.showId !== undefined) {
            queryParameters['showId'] = requestParameters.showId;
        }

        if (requestParameters.personId !== undefined) {
            queryParameters['personId'] = requestParameters.personId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/personnel/assign`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Adds a person to a show
     */
    async personnelAssignPost(requestParameters: PersonnelAssignPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.personnelAssignPostRaw(requestParameters, initOverrides);
    }

    /**
     * Returns people for a show
     */
    async personnelAssignableGetRaw(requestParameters: PersonnelAssignableGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ArrayOfPersonSummaryDTO>> {
        if (requestParameters.showId === null || requestParameters.showId === undefined) {
            throw new runtime.RequiredError('showId','Required parameter requestParameters.showId was null or undefined when calling personnelAssignableGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.showId !== undefined) {
            queryParameters['showId'] = requestParameters.showId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/personnel/assignable`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ArrayOfPersonSummaryDTOFromJSON(jsonValue));
    }

    /**
     * Returns people for a show
     */
    async personnelAssignableGet(requestParameters: PersonnelAssignableGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ArrayOfPersonSummaryDTO> {
        const response = await this.personnelAssignableGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Returns people for a show
     */
    async personnelAssignedGetRaw(requestParameters: PersonnelAssignedGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ArrayOfPersonSummaryDTO>> {
        if (requestParameters.showId === null || requestParameters.showId === undefined) {
            throw new runtime.RequiredError('showId','Required parameter requestParameters.showId was null or undefined when calling personnelAssignedGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.showId !== undefined) {
            queryParameters['showId'] = requestParameters.showId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/personnel/assigned`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ArrayOfPersonSummaryDTOFromJSON(jsonValue));
    }

    /**
     * Returns people for a show
     */
    async personnelAssignedGet(requestParameters: PersonnelAssignedGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ArrayOfPersonSummaryDTO> {
        const response = await this.personnelAssignedGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Healthcheck endpoint
     * Healthcheck
     */
    async publicCalendarIdGetRaw(requestParameters: PublicCalendarIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling publicCalendarIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/public/calendar/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Healthcheck endpoint
     * Healthcheck
     */
    async publicCalendarIdGet(requestParameters: PublicCalendarIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.publicCalendarIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Healthcheck endpoint
     * Healthcheck
     */
    async publicHealthGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<HealthCheck>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/public/health`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HealthCheckFromJSON(jsonValue));
    }

    /**
     * Healthcheck endpoint
     * Healthcheck
     */
    async publicHealthGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<HealthCheck> {
        const response = await this.publicHealthGetRaw(initOverrides);
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
     * Returns a list of roles
     */
    async rolesGetRaw(requestParameters: RolesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<RoleDTO>>> {
        if (requestParameters.showId === null || requestParameters.showId === undefined) {
            throw new runtime.RequiredError('showId','Required parameter requestParameters.showId was null or undefined when calling rolesGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.showId !== undefined) {
            queryParameters['showId'] = requestParameters.showId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/roles`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(RoleDTOFromJSON));
    }

    /**
     * Returns a list of roles
     */
    async rolesGet(requestParameters: RolesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<RoleDTO>> {
        const response = await this.rolesGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Deletes a role
     */
    async rolesIdDeleteRaw(requestParameters: RolesIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling rolesIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/roles/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes a role
     */
    async rolesIdDelete(requestParameters: RolesIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.rolesIdDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * Updates a role
     */
    async rolesIdPutRaw(requestParameters: RolesIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RoleDTO>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling rolesIdPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/roles/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: RoleUpdateDTOToJSON(requestParameters.roleDetails),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RoleDTOFromJSON(jsonValue));
    }

    /**
     * Updates a role
     */
    async rolesIdPut(requestParameters: RolesIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RoleDTO> {
        const response = await this.rolesIdPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates a new role
     */
    async rolesPostRaw(requestParameters: RolesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RoleDTO>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/roles`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RoleUpdateDTOToJSON(requestParameters.roleDetails),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RoleDTOFromJSON(jsonValue));
    }

    /**
     * Creates a new role
     */
    async rolesPost(requestParameters: RolesPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RoleDTO> {
        const response = await this.rolesPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Returns roster for a show
     */
    async rosterGetRaw(requestParameters: RosterGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RosterDTO>> {
        if (requestParameters.showId === null || requestParameters.showId === undefined) {
            throw new runtime.RequiredError('showId','Required parameter requestParameters.showId was null or undefined when calling rosterGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.showId !== undefined) {
            queryParameters['showId'] = requestParameters.showId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/roster`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RosterDTOFromJSON(jsonValue));
    }

    /**
     * Returns roster for a show
     */
    async rosterGet(requestParameters: RosterGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RosterDTO> {
        const response = await this.rosterGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Returns a list of events.
     */
    async scheduleGetRaw(requestParameters: ScheduleGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ScheduleEventDTO>>> {
        if (requestParameters.showId === null || requestParameters.showId === undefined) {
            throw new runtime.RequiredError('showId','Required parameter requestParameters.showId was null or undefined when calling scheduleGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.showId !== undefined) {
            queryParameters['showId'] = requestParameters.showId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/schedule`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ScheduleEventDTOFromJSON));
    }

    /**
     * Returns a list of events.
     */
    async scheduleGet(requestParameters: ScheduleGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ScheduleEventDTO>> {
        const response = await this.scheduleGetRaw(requestParameters, initOverrides);
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

}
