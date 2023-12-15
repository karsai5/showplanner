/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query GetPermissionsForPerson($personId: ID!) {\n    person(id: $personId) {\n      data {\n        id\n        attributes {\n          user {\n            data {\n              id\n              attributes {\n                permissions\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetPermissionsForPersonDocument,
    "\n  mutation CreateEvent($data: EventInput!) {\n    createEvent(data: $data) {\n      data {\n        id\n        ...EditEvent_EventFragment\n      }\n    }\n  }\n": types.CreateEventDocument,
    "\n  mutation UpdateEvent($id: ID!, $data: EventInput!) {\n    updateEvent(id: $id, data: $data) {\n      data {\n        id\n        ...EditEvent_EventFragment\n      }\n    }\n  }\n": types.UpdateEventDocument,
    "\n  mutation DeleteEvent($id: ID!) {\n    deleteEvent(id: $id) {\n      data {\n        id\n        ...EditEvent_EventFragment\n      }\n    }\n  }\n": types.DeleteEventDocument,
    "\n  query GetEvent($eventId: ID!) {\n    event(id: $eventId) {\n      data {\n        ...EditEvent_EventFragment\n      }\n    }\n  }\n": types.GetEventDocument,
    "\n  query GetEvents($showId: ID!) {\n    events(\n      filters: { show: { id: { eq: $showId } } }\n      pagination: { limit: 100 }\n    ) {\n      data {\n        id\n        attributes {\n          start\n          end\n          name\n          shortnote\n          curtainsUp\n          requiresAvailabilities\n          publishedAt\n          location {\n            name\n            address\n            lat\n            lng\n          }\n          show {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetEventsDocument,
    "\n  fragment EditEvent_EventFragment on EventEntity {\n    id\n    attributes {\n      start\n      end\n      name\n      shortnote\n      curtainsUp\n      requiresAvailabilities\n      publishedAt\n      location {\n        name\n        address\n        lat\n        lng\n      }\n      show {\n        data {\n          id\n          attributes {\n            slug\n          }\n        }\n      }\n    }\n  }\n": types.EditEvent_EventFragmentFragmentDoc,
    "\n  query getPerson($personId: ID!) {\n    person(id: $personId) {\n      data {\n        id\n        attributes {\n          firstname\n          lastname\n          email\n          phone\n          wwc\n          dob\n          rosterNotificationsByEmail\n          rosterNotificationsByPhone\n          allergies\n          emergencyName\n          emergencyPhone\n          emergencyRelationship\n          pronoun\n          avatar {\n            data {\n              attributes {\n                formats\n              }\n            }\n          }\n          documents {\n            data {\n              id\n              attributes {\n                url\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetPersonDocument,
    "\n  mutation CreatePerson($data: PersonInput!) {\n    createPerson(data: $data) {\n      data {\n        id\n      }\n    }\n  }\n": types.CreatePersonDocument,
    "\n  query GetPeople {\n    people {\n      data {\n        id\n        attributes {\n          firstname\n          lastname\n          avatar {\n            data {\n              attributes {\n                formats\n              }\n            }\n          }\n          shows {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetPeopleDocument,
    "\n  query GetPeopleForShow($showId: ID) {\n    people(filters: { shows: { id: { eq: $showId } } }) {\n      data {\n        id\n        attributes {\n          firstname\n          lastname\n          avatar {\n            data {\n              attributes {\n                formats\n              }\n            }\n          }\n          shows {\n            data {\n              id\n            }\n          }\n          user {\n            data {\n              id\n              attributes {\n                permissions\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetPeopleForShowDocument,
    "\n          query GetRoleGroups($showId: ID) {\n            showRoleGroups(filters: { show: { id: { eq: $showId } } }) {\n              data {\n                id\n                attributes {\n                  name\n                  show_roles {\n                    data {\n                      id\n                      attributes {\n                        name\n                        rostered\n                        note\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        ": types.GetRoleGroupsDocument,
    "\n          mutation DeleteRoleGroup($id: ID!) {\n            deleteShowRoleGroup(id: $id) {\n              data {\n                id\n              }\n            }\n          }\n        ": types.DeleteRoleGroupDocument,
    "\n          mutation CreateRoleGroup($data: ShowRoleGroupInput!) {\n            createShowRoleGroup(data: $data) {\n              data {\n                id\n              }\n            }\n          }\n        ": types.CreateRoleGroupDocument,
    "\n          mutation DeleteRole($id: ID!) {\n            deleteShowrole(id: $id) {\n              data {\n                id\n              }\n            }\n          }\n        ": types.DeleteRoleDocument,
    "\n          mutation CreateRole($data: ShowroleInput!) {\n            createShowrole(data: $data) {\n              data {\n                id\n              }\n            }\n          }\n        ": types.CreateRoleDocument,
    "\n          mutation UpdateRole($id: ID!, $data: ShowroleInput!) {\n            updateShowrole(id: $id, data: $data) {\n              data {\n                id\n              }\n            }\n          }\n        ": types.UpdateRoleDocument,
    "\n  query GetAvailabilitiesForPersonAndShow($personId: ID, $showId: ID) {\n    availabilities(\n      filters: {\n        person: { id: { eq: $personId } }\n        event: { show: { id: { eq: $showId } } }\n      }\n    ) {\n      data {\n        id\n        attributes {\n          available\n        }\n        attributes {\n          person {\n            data {\n              id\n            }\n          }\n          event {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetAvailabilitiesForPersonAndShowDocument,
    "\n  query GetAvailabilitiesForShow($showId: ID) {\n    events(filters: { show: { id: { eq: $showId } } }, sort: \"start:asc\") {\n      data {\n        id\n        attributes {\n          start\n          end\n          name\n          curtainsUp\n          availabilities {\n            data {\n              id\n              attributes {\n                available\n                person {\n                  data {\n                    id\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetAvailabilitiesForShowDocument,
    "\n  mutation CreateAvailability($data: AvailabilityInput!) {\n    createAvailability(data: $data) {\n      data {\n        id\n        attributes {\n          available\n        }\n        attributes {\n          person {\n            data {\n              id\n            }\n          }\n          event {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n": types.CreateAvailabilityDocument,
    "\n  mutation UpdateAvailability($id: ID!, $data: AvailabilityInput!) {\n    updateAvailability(id: $id, data: $data) {\n      data {\n        id\n        attributes {\n          available\n        }\n        attributes {\n          person {\n            data {\n              id\n            }\n          }\n          event {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n": types.UpdateAvailabilityDocument,
    "\n  mutation CreateShow($data: ShowInput!) {\n    createShow(data: $data) {\n      data {\n        id\n        ...ShowBox_ShowFragment\n      }\n    }\n  }\n": types.CreateShowDocument,
    "\n  fragment ShowBox_ShowFragment on ShowEntity {\n    id\n    attributes {\n      name\n      company\n      slug\n      bannerimage {\n        data {\n          attributes {\n            formats\n          }\n        }\n      }\n      events(pagination: { limit: 100 }) {\n        data {\n          attributes {\n            start\n            curtainsUp\n          }\n        }\n      }\n    }\n    ...ContactForm_ShowFragment\n  }\n": types.ShowBox_ShowFragmentFragmentDoc,
    "\n  fragment ContactForm_ShowFragment on ShowEntity {\n    id\n    attributes {\n      mainContact {\n        data {\n          id\n          attributes {\n            firstname\n            lastname\n            email\n          }\n        }\n      }\n      name\n      company\n    }\n  }\n": types.ContactForm_ShowFragmentFragmentDoc,
    "\n  query AssignedShowsList($personId: ID!) {\n    shows(filters: { crews: { id: { eq: $personId } } }) {\n      data {\n        id\n        ...ShowBox_ShowFragment\n      }\n    }\n  }\n": types.AssignedShowsListDocument,
    "\n  query UnassignedShowsList {\n    shows {\n      data {\n        id\n        ...ShowBox_ShowFragment\n        attributes {\n          crews {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n": types.UnassignedShowsListDocument,
    "\n  query ShowSummary($slug: String) {\n    shows(filters: { slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          name\n          slug\n          company\n        }\n      }\n    }\n  }\n": types.ShowSummaryDocument,
    "\n  mutation Login($identifier: String!, $password: String!) {\n    login(input: { identifier: $identifier, password: $password }) {\n      jwt\n      user {\n        id\n        email\n        confirmed\n        blocked\n        permissions\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  query getMe($userId: ID!) {\n    people(filters: { user: { id: { eq: $userId } } }) {\n      data {\n        id\n        attributes {\n          firstname\n          lastname\n          email\n          phone\n          avatar {\n            data {\n              attributes {\n                formats\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetMeDocument,
    "\n  query GetPersonForUnlink($id: ID) {\n    person(id: $id) {\n      data {\n        id\n        attributes {\n          shows {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetPersonForUnlinkDocument,
    "\n  mutation UpdatePerson($id: ID!, $data: PersonInput!) {\n    updatePerson(id: $id, data: $data) {\n      data {\n        id\n        attributes {\n          shows {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n": types.UpdatePersonDocument,
    "\n  mutation UpdateUserPermissions($id: ID!, $data: UsersPermissionsUserInput!) {\n    updateUsersPermissionsUser(id: $id, data: $data) {\n      data {\n        id\n        attributes {\n          permissions\n        }\n      }\n    }\n  }\n": types.UpdateUserPermissionsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPermissionsForPerson($personId: ID!) {\n    person(id: $personId) {\n      data {\n        id\n        attributes {\n          user {\n            data {\n              id\n              attributes {\n                permissions\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPermissionsForPerson($personId: ID!) {\n    person(id: $personId) {\n      data {\n        id\n        attributes {\n          user {\n            data {\n              id\n              attributes {\n                permissions\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateEvent($data: EventInput!) {\n    createEvent(data: $data) {\n      data {\n        id\n        ...EditEvent_EventFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateEvent($data: EventInput!) {\n    createEvent(data: $data) {\n      data {\n        id\n        ...EditEvent_EventFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateEvent($id: ID!, $data: EventInput!) {\n    updateEvent(id: $id, data: $data) {\n      data {\n        id\n        ...EditEvent_EventFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateEvent($id: ID!, $data: EventInput!) {\n    updateEvent(id: $id, data: $data) {\n      data {\n        id\n        ...EditEvent_EventFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteEvent($id: ID!) {\n    deleteEvent(id: $id) {\n      data {\n        id\n        ...EditEvent_EventFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteEvent($id: ID!) {\n    deleteEvent(id: $id) {\n      data {\n        id\n        ...EditEvent_EventFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEvent($eventId: ID!) {\n    event(id: $eventId) {\n      data {\n        ...EditEvent_EventFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEvent($eventId: ID!) {\n    event(id: $eventId) {\n      data {\n        ...EditEvent_EventFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEvents($showId: ID!) {\n    events(\n      filters: { show: { id: { eq: $showId } } }\n      pagination: { limit: 100 }\n    ) {\n      data {\n        id\n        attributes {\n          start\n          end\n          name\n          shortnote\n          curtainsUp\n          requiresAvailabilities\n          publishedAt\n          location {\n            name\n            address\n            lat\n            lng\n          }\n          show {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEvents($showId: ID!) {\n    events(\n      filters: { show: { id: { eq: $showId } } }\n      pagination: { limit: 100 }\n    ) {\n      data {\n        id\n        attributes {\n          start\n          end\n          name\n          shortnote\n          curtainsUp\n          requiresAvailabilities\n          publishedAt\n          location {\n            name\n            address\n            lat\n            lng\n          }\n          show {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment EditEvent_EventFragment on EventEntity {\n    id\n    attributes {\n      start\n      end\n      name\n      shortnote\n      curtainsUp\n      requiresAvailabilities\n      publishedAt\n      location {\n        name\n        address\n        lat\n        lng\n      }\n      show {\n        data {\n          id\n          attributes {\n            slug\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment EditEvent_EventFragment on EventEntity {\n    id\n    attributes {\n      start\n      end\n      name\n      shortnote\n      curtainsUp\n      requiresAvailabilities\n      publishedAt\n      location {\n        name\n        address\n        lat\n        lng\n      }\n      show {\n        data {\n          id\n          attributes {\n            slug\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPerson($personId: ID!) {\n    person(id: $personId) {\n      data {\n        id\n        attributes {\n          firstname\n          lastname\n          email\n          phone\n          wwc\n          dob\n          rosterNotificationsByEmail\n          rosterNotificationsByPhone\n          allergies\n          emergencyName\n          emergencyPhone\n          emergencyRelationship\n          pronoun\n          avatar {\n            data {\n              attributes {\n                formats\n              }\n            }\n          }\n          documents {\n            data {\n              id\n              attributes {\n                url\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPerson($personId: ID!) {\n    person(id: $personId) {\n      data {\n        id\n        attributes {\n          firstname\n          lastname\n          email\n          phone\n          wwc\n          dob\n          rosterNotificationsByEmail\n          rosterNotificationsByPhone\n          allergies\n          emergencyName\n          emergencyPhone\n          emergencyRelationship\n          pronoun\n          avatar {\n            data {\n              attributes {\n                formats\n              }\n            }\n          }\n          documents {\n            data {\n              id\n              attributes {\n                url\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePerson($data: PersonInput!) {\n    createPerson(data: $data) {\n      data {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePerson($data: PersonInput!) {\n    createPerson(data: $data) {\n      data {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPeople {\n    people {\n      data {\n        id\n        attributes {\n          firstname\n          lastname\n          avatar {\n            data {\n              attributes {\n                formats\n              }\n            }\n          }\n          shows {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPeople {\n    people {\n      data {\n        id\n        attributes {\n          firstname\n          lastname\n          avatar {\n            data {\n              attributes {\n                formats\n              }\n            }\n          }\n          shows {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPeopleForShow($showId: ID) {\n    people(filters: { shows: { id: { eq: $showId } } }) {\n      data {\n        id\n        attributes {\n          firstname\n          lastname\n          avatar {\n            data {\n              attributes {\n                formats\n              }\n            }\n          }\n          shows {\n            data {\n              id\n            }\n          }\n          user {\n            data {\n              id\n              attributes {\n                permissions\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPeopleForShow($showId: ID) {\n    people(filters: { shows: { id: { eq: $showId } } }) {\n      data {\n        id\n        attributes {\n          firstname\n          lastname\n          avatar {\n            data {\n              attributes {\n                formats\n              }\n            }\n          }\n          shows {\n            data {\n              id\n            }\n          }\n          user {\n            data {\n              id\n              attributes {\n                permissions\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          query GetRoleGroups($showId: ID) {\n            showRoleGroups(filters: { show: { id: { eq: $showId } } }) {\n              data {\n                id\n                attributes {\n                  name\n                  show_roles {\n                    data {\n                      id\n                      attributes {\n                        name\n                        rostered\n                        note\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        "): (typeof documents)["\n          query GetRoleGroups($showId: ID) {\n            showRoleGroups(filters: { show: { id: { eq: $showId } } }) {\n              data {\n                id\n                attributes {\n                  name\n                  show_roles {\n                    data {\n                      id\n                      attributes {\n                        name\n                        rostered\n                        note\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          mutation DeleteRoleGroup($id: ID!) {\n            deleteShowRoleGroup(id: $id) {\n              data {\n                id\n              }\n            }\n          }\n        "): (typeof documents)["\n          mutation DeleteRoleGroup($id: ID!) {\n            deleteShowRoleGroup(id: $id) {\n              data {\n                id\n              }\n            }\n          }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          mutation CreateRoleGroup($data: ShowRoleGroupInput!) {\n            createShowRoleGroup(data: $data) {\n              data {\n                id\n              }\n            }\n          }\n        "): (typeof documents)["\n          mutation CreateRoleGroup($data: ShowRoleGroupInput!) {\n            createShowRoleGroup(data: $data) {\n              data {\n                id\n              }\n            }\n          }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          mutation DeleteRole($id: ID!) {\n            deleteShowrole(id: $id) {\n              data {\n                id\n              }\n            }\n          }\n        "): (typeof documents)["\n          mutation DeleteRole($id: ID!) {\n            deleteShowrole(id: $id) {\n              data {\n                id\n              }\n            }\n          }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          mutation CreateRole($data: ShowroleInput!) {\n            createShowrole(data: $data) {\n              data {\n                id\n              }\n            }\n          }\n        "): (typeof documents)["\n          mutation CreateRole($data: ShowroleInput!) {\n            createShowrole(data: $data) {\n              data {\n                id\n              }\n            }\n          }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          mutation UpdateRole($id: ID!, $data: ShowroleInput!) {\n            updateShowrole(id: $id, data: $data) {\n              data {\n                id\n              }\n            }\n          }\n        "): (typeof documents)["\n          mutation UpdateRole($id: ID!, $data: ShowroleInput!) {\n            updateShowrole(id: $id, data: $data) {\n              data {\n                id\n              }\n            }\n          }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAvailabilitiesForPersonAndShow($personId: ID, $showId: ID) {\n    availabilities(\n      filters: {\n        person: { id: { eq: $personId } }\n        event: { show: { id: { eq: $showId } } }\n      }\n    ) {\n      data {\n        id\n        attributes {\n          available\n        }\n        attributes {\n          person {\n            data {\n              id\n            }\n          }\n          event {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAvailabilitiesForPersonAndShow($personId: ID, $showId: ID) {\n    availabilities(\n      filters: {\n        person: { id: { eq: $personId } }\n        event: { show: { id: { eq: $showId } } }\n      }\n    ) {\n      data {\n        id\n        attributes {\n          available\n        }\n        attributes {\n          person {\n            data {\n              id\n            }\n          }\n          event {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAvailabilitiesForShow($showId: ID) {\n    events(filters: { show: { id: { eq: $showId } } }, sort: \"start:asc\") {\n      data {\n        id\n        attributes {\n          start\n          end\n          name\n          curtainsUp\n          availabilities {\n            data {\n              id\n              attributes {\n                available\n                person {\n                  data {\n                    id\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAvailabilitiesForShow($showId: ID) {\n    events(filters: { show: { id: { eq: $showId } } }, sort: \"start:asc\") {\n      data {\n        id\n        attributes {\n          start\n          end\n          name\n          curtainsUp\n          availabilities {\n            data {\n              id\n              attributes {\n                available\n                person {\n                  data {\n                    id\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAvailability($data: AvailabilityInput!) {\n    createAvailability(data: $data) {\n      data {\n        id\n        attributes {\n          available\n        }\n        attributes {\n          person {\n            data {\n              id\n            }\n          }\n          event {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAvailability($data: AvailabilityInput!) {\n    createAvailability(data: $data) {\n      data {\n        id\n        attributes {\n          available\n        }\n        attributes {\n          person {\n            data {\n              id\n            }\n          }\n          event {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateAvailability($id: ID!, $data: AvailabilityInput!) {\n    updateAvailability(id: $id, data: $data) {\n      data {\n        id\n        attributes {\n          available\n        }\n        attributes {\n          person {\n            data {\n              id\n            }\n          }\n          event {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateAvailability($id: ID!, $data: AvailabilityInput!) {\n    updateAvailability(id: $id, data: $data) {\n      data {\n        id\n        attributes {\n          available\n        }\n        attributes {\n          person {\n            data {\n              id\n            }\n          }\n          event {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateShow($data: ShowInput!) {\n    createShow(data: $data) {\n      data {\n        id\n        ...ShowBox_ShowFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateShow($data: ShowInput!) {\n    createShow(data: $data) {\n      data {\n        id\n        ...ShowBox_ShowFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ShowBox_ShowFragment on ShowEntity {\n    id\n    attributes {\n      name\n      company\n      slug\n      bannerimage {\n        data {\n          attributes {\n            formats\n          }\n        }\n      }\n      events(pagination: { limit: 100 }) {\n        data {\n          attributes {\n            start\n            curtainsUp\n          }\n        }\n      }\n    }\n    ...ContactForm_ShowFragment\n  }\n"): (typeof documents)["\n  fragment ShowBox_ShowFragment on ShowEntity {\n    id\n    attributes {\n      name\n      company\n      slug\n      bannerimage {\n        data {\n          attributes {\n            formats\n          }\n        }\n      }\n      events(pagination: { limit: 100 }) {\n        data {\n          attributes {\n            start\n            curtainsUp\n          }\n        }\n      }\n    }\n    ...ContactForm_ShowFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ContactForm_ShowFragment on ShowEntity {\n    id\n    attributes {\n      mainContact {\n        data {\n          id\n          attributes {\n            firstname\n            lastname\n            email\n          }\n        }\n      }\n      name\n      company\n    }\n  }\n"): (typeof documents)["\n  fragment ContactForm_ShowFragment on ShowEntity {\n    id\n    attributes {\n      mainContact {\n        data {\n          id\n          attributes {\n            firstname\n            lastname\n            email\n          }\n        }\n      }\n      name\n      company\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AssignedShowsList($personId: ID!) {\n    shows(filters: { crews: { id: { eq: $personId } } }) {\n      data {\n        id\n        ...ShowBox_ShowFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query AssignedShowsList($personId: ID!) {\n    shows(filters: { crews: { id: { eq: $personId } } }) {\n      data {\n        id\n        ...ShowBox_ShowFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UnassignedShowsList {\n    shows {\n      data {\n        id\n        ...ShowBox_ShowFragment\n        attributes {\n          crews {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query UnassignedShowsList {\n    shows {\n      data {\n        id\n        ...ShowBox_ShowFragment\n        attributes {\n          crews {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ShowSummary($slug: String) {\n    shows(filters: { slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          name\n          slug\n          company\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ShowSummary($slug: String) {\n    shows(filters: { slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          name\n          slug\n          company\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($identifier: String!, $password: String!) {\n    login(input: { identifier: $identifier, password: $password }) {\n      jwt\n      user {\n        id\n        email\n        confirmed\n        blocked\n        permissions\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($identifier: String!, $password: String!) {\n    login(input: { identifier: $identifier, password: $password }) {\n      jwt\n      user {\n        id\n        email\n        confirmed\n        blocked\n        permissions\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getMe($userId: ID!) {\n    people(filters: { user: { id: { eq: $userId } } }) {\n      data {\n        id\n        attributes {\n          firstname\n          lastname\n          email\n          phone\n          avatar {\n            data {\n              attributes {\n                formats\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMe($userId: ID!) {\n    people(filters: { user: { id: { eq: $userId } } }) {\n      data {\n        id\n        attributes {\n          firstname\n          lastname\n          email\n          phone\n          avatar {\n            data {\n              attributes {\n                formats\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPersonForUnlink($id: ID) {\n    person(id: $id) {\n      data {\n        id\n        attributes {\n          shows {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPersonForUnlink($id: ID) {\n    person(id: $id) {\n      data {\n        id\n        attributes {\n          shows {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePerson($id: ID!, $data: PersonInput!) {\n    updatePerson(id: $id, data: $data) {\n      data {\n        id\n        attributes {\n          shows {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePerson($id: ID!, $data: PersonInput!) {\n    updatePerson(id: $id, data: $data) {\n      data {\n        id\n        attributes {\n          shows {\n            data {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUserPermissions($id: ID!, $data: UsersPermissionsUserInput!) {\n    updateUsersPermissionsUser(id: $id, data: $data) {\n      data {\n        id\n        attributes {\n          permissions\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserPermissions($id: ID!, $data: UsersPermissionsUserInput!) {\n    updateUsersPermissionsUser(id: $id, data: $data) {\n      data {\n        id\n        attributes {\n          permissions\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;