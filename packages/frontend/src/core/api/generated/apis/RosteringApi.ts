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

import * as runtime from "../runtime";
import type {
  CreateShowDTO,
  InvitationDTO,
  ShowDTO,
  ShowSummaryDTO,
} from "../models/index";
import {
  CreateShowDTOFromJSON,
  CreateShowDTOToJSON,
  InvitationDTOFromJSON,
  InvitationDTOToJSON,
  ShowDTOFromJSON,
  ShowDTOToJSON,
  ShowSummaryDTOFromJSON,
  ShowSummaryDTOToJSON,
} from "../models/index";

export interface InvitationsPostRequest {
  showId: number;
  personId?: string;
}

export interface RosteringShowsPostRequest {
  show?: CreateShowDTO;
}

export interface RosteringShowsShowSlugSummaryGetRequest {
  showSlug: string;
}

export interface ShowsShowIdInvitationsGetRequest {
  showId: number;
}

/**
 *
 */
export class RosteringApi extends runtime.BaseAPI {
  /**
   * Get my invitations
   */
  async invitationsGetRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<InvitationDTO>>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/invitations/`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(InvitationDTOFromJSON)
    );
  }

  /**
   * Get my invitations
   */
  async invitationsGet(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<InvitationDTO>> {
    const response = await this.invitationsGetRaw(initOverrides);
    return await response.value();
  }

  /**
   * Invites a person to a show
   */
  async invitationsPostRaw(
    requestParameters: InvitationsPostRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (
      requestParameters.showId === null ||
      requestParameters.showId === undefined
    ) {
      throw new runtime.RequiredError(
        "showId",
        "Required parameter requestParameters.showId was null or undefined when calling invitationsPost."
      );
    }

    const queryParameters: any = {};

    if (requestParameters.showId !== undefined) {
      queryParameters["showId"] = requestParameters.showId;
    }

    if (requestParameters.personId !== undefined) {
      queryParameters["personId"] = requestParameters.personId;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/invitations/`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Invites a person to a show
   */
  async invitationsPost(
    requestParameters: InvitationsPostRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.invitationsPostRaw(requestParameters, initOverrides);
  }

  /**
   * Returns a list of shows
   */
  async rosteringShowsGetRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<ShowDTO>>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/rostering/shows`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(ShowDTOFromJSON)
    );
  }

  /**
   * Returns a list of shows
   */
  async rosteringShowsGet(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<ShowDTO>> {
    const response = await this.rosteringShowsGetRaw(initOverrides);
    return await response.value();
  }

  /**
   * Creates a show
   */
  async rosteringShowsPostRaw(
    requestParameters: RosteringShowsPostRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<ShowDTO>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request(
      {
        path: `/rostering/shows`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: CreateShowDTOToJSON(requestParameters.show),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ShowDTOFromJSON(jsonValue)
    );
  }

  /**
   * Creates a show
   */
  async rosteringShowsPost(
    requestParameters: RosteringShowsPostRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<ShowDTO> {
    const response = await this.rosteringShowsPostRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Return details about a show from its slug
   */
  async rosteringShowsShowSlugSummaryGetRaw(
    requestParameters: RosteringShowsShowSlugSummaryGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<ShowSummaryDTO>> {
    if (
      requestParameters.showSlug === null ||
      requestParameters.showSlug === undefined
    ) {
      throw new runtime.RequiredError(
        "showSlug",
        "Required parameter requestParameters.showSlug was null or undefined when calling rosteringShowsShowSlugSummaryGet."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/rostering/shows/{showSlug}/summary`.replace(
          `{${"showSlug"}}`,
          encodeURIComponent(String(requestParameters.showSlug))
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ShowSummaryDTOFromJSON(jsonValue)
    );
  }

  /**
   * Return details about a show from its slug
   */
  async rosteringShowsShowSlugSummaryGet(
    requestParameters: RosteringShowsShowSlugSummaryGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<ShowSummaryDTO> {
    const response = await this.rosteringShowsShowSlugSummaryGetRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Get invitations for a show
   */
  async showsShowIdInvitationsGetRaw(
    requestParameters: ShowsShowIdInvitationsGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<InvitationDTO>>> {
    if (
      requestParameters.showId === null ||
      requestParameters.showId === undefined
    ) {
      throw new runtime.RequiredError(
        "showId",
        "Required parameter requestParameters.showId was null or undefined when calling showsShowIdInvitationsGet."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/shows/{showId}/invitations`.replace(
          `{${"showId"}}`,
          encodeURIComponent(String(requestParameters.showId))
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(InvitationDTOFromJSON)
    );
  }

  /**
   * Get invitations for a show
   */
  async showsShowIdInvitationsGet(
    requestParameters: ShowsShowIdInvitationsGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<InvitationDTO>> {
    const response = await this.showsShowIdInvitationsGetRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }
}
