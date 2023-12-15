/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A time string with format HH:mm:ss.SSS */
  Time: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type ApplicationEvent = {
  __typename?: "ApplicationEvent";
  createdAt?: Maybe<Scalars["DateTime"]>;
  data?: Maybe<Scalars["JSON"]>;
  events?: Maybe<EventRelationResponseCollection>;
  label?: Maybe<Scalars["String"]>;
  people?: Maybe<PersonRelationResponseCollection>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  show?: Maybe<ShowEntityResponse>;
  showroles?: Maybe<ShowroleRelationResponseCollection>;
  shows?: Maybe<ShowRelationResponseCollection>;
  timestamp?: Maybe<Scalars["DateTime"]>;
  type?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ApplicationEventEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ApplicationEventPeopleArgs = {
  filters?: InputMaybe<PersonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ApplicationEventShowrolesArgs = {
  filters?: InputMaybe<ShowroleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ApplicationEventShowsArgs = {
  filters?: InputMaybe<ShowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ApplicationEventEntity = {
  __typename?: "ApplicationEventEntity";
  attributes?: Maybe<ApplicationEvent>;
  id?: Maybe<Scalars["ID"]>;
};

export type ApplicationEventEntityResponse = {
  __typename?: "ApplicationEventEntityResponse";
  data?: Maybe<ApplicationEventEntity>;
};

export type ApplicationEventEntityResponseCollection = {
  __typename?: "ApplicationEventEntityResponseCollection";
  data: Array<ApplicationEventEntity>;
  meta: ResponseCollectionMeta;
};

export type ApplicationEventFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ApplicationEventFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  data?: InputMaybe<JsonFilterInput>;
  events?: InputMaybe<EventFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ApplicationEventFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ApplicationEventFiltersInput>>>;
  people?: InputMaybe<PersonFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  show?: InputMaybe<ShowFiltersInput>;
  showroles?: InputMaybe<ShowroleFiltersInput>;
  shows?: InputMaybe<ShowFiltersInput>;
  timestamp?: InputMaybe<DateTimeFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ApplicationEventInput = {
  data?: InputMaybe<Scalars["JSON"]>;
  events?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  label?: InputMaybe<Scalars["String"]>;
  people?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
  show?: InputMaybe<Scalars["ID"]>;
  showroles?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  shows?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  timestamp?: InputMaybe<Scalars["DateTime"]>;
  type?: InputMaybe<Scalars["String"]>;
};

export type Availability = {
  __typename?: "Availability";
  available?: Maybe<Scalars["Boolean"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  event?: Maybe<EventEntityResponse>;
  person?: Maybe<PersonEntityResponse>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type AvailabilityEntity = {
  __typename?: "AvailabilityEntity";
  attributes?: Maybe<Availability>;
  id?: Maybe<Scalars["ID"]>;
};

export type AvailabilityEntityResponse = {
  __typename?: "AvailabilityEntityResponse";
  data?: Maybe<AvailabilityEntity>;
};

export type AvailabilityEntityResponseCollection = {
  __typename?: "AvailabilityEntityResponseCollection";
  data: Array<AvailabilityEntity>;
  meta: ResponseCollectionMeta;
};

export type AvailabilityFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AvailabilityFiltersInput>>>;
  available?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  event?: InputMaybe<EventFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<AvailabilityFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AvailabilityFiltersInput>>>;
  person?: InputMaybe<PersonFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AvailabilityInput = {
  available?: InputMaybe<Scalars["Boolean"]>;
  event?: InputMaybe<Scalars["ID"]>;
  person?: InputMaybe<Scalars["ID"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type AvailabilityRelationResponseCollection = {
  __typename?: "AvailabilityRelationResponseCollection";
  data: Array<AvailabilityEntity>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  contains?: InputMaybe<Scalars["Boolean"]>;
  containsi?: InputMaybe<Scalars["Boolean"]>;
  endsWith?: InputMaybe<Scalars["Boolean"]>;
  eq?: InputMaybe<Scalars["Boolean"]>;
  eqi?: InputMaybe<Scalars["Boolean"]>;
  gt?: InputMaybe<Scalars["Boolean"]>;
  gte?: InputMaybe<Scalars["Boolean"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  lt?: InputMaybe<Scalars["Boolean"]>;
  lte?: InputMaybe<Scalars["Boolean"]>;
  ne?: InputMaybe<Scalars["Boolean"]>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars["Boolean"]>;
  notContainsi?: InputMaybe<Scalars["Boolean"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  startsWith?: InputMaybe<Scalars["Boolean"]>;
};

export type ComponentTestLocation = {
  __typename?: "ComponentTestLocation";
  address?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  lat?: Maybe<Scalars["Float"]>;
  lng?: Maybe<Scalars["Float"]>;
  name?: Maybe<Scalars["String"]>;
};

export type ComponentTestLocationFiltersInput = {
  address?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentTestLocationFiltersInput>>>;
  lat?: InputMaybe<FloatFilterInput>;
  lng?: InputMaybe<FloatFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentTestLocationFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTestLocationFiltersInput>>>;
};

export type ComponentTestLocationInput = {
  address?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  lat?: InputMaybe<Scalars["Float"]>;
  lng?: InputMaybe<Scalars["Float"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type CrewArea = {
  __typename?: "CrewArea";
  createdAt?: Maybe<Scalars["DateTime"]>;
  image?: Maybe<UploadFileEntityResponse>;
  name?: Maybe<Scalars["String"]>;
  people?: Maybe<PersonRelationResponseCollection>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type CrewAreaPeopleArgs = {
  filters?: InputMaybe<PersonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type CrewAreaEntity = {
  __typename?: "CrewAreaEntity";
  attributes?: Maybe<CrewArea>;
  id?: Maybe<Scalars["ID"]>;
};

export type CrewAreaEntityResponse = {
  __typename?: "CrewAreaEntityResponse";
  data?: Maybe<CrewAreaEntity>;
};

export type CrewAreaEntityResponseCollection = {
  __typename?: "CrewAreaEntityResponseCollection";
  data: Array<CrewAreaEntity>;
  meta: ResponseCollectionMeta;
};

export type CrewAreaFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CrewAreaFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CrewAreaFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CrewAreaFiltersInput>>>;
  people?: InputMaybe<PersonFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CrewAreaInput = {
  image?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  people?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type CrewAreaRelationResponseCollection = {
  __typename?: "CrewAreaRelationResponseCollection";
  data: Array<CrewAreaEntity>;
};

export type CustomCrewField = {
  __typename?: "CustomCrewField";
  createdAt?: Maybe<Scalars["DateTime"]>;
  name: Scalars["String"];
  publishedAt?: Maybe<Scalars["DateTime"]>;
  show?: Maybe<ShowEntityResponse>;
  type: Enum_Customcrewfield_Type;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type CustomCrewFieldEntity = {
  __typename?: "CustomCrewFieldEntity";
  attributes?: Maybe<CustomCrewField>;
  id?: Maybe<Scalars["ID"]>;
};

export type CustomCrewFieldEntityResponse = {
  __typename?: "CustomCrewFieldEntityResponse";
  data?: Maybe<CustomCrewFieldEntity>;
};

export type CustomCrewFieldEntityResponseCollection = {
  __typename?: "CustomCrewFieldEntityResponseCollection";
  data: Array<CustomCrewFieldEntity>;
  meta: ResponseCollectionMeta;
};

export type CustomCrewFieldFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CustomCrewFieldFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CustomCrewFieldFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CustomCrewFieldFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  show?: InputMaybe<ShowFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CustomCrewFieldInput = {
  name?: InputMaybe<Scalars["String"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
  show?: InputMaybe<Scalars["ID"]>;
  type?: InputMaybe<Enum_Customcrewfield_Type>;
};

export type CustomCrewFieldRelationResponseCollection = {
  __typename?: "CustomCrewFieldRelationResponseCollection";
  data: Array<CustomCrewFieldEntity>;
};

export type CustomCrewFieldValue = {
  __typename?: "CustomCrewFieldValue";
  createdAt?: Maybe<Scalars["DateTime"]>;
  customCrewField?: Maybe<CustomCrewFieldEntityResponse>;
  person?: Maybe<PersonEntityResponse>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  value?: Maybe<Scalars["JSON"]>;
};

export type CustomCrewFieldValueEntity = {
  __typename?: "CustomCrewFieldValueEntity";
  attributes?: Maybe<CustomCrewFieldValue>;
  id?: Maybe<Scalars["ID"]>;
};

export type CustomCrewFieldValueEntityResponse = {
  __typename?: "CustomCrewFieldValueEntityResponse";
  data?: Maybe<CustomCrewFieldValueEntity>;
};

export type CustomCrewFieldValueEntityResponseCollection = {
  __typename?: "CustomCrewFieldValueEntityResponseCollection";
  data: Array<CustomCrewFieldValueEntity>;
  meta: ResponseCollectionMeta;
};

export type CustomCrewFieldValueFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CustomCrewFieldValueFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  customCrewField?: InputMaybe<CustomCrewFieldFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<CustomCrewFieldValueFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CustomCrewFieldValueFiltersInput>>>;
  person?: InputMaybe<PersonFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  value?: InputMaybe<JsonFilterInput>;
};

export type CustomCrewFieldValueInput = {
  customCrewField?: InputMaybe<Scalars["ID"]>;
  person?: InputMaybe<Scalars["ID"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
  value?: InputMaybe<Scalars["JSON"]>;
};

export type CustomCrewFieldValueRelationResponseCollection = {
  __typename?: "CustomCrewFieldValueRelationResponseCollection";
  data: Array<CustomCrewFieldValueEntity>;
};

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>;
  contains?: InputMaybe<Scalars["Date"]>;
  containsi?: InputMaybe<Scalars["Date"]>;
  endsWith?: InputMaybe<Scalars["Date"]>;
  eq?: InputMaybe<Scalars["Date"]>;
  eqi?: InputMaybe<Scalars["Date"]>;
  gt?: InputMaybe<Scalars["Date"]>;
  gte?: InputMaybe<Scalars["Date"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>;
  lt?: InputMaybe<Scalars["Date"]>;
  lte?: InputMaybe<Scalars["Date"]>;
  ne?: InputMaybe<Scalars["Date"]>;
  not?: InputMaybe<DateFilterInput>;
  notContains?: InputMaybe<Scalars["Date"]>;
  notContainsi?: InputMaybe<Scalars["Date"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>;
  startsWith?: InputMaybe<Scalars["Date"]>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  contains?: InputMaybe<Scalars["DateTime"]>;
  containsi?: InputMaybe<Scalars["DateTime"]>;
  endsWith?: InputMaybe<Scalars["DateTime"]>;
  eq?: InputMaybe<Scalars["DateTime"]>;
  eqi?: InputMaybe<Scalars["DateTime"]>;
  gt?: InputMaybe<Scalars["DateTime"]>;
  gte?: InputMaybe<Scalars["DateTime"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  lt?: InputMaybe<Scalars["DateTime"]>;
  lte?: InputMaybe<Scalars["DateTime"]>;
  ne?: InputMaybe<Scalars["DateTime"]>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars["DateTime"]>;
  notContainsi?: InputMaybe<Scalars["DateTime"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  startsWith?: InputMaybe<Scalars["DateTime"]>;
};

export enum Enum_Customcrewfield_Type {
  Boolean = "boolean",
}

export type Event = {
  __typename?: "Event";
  availabilities?: Maybe<AvailabilityRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  curtainsUp?: Maybe<Scalars["String"]>;
  end?: Maybe<Scalars["DateTime"]>;
  location?: Maybe<ComponentTestLocation>;
  longnote?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  requiresAvailabilities?: Maybe<Scalars["Boolean"]>;
  roleoverrides?: Maybe<RoleoverrideRelationResponseCollection>;
  shortnote?: Maybe<Scalars["String"]>;
  show?: Maybe<ShowEntityResponse>;
  start: Scalars["DateTime"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
  weather?: Maybe<Scalars["JSON"]>;
};

export type EventAvailabilitiesArgs = {
  filters?: InputMaybe<AvailabilityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EventRoleoverridesArgs = {
  filters?: InputMaybe<RoleoverrideFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EventEntity = {
  __typename?: "EventEntity";
  attributes?: Maybe<Event>;
  id?: Maybe<Scalars["ID"]>;
};

export type EventEntityResponse = {
  __typename?: "EventEntityResponse";
  data?: Maybe<EventEntity>;
};

export type EventEntityResponseCollection = {
  __typename?: "EventEntityResponseCollection";
  data: Array<EventEntity>;
  meta: ResponseCollectionMeta;
};

export type EventFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>;
  availabilities?: InputMaybe<AvailabilityFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  curtainsUp?: InputMaybe<StringFilterInput>;
  end?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  location?: InputMaybe<ComponentTestLocationFiltersInput>;
  longnote?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<EventFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  requiresAvailabilities?: InputMaybe<BooleanFilterInput>;
  roleoverrides?: InputMaybe<RoleoverrideFiltersInput>;
  shortnote?: InputMaybe<StringFilterInput>;
  show?: InputMaybe<ShowFiltersInput>;
  start?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  weather?: InputMaybe<JsonFilterInput>;
};

export type EventInput = {
  availabilities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  curtainsUp?: InputMaybe<Scalars["String"]>;
  end?: InputMaybe<Scalars["DateTime"]>;
  location?: InputMaybe<ComponentTestLocationInput>;
  longnote?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
  requiresAvailabilities?: InputMaybe<Scalars["Boolean"]>;
  roleoverrides?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  shortnote?: InputMaybe<Scalars["String"]>;
  show?: InputMaybe<Scalars["ID"]>;
  start?: InputMaybe<Scalars["DateTime"]>;
  weather?: InputMaybe<Scalars["JSON"]>;
};

export type EventRelationResponseCollection = {
  __typename?: "EventRelationResponseCollection";
  data: Array<EventEntity>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars["String"]>;
  caption?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  contains?: InputMaybe<Scalars["Float"]>;
  containsi?: InputMaybe<Scalars["Float"]>;
  endsWith?: InputMaybe<Scalars["Float"]>;
  eq?: InputMaybe<Scalars["Float"]>;
  eqi?: InputMaybe<Scalars["Float"]>;
  gt?: InputMaybe<Scalars["Float"]>;
  gte?: InputMaybe<Scalars["Float"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  lt?: InputMaybe<Scalars["Float"]>;
  lte?: InputMaybe<Scalars["Float"]>;
  ne?: InputMaybe<Scalars["Float"]>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars["Float"]>;
  notContainsi?: InputMaybe<Scalars["Float"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  startsWith?: InputMaybe<Scalars["Float"]>;
};

export type GenericMorph =
  | ApplicationEvent
  | Availability
  | ComponentTestLocation
  | CrewArea
  | CustomCrewField
  | CustomCrewFieldValue
  | Event
  | Link
  | Location
  | Person
  | PersonComment
  | Roleoverride
  | Show
  | ShowRoleGroup
  | Showreport
  | Showrole
  | TextDocument
  | TextDocumentSnapshot
  | UploadFile
  | UploadFolder
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsUser;

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contains?: InputMaybe<Scalars["ID"]>;
  containsi?: InputMaybe<Scalars["ID"]>;
  endsWith?: InputMaybe<Scalars["ID"]>;
  eq?: InputMaybe<Scalars["ID"]>;
  eqi?: InputMaybe<Scalars["ID"]>;
  gt?: InputMaybe<Scalars["ID"]>;
  gte?: InputMaybe<Scalars["ID"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  lt?: InputMaybe<Scalars["ID"]>;
  lte?: InputMaybe<Scalars["ID"]>;
  ne?: InputMaybe<Scalars["ID"]>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars["ID"]>;
  notContainsi?: InputMaybe<Scalars["ID"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  startsWith?: InputMaybe<Scalars["ID"]>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  contains?: InputMaybe<Scalars["Int"]>;
  containsi?: InputMaybe<Scalars["Int"]>;
  endsWith?: InputMaybe<Scalars["Int"]>;
  eq?: InputMaybe<Scalars["Int"]>;
  eqi?: InputMaybe<Scalars["Int"]>;
  gt?: InputMaybe<Scalars["Int"]>;
  gte?: InputMaybe<Scalars["Int"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  lt?: InputMaybe<Scalars["Int"]>;
  lte?: InputMaybe<Scalars["Int"]>;
  ne?: InputMaybe<Scalars["Int"]>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars["Int"]>;
  notContainsi?: InputMaybe<Scalars["Int"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  startsWith?: InputMaybe<Scalars["Int"]>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  contains?: InputMaybe<Scalars["JSON"]>;
  containsi?: InputMaybe<Scalars["JSON"]>;
  endsWith?: InputMaybe<Scalars["JSON"]>;
  eq?: InputMaybe<Scalars["JSON"]>;
  eqi?: InputMaybe<Scalars["JSON"]>;
  gt?: InputMaybe<Scalars["JSON"]>;
  gte?: InputMaybe<Scalars["JSON"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  lt?: InputMaybe<Scalars["JSON"]>;
  lte?: InputMaybe<Scalars["JSON"]>;
  ne?: InputMaybe<Scalars["JSON"]>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars["JSON"]>;
  notContainsi?: InputMaybe<Scalars["JSON"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  startsWith?: InputMaybe<Scalars["JSON"]>;
};

export type Link = {
  __typename?: "Link";
  Name?: Maybe<Scalars["String"]>;
  Url?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type LinkEntity = {
  __typename?: "LinkEntity";
  attributes?: Maybe<Link>;
  id?: Maybe<Scalars["ID"]>;
};

export type LinkEntityResponse = {
  __typename?: "LinkEntityResponse";
  data?: Maybe<LinkEntity>;
};

export type LinkEntityResponseCollection = {
  __typename?: "LinkEntityResponseCollection";
  data: Array<LinkEntity>;
  meta: ResponseCollectionMeta;
};

export type LinkFiltersInput = {
  Name?: InputMaybe<StringFilterInput>;
  Url?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<LinkFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<LinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<LinkFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type LinkInput = {
  Name?: InputMaybe<Scalars["String"]>;
  Url?: InputMaybe<Scalars["String"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type LinkRelationResponseCollection = {
  __typename?: "LinkRelationResponseCollection";
  data: Array<LinkEntity>;
};

export type Location = {
  __typename?: "Location";
  address?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  lat?: Maybe<Scalars["Float"]>;
  lng?: Maybe<Scalars["Float"]>;
  name: Scalars["String"];
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type LocationEntity = {
  __typename?: "LocationEntity";
  attributes?: Maybe<Location>;
  id?: Maybe<Scalars["ID"]>;
};

export type LocationEntityResponse = {
  __typename?: "LocationEntityResponse";
  data?: Maybe<LocationEntity>;
};

export type LocationEntityResponseCollection = {
  __typename?: "LocationEntityResponseCollection";
  data: Array<LocationEntity>;
  meta: ResponseCollectionMeta;
};

export type LocationFiltersInput = {
  address?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<LocationFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  lat?: InputMaybe<FloatFilterInput>;
  lng?: InputMaybe<FloatFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<LocationFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<LocationFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type LocationInput = {
  address?: InputMaybe<Scalars["String"]>;
  lat?: InputMaybe<Scalars["Float"]>;
  lng?: InputMaybe<Scalars["Float"]>;
  name?: InputMaybe<Scalars["String"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createApplicationEvent?: Maybe<ApplicationEventEntityResponse>;
  createAvailability?: Maybe<AvailabilityEntityResponse>;
  createCrewArea?: Maybe<CrewAreaEntityResponse>;
  createCustomCrewField?: Maybe<CustomCrewFieldEntityResponse>;
  createCustomCrewFieldValue?: Maybe<CustomCrewFieldValueEntityResponse>;
  createEvent?: Maybe<EventEntityResponse>;
  createLink?: Maybe<LinkEntityResponse>;
  createLocation?: Maybe<LocationEntityResponse>;
  createPerson?: Maybe<PersonEntityResponse>;
  createPersonComment?: Maybe<PersonCommentEntityResponse>;
  createRoleoverride?: Maybe<RoleoverrideEntityResponse>;
  createShow?: Maybe<ShowEntityResponse>;
  createShowRoleGroup?: Maybe<ShowRoleGroupEntityResponse>;
  createShowreport?: Maybe<ShowreportEntityResponse>;
  createShowrole?: Maybe<ShowroleEntityResponse>;
  createTextDocument?: Maybe<TextDocumentEntityResponse>;
  createTextDocumentSnapshot?: Maybe<TextDocumentSnapshotEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteApplicationEvent?: Maybe<ApplicationEventEntityResponse>;
  deleteAvailability?: Maybe<AvailabilityEntityResponse>;
  deleteCrewArea?: Maybe<CrewAreaEntityResponse>;
  deleteCustomCrewField?: Maybe<CustomCrewFieldEntityResponse>;
  deleteCustomCrewFieldValue?: Maybe<CustomCrewFieldValueEntityResponse>;
  deleteEvent?: Maybe<EventEntityResponse>;
  deleteLink?: Maybe<LinkEntityResponse>;
  deleteLocation?: Maybe<LocationEntityResponse>;
  deletePerson?: Maybe<PersonEntityResponse>;
  deletePersonComment?: Maybe<PersonCommentEntityResponse>;
  deleteRoleoverride?: Maybe<RoleoverrideEntityResponse>;
  deleteShow?: Maybe<ShowEntityResponse>;
  deleteShowRoleGroup?: Maybe<ShowRoleGroupEntityResponse>;
  deleteShowreport?: Maybe<ShowreportEntityResponse>;
  deleteShowrole?: Maybe<ShowroleEntityResponse>;
  deleteTextDocument?: Maybe<TextDocumentEntityResponse>;
  deleteTextDocumentSnapshot?: Maybe<TextDocumentSnapshotEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateApplicationEvent?: Maybe<ApplicationEventEntityResponse>;
  updateAvailability?: Maybe<AvailabilityEntityResponse>;
  updateCrewArea?: Maybe<CrewAreaEntityResponse>;
  updateCustomCrewField?: Maybe<CustomCrewFieldEntityResponse>;
  updateCustomCrewFieldValue?: Maybe<CustomCrewFieldValueEntityResponse>;
  updateEvent?: Maybe<EventEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateLink?: Maybe<LinkEntityResponse>;
  updateLocation?: Maybe<LocationEntityResponse>;
  updatePerson?: Maybe<PersonEntityResponse>;
  updatePersonComment?: Maybe<PersonCommentEntityResponse>;
  updateRoleoverride?: Maybe<RoleoverrideEntityResponse>;
  updateShow?: Maybe<ShowEntityResponse>;
  updateShowRoleGroup?: Maybe<ShowRoleGroupEntityResponse>;
  updateShowreport?: Maybe<ShowreportEntityResponse>;
  updateShowrole?: Maybe<ShowroleEntityResponse>;
  updateTextDocument?: Maybe<TextDocumentEntityResponse>;
  updateTextDocumentSnapshot?: Maybe<TextDocumentSnapshotEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};

export type MutationChangePasswordArgs = {
  currentPassword: Scalars["String"];
  password: Scalars["String"];
  passwordConfirmation: Scalars["String"];
};

export type MutationCreateApplicationEventArgs = {
  data: ApplicationEventInput;
};

export type MutationCreateAvailabilityArgs = {
  data: AvailabilityInput;
};

export type MutationCreateCrewAreaArgs = {
  data: CrewAreaInput;
};

export type MutationCreateCustomCrewFieldArgs = {
  data: CustomCrewFieldInput;
};

export type MutationCreateCustomCrewFieldValueArgs = {
  data: CustomCrewFieldValueInput;
};

export type MutationCreateEventArgs = {
  data: EventInput;
};

export type MutationCreateLinkArgs = {
  data: LinkInput;
};

export type MutationCreateLocationArgs = {
  data: LocationInput;
};

export type MutationCreatePersonArgs = {
  data: PersonInput;
};

export type MutationCreatePersonCommentArgs = {
  data: PersonCommentInput;
};

export type MutationCreateRoleoverrideArgs = {
  data: RoleoverrideInput;
};

export type MutationCreateShowArgs = {
  data: ShowInput;
};

export type MutationCreateShowRoleGroupArgs = {
  data: ShowRoleGroupInput;
};

export type MutationCreateShowreportArgs = {
  data: ShowreportInput;
};

export type MutationCreateShowroleArgs = {
  data: ShowroleInput;
};

export type MutationCreateTextDocumentArgs = {
  data: TextDocumentInput;
};

export type MutationCreateTextDocumentSnapshotArgs = {
  data: TextDocumentSnapshotInput;
};

export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};

export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};

export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};

export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};

export type MutationDeleteApplicationEventArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteAvailabilityArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteCrewAreaArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteCustomCrewFieldArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteCustomCrewFieldValueArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteEventArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteLinkArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteLocationArgs = {
  id: Scalars["ID"];
};

export type MutationDeletePersonArgs = {
  id: Scalars["ID"];
};

export type MutationDeletePersonCommentArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteRoleoverrideArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteShowArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteShowRoleGroupArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteShowreportArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteShowroleArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteTextDocumentArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteTextDocumentSnapshotArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUploadFileArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUploadFolderArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars["ID"];
};

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};

export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars["String"]>;
  files: Array<InputMaybe<Scalars["Upload"]>>;
  ref?: InputMaybe<Scalars["String"]>;
  refId?: InputMaybe<Scalars["ID"]>;
};

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};

export type MutationRemoveFileArgs = {
  id: Scalars["ID"];
};

export type MutationResetPasswordArgs = {
  code: Scalars["String"];
  password: Scalars["String"];
  passwordConfirmation: Scalars["String"];
};

export type MutationUpdateApplicationEventArgs = {
  data: ApplicationEventInput;
  id: Scalars["ID"];
};

export type MutationUpdateAvailabilityArgs = {
  data: AvailabilityInput;
  id: Scalars["ID"];
};

export type MutationUpdateCrewAreaArgs = {
  data: CrewAreaInput;
  id: Scalars["ID"];
};

export type MutationUpdateCustomCrewFieldArgs = {
  data: CustomCrewFieldInput;
  id: Scalars["ID"];
};

export type MutationUpdateCustomCrewFieldValueArgs = {
  data: CustomCrewFieldValueInput;
  id: Scalars["ID"];
};

export type MutationUpdateEventArgs = {
  data: EventInput;
  id: Scalars["ID"];
};

export type MutationUpdateFileInfoArgs = {
  id: Scalars["ID"];
  info?: InputMaybe<FileInfoInput>;
};

export type MutationUpdateLinkArgs = {
  data: LinkInput;
  id: Scalars["ID"];
};

export type MutationUpdateLocationArgs = {
  data: LocationInput;
  id: Scalars["ID"];
};

export type MutationUpdatePersonArgs = {
  data: PersonInput;
  id: Scalars["ID"];
};

export type MutationUpdatePersonCommentArgs = {
  data: PersonCommentInput;
  id: Scalars["ID"];
};

export type MutationUpdateRoleoverrideArgs = {
  data: RoleoverrideInput;
  id: Scalars["ID"];
};

export type MutationUpdateShowArgs = {
  data: ShowInput;
  id: Scalars["ID"];
};

export type MutationUpdateShowRoleGroupArgs = {
  data: ShowRoleGroupInput;
  id: Scalars["ID"];
};

export type MutationUpdateShowreportArgs = {
  data: ShowreportInput;
  id: Scalars["ID"];
};

export type MutationUpdateShowroleArgs = {
  data: ShowroleInput;
  id: Scalars["ID"];
};

export type MutationUpdateTextDocumentArgs = {
  data: TextDocumentInput;
  id: Scalars["ID"];
};

export type MutationUpdateTextDocumentSnapshotArgs = {
  data: TextDocumentSnapshotInput;
  id: Scalars["ID"];
};

export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars["ID"];
};

export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars["ID"];
};

export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars["ID"];
};

export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars["ID"];
};

export type MutationUploadArgs = {
  field?: InputMaybe<Scalars["String"]>;
  file: Scalars["Upload"];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars["String"]>;
  refId?: InputMaybe<Scalars["ID"]>;
};

export type Pagination = {
  __typename?: "Pagination";
  page: Scalars["Int"];
  pageCount: Scalars["Int"];
  pageSize: Scalars["Int"];
  total: Scalars["Int"];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  start?: InputMaybe<Scalars["Int"]>;
};

export type Person = {
  __typename?: "Person";
  allergies?: Maybe<Scalars["String"]>;
  availabilities?: Maybe<AvailabilityRelationResponseCollection>;
  avatar?: Maybe<UploadFileEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  crewAreas?: Maybe<CrewAreaRelationResponseCollection>;
  customCrewFieldValues?: Maybe<CustomCrewFieldValueRelationResponseCollection>;
  dob?: Maybe<Scalars["Date"]>;
  documents?: Maybe<UploadFileRelationResponseCollection>;
  email?: Maybe<Scalars["String"]>;
  emergencyName?: Maybe<Scalars["String"]>;
  emergencyPhone?: Maybe<Scalars["String"]>;
  emergencyRelationship?: Maybe<Scalars["String"]>;
  firstname: Scalars["String"];
  hearAboutUs?: Maybe<Scalars["String"]>;
  lastname?: Maybe<Scalars["String"]>;
  notes?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  previousWork?: Maybe<Scalars["String"]>;
  pronoun?: Maybe<Scalars["String"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  reasonForCrewing?: Maybe<Scalars["String"]>;
  rosterNotificationsByEmail?: Maybe<Scalars["Boolean"]>;
  rosterNotificationsByPhone?: Maybe<Scalars["Boolean"]>;
  showroles?: Maybe<ShowroleRelationResponseCollection>;
  shows?: Maybe<ShowRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  user?: Maybe<UsersPermissionsUserEntityResponse>;
  wwc?: Maybe<Scalars["String"]>;
};

export type PersonAvailabilitiesArgs = {
  filters?: InputMaybe<AvailabilityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type PersonCrewAreasArgs = {
  filters?: InputMaybe<CrewAreaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type PersonCustomCrewFieldValuesArgs = {
  filters?: InputMaybe<CustomCrewFieldValueFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type PersonDocumentsArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type PersonShowrolesArgs = {
  filters?: InputMaybe<ShowroleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type PersonShowsArgs = {
  filters?: InputMaybe<ShowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type PersonComment = {
  __typename?: "PersonComment";
  commenter?: Maybe<PersonEntityResponse>;
  content?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  person?: Maybe<PersonEntityResponse>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type PersonCommentEntity = {
  __typename?: "PersonCommentEntity";
  attributes?: Maybe<PersonComment>;
  id?: Maybe<Scalars["ID"]>;
};

export type PersonCommentEntityResponse = {
  __typename?: "PersonCommentEntityResponse";
  data?: Maybe<PersonCommentEntity>;
};

export type PersonCommentEntityResponseCollection = {
  __typename?: "PersonCommentEntityResponseCollection";
  data: Array<PersonCommentEntity>;
  meta: ResponseCollectionMeta;
};

export type PersonCommentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PersonCommentFiltersInput>>>;
  commenter?: InputMaybe<PersonFiltersInput>;
  content?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<PersonCommentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PersonCommentFiltersInput>>>;
  person?: InputMaybe<PersonFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PersonCommentInput = {
  commenter?: InputMaybe<Scalars["ID"]>;
  content?: InputMaybe<Scalars["String"]>;
  person?: InputMaybe<Scalars["ID"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type PersonEntity = {
  __typename?: "PersonEntity";
  attributes?: Maybe<Person>;
  id?: Maybe<Scalars["ID"]>;
};

export type PersonEntityResponse = {
  __typename?: "PersonEntityResponse";
  data?: Maybe<PersonEntity>;
};

export type PersonEntityResponseCollection = {
  __typename?: "PersonEntityResponseCollection";
  data: Array<PersonEntity>;
  meta: ResponseCollectionMeta;
};

export type PersonFiltersInput = {
  allergies?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<PersonFiltersInput>>>;
  availabilities?: InputMaybe<AvailabilityFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  crewAreas?: InputMaybe<CrewAreaFiltersInput>;
  customCrewFieldValues?: InputMaybe<CustomCrewFieldValueFiltersInput>;
  dob?: InputMaybe<DateFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  emergencyName?: InputMaybe<StringFilterInput>;
  emergencyPhone?: InputMaybe<StringFilterInput>;
  emergencyRelationship?: InputMaybe<StringFilterInput>;
  firstname?: InputMaybe<StringFilterInput>;
  hearAboutUs?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  lastname?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<PersonFiltersInput>;
  notes?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<PersonFiltersInput>>>;
  phone?: InputMaybe<StringFilterInput>;
  previousWork?: InputMaybe<StringFilterInput>;
  pronoun?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  reasonForCrewing?: InputMaybe<StringFilterInput>;
  rosterNotificationsByEmail?: InputMaybe<BooleanFilterInput>;
  rosterNotificationsByPhone?: InputMaybe<BooleanFilterInput>;
  showroles?: InputMaybe<ShowroleFiltersInput>;
  shows?: InputMaybe<ShowFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
  wwc?: InputMaybe<StringFilterInput>;
};

export type PersonInput = {
  allergies?: InputMaybe<Scalars["String"]>;
  availabilities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  avatar?: InputMaybe<Scalars["ID"]>;
  crewAreas?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  customCrewFieldValues?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  dob?: InputMaybe<Scalars["Date"]>;
  documents?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  email?: InputMaybe<Scalars["String"]>;
  emergencyName?: InputMaybe<Scalars["String"]>;
  emergencyPhone?: InputMaybe<Scalars["String"]>;
  emergencyRelationship?: InputMaybe<Scalars["String"]>;
  firstname?: InputMaybe<Scalars["String"]>;
  hearAboutUs?: InputMaybe<Scalars["String"]>;
  lastname?: InputMaybe<Scalars["String"]>;
  notes?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  previousWork?: InputMaybe<Scalars["String"]>;
  pronoun?: InputMaybe<Scalars["String"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
  reasonForCrewing?: InputMaybe<Scalars["String"]>;
  rosterNotificationsByEmail?: InputMaybe<Scalars["Boolean"]>;
  rosterNotificationsByPhone?: InputMaybe<Scalars["Boolean"]>;
  showroles?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  shows?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  user?: InputMaybe<Scalars["ID"]>;
  wwc?: InputMaybe<Scalars["String"]>;
};

export type PersonRelationResponseCollection = {
  __typename?: "PersonRelationResponseCollection";
  data: Array<PersonEntity>;
};

export enum PublicationState {
  Live = "LIVE",
  Preview = "PREVIEW",
}

export type Query = {
  __typename?: "Query";
  applicationEvent?: Maybe<ApplicationEventEntityResponse>;
  applicationEvents?: Maybe<ApplicationEventEntityResponseCollection>;
  availabilities?: Maybe<AvailabilityEntityResponseCollection>;
  availability?: Maybe<AvailabilityEntityResponse>;
  crewArea?: Maybe<CrewAreaEntityResponse>;
  crewAreas?: Maybe<CrewAreaEntityResponseCollection>;
  customCrewField?: Maybe<CustomCrewFieldEntityResponse>;
  customCrewFieldValue?: Maybe<CustomCrewFieldValueEntityResponse>;
  customCrewFieldValues?: Maybe<CustomCrewFieldValueEntityResponseCollection>;
  customCrewFields?: Maybe<CustomCrewFieldEntityResponseCollection>;
  event?: Maybe<EventEntityResponse>;
  events?: Maybe<EventEntityResponseCollection>;
  link?: Maybe<LinkEntityResponse>;
  links?: Maybe<LinkEntityResponseCollection>;
  location?: Maybe<LocationEntityResponse>;
  locations?: Maybe<LocationEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  people?: Maybe<PersonEntityResponseCollection>;
  person?: Maybe<PersonEntityResponse>;
  personComment?: Maybe<PersonCommentEntityResponse>;
  personComments?: Maybe<PersonCommentEntityResponseCollection>;
  roleoverride?: Maybe<RoleoverrideEntityResponse>;
  roleoverrides?: Maybe<RoleoverrideEntityResponseCollection>;
  show?: Maybe<ShowEntityResponse>;
  showRoleGroup?: Maybe<ShowRoleGroupEntityResponse>;
  showRoleGroups?: Maybe<ShowRoleGroupEntityResponseCollection>;
  showreport?: Maybe<ShowreportEntityResponse>;
  showreports?: Maybe<ShowreportEntityResponseCollection>;
  showrole?: Maybe<ShowroleEntityResponse>;
  showroles?: Maybe<ShowroleEntityResponseCollection>;
  shows?: Maybe<ShowEntityResponseCollection>;
  textDocument?: Maybe<TextDocumentEntityResponse>;
  textDocumentSnapshot?: Maybe<TextDocumentSnapshotEntityResponse>;
  textDocumentSnapshots?: Maybe<TextDocumentSnapshotEntityResponseCollection>;
  textDocuments?: Maybe<TextDocumentEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};

export type QueryApplicationEventArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryApplicationEventsArgs = {
  filters?: InputMaybe<ApplicationEventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryAvailabilitiesArgs = {
  filters?: InputMaybe<AvailabilityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryAvailabilityArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryCrewAreaArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryCrewAreasArgs = {
  filters?: InputMaybe<CrewAreaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCustomCrewFieldArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryCustomCrewFieldValueArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryCustomCrewFieldValuesArgs = {
  filters?: InputMaybe<CustomCrewFieldValueFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCustomCrewFieldsArgs = {
  filters?: InputMaybe<CustomCrewFieldFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryEventArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryLinkArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryLinksArgs = {
  filters?: InputMaybe<LinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryLocationArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryLocationsArgs = {
  filters?: InputMaybe<LocationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryPeopleArgs = {
  filters?: InputMaybe<PersonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryPersonArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryPersonCommentArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryPersonCommentsArgs = {
  filters?: InputMaybe<PersonCommentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryRoleoverrideArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryRoleoverridesArgs = {
  filters?: InputMaybe<RoleoverrideFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryShowArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryShowRoleGroupArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryShowRoleGroupsArgs = {
  filters?: InputMaybe<ShowRoleGroupFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryShowreportArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryShowreportsArgs = {
  filters?: InputMaybe<ShowreportFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryShowroleArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryShowrolesArgs = {
  filters?: InputMaybe<ShowroleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryShowsArgs = {
  filters?: InputMaybe<ShowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryTextDocumentArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTextDocumentSnapshotArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTextDocumentSnapshotsArgs = {
  filters?: InputMaybe<TextDocumentSnapshotFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryTextDocumentsArgs = {
  filters?: InputMaybe<TextDocumentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ResponseCollectionMeta = {
  __typename?: "ResponseCollectionMeta";
  pagination: Pagination;
};

export type Roleoverride = {
  __typename?: "Roleoverride";
  createdAt?: Maybe<Scalars["DateTime"]>;
  event?: Maybe<EventEntityResponse>;
  person?: Maybe<PersonEntityResponse>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  showrole?: Maybe<ShowroleEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type RoleoverrideEntity = {
  __typename?: "RoleoverrideEntity";
  attributes?: Maybe<Roleoverride>;
  id?: Maybe<Scalars["ID"]>;
};

export type RoleoverrideEntityResponse = {
  __typename?: "RoleoverrideEntityResponse";
  data?: Maybe<RoleoverrideEntity>;
};

export type RoleoverrideEntityResponseCollection = {
  __typename?: "RoleoverrideEntityResponseCollection";
  data: Array<RoleoverrideEntity>;
  meta: ResponseCollectionMeta;
};

export type RoleoverrideFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<RoleoverrideFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  event?: InputMaybe<EventFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<RoleoverrideFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<RoleoverrideFiltersInput>>>;
  person?: InputMaybe<PersonFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  showrole?: InputMaybe<ShowroleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type RoleoverrideInput = {
  event?: InputMaybe<Scalars["ID"]>;
  person?: InputMaybe<Scalars["ID"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
  showrole?: InputMaybe<Scalars["ID"]>;
};

export type RoleoverrideRelationResponseCollection = {
  __typename?: "RoleoverrideRelationResponseCollection";
  data: Array<RoleoverrideEntity>;
};

export type Show = {
  __typename?: "Show";
  bannerimage?: Maybe<UploadFileEntityResponse>;
  company?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  crews?: Maybe<PersonRelationResponseCollection>;
  customCrewFields?: Maybe<CustomCrewFieldRelationResponseCollection>;
  events?: Maybe<EventRelationResponseCollection>;
  hidden?: Maybe<Scalars["Boolean"]>;
  hideRoles?: Maybe<Scalars["Boolean"]>;
  links?: Maybe<LinkRelationResponseCollection>;
  mainContact?: Maybe<PersonEntityResponse>;
  name: Scalars["String"];
  password?: Maybe<Scalars["String"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  rolesOrder?: Maybe<Scalars["JSON"]>;
  show_role_groups?: Maybe<ShowRoleGroupRelationResponseCollection>;
  showroles?: Maybe<ShowroleRelationResponseCollection>;
  slug: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ShowCrewsArgs = {
  filters?: InputMaybe<PersonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ShowCustomCrewFieldsArgs = {
  filters?: InputMaybe<CustomCrewFieldFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ShowEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ShowLinksArgs = {
  filters?: InputMaybe<LinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ShowShow_Role_GroupsArgs = {
  filters?: InputMaybe<ShowRoleGroupFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ShowShowrolesArgs = {
  filters?: InputMaybe<ShowroleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ShowEntity = {
  __typename?: "ShowEntity";
  attributes?: Maybe<Show>;
  id?: Maybe<Scalars["ID"]>;
};

export type ShowEntityResponse = {
  __typename?: "ShowEntityResponse";
  data?: Maybe<ShowEntity>;
};

export type ShowEntityResponseCollection = {
  __typename?: "ShowEntityResponseCollection";
  data: Array<ShowEntity>;
  meta: ResponseCollectionMeta;
};

export type ShowFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ShowFiltersInput>>>;
  company?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  crews?: InputMaybe<PersonFiltersInput>;
  customCrewFields?: InputMaybe<CustomCrewFieldFiltersInput>;
  events?: InputMaybe<EventFiltersInput>;
  hidden?: InputMaybe<BooleanFilterInput>;
  hideRoles?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  links?: InputMaybe<LinkFiltersInput>;
  mainContact?: InputMaybe<PersonFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ShowFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ShowFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  rolesOrder?: InputMaybe<JsonFilterInput>;
  show_role_groups?: InputMaybe<ShowRoleGroupFiltersInput>;
  showroles?: InputMaybe<ShowroleFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ShowInput = {
  bannerimage?: InputMaybe<Scalars["ID"]>;
  company?: InputMaybe<Scalars["String"]>;
  crews?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  customCrewFields?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  events?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  hidden?: InputMaybe<Scalars["Boolean"]>;
  hideRoles?: InputMaybe<Scalars["Boolean"]>;
  links?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  mainContact?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
  rolesOrder?: InputMaybe<Scalars["JSON"]>;
  show_role_groups?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  showroles?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type ShowRelationResponseCollection = {
  __typename?: "ShowRelationResponseCollection";
  data: Array<ShowEntity>;
};

export type ShowRoleGroup = {
  __typename?: "ShowRoleGroup";
  createdAt?: Maybe<Scalars["DateTime"]>;
  name?: Maybe<Scalars["String"]>;
  show?: Maybe<ShowEntityResponse>;
  show_roles?: Maybe<ShowroleRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ShowRoleGroupShow_RolesArgs = {
  filters?: InputMaybe<ShowroleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ShowRoleGroupEntity = {
  __typename?: "ShowRoleGroupEntity";
  attributes?: Maybe<ShowRoleGroup>;
  id?: Maybe<Scalars["ID"]>;
};

export type ShowRoleGroupEntityResponse = {
  __typename?: "ShowRoleGroupEntityResponse";
  data?: Maybe<ShowRoleGroupEntity>;
};

export type ShowRoleGroupEntityResponseCollection = {
  __typename?: "ShowRoleGroupEntityResponseCollection";
  data: Array<ShowRoleGroupEntity>;
  meta: ResponseCollectionMeta;
};

export type ShowRoleGroupFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ShowRoleGroupFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ShowRoleGroupFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ShowRoleGroupFiltersInput>>>;
  show?: InputMaybe<ShowFiltersInput>;
  show_roles?: InputMaybe<ShowroleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ShowRoleGroupInput = {
  name?: InputMaybe<Scalars["String"]>;
  show?: InputMaybe<Scalars["ID"]>;
  show_roles?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type ShowRoleGroupRelationResponseCollection = {
  __typename?: "ShowRoleGroupRelationResponseCollection";
  data: Array<ShowRoleGroupEntity>;
};

export type Showreport = {
  __typename?: "Showreport";
  audienceSize?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  creator?: Maybe<UsersPermissionsUserEntityResponse>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  fohClearance?: Maybe<Scalars["Time"]>;
  houseOpen?: Maybe<Scalars["Time"]>;
  intervalEnd?: Maybe<Scalars["Time"]>;
  intervalStart?: Maybe<Scalars["Time"]>;
  lightsDown?: Maybe<Scalars["Time"]>;
  lightsUp?: Maybe<Scalars["Time"]>;
  performanceNotes?: Maybe<Scalars["String"]>;
  performanceTime?: Maybe<Scalars["Time"]>;
  preshowNotes?: Maybe<Scalars["String"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ShowreportFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ShowreportEntity = {
  __typename?: "ShowreportEntity";
  attributes?: Maybe<Showreport>;
  id?: Maybe<Scalars["ID"]>;
};

export type ShowreportEntityResponse = {
  __typename?: "ShowreportEntityResponse";
  data?: Maybe<ShowreportEntity>;
};

export type ShowreportEntityResponseCollection = {
  __typename?: "ShowreportEntityResponseCollection";
  data: Array<ShowreportEntity>;
  meta: ResponseCollectionMeta;
};

export type ShowreportFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ShowreportFiltersInput>>>;
  audienceSize?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  creator?: InputMaybe<UsersPermissionsUserFiltersInput>;
  fohClearance?: InputMaybe<TimeFilterInput>;
  houseOpen?: InputMaybe<TimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  intervalEnd?: InputMaybe<TimeFilterInput>;
  intervalStart?: InputMaybe<TimeFilterInput>;
  lightsDown?: InputMaybe<TimeFilterInput>;
  lightsUp?: InputMaybe<TimeFilterInput>;
  not?: InputMaybe<ShowreportFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ShowreportFiltersInput>>>;
  performanceNotes?: InputMaybe<StringFilterInput>;
  performanceTime?: InputMaybe<TimeFilterInput>;
  preshowNotes?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ShowreportInput = {
  audienceSize?: InputMaybe<Scalars["String"]>;
  creator?: InputMaybe<Scalars["ID"]>;
  files?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  fohClearance?: InputMaybe<Scalars["Time"]>;
  houseOpen?: InputMaybe<Scalars["Time"]>;
  intervalEnd?: InputMaybe<Scalars["Time"]>;
  intervalStart?: InputMaybe<Scalars["Time"]>;
  lightsDown?: InputMaybe<Scalars["Time"]>;
  lightsUp?: InputMaybe<Scalars["Time"]>;
  performanceNotes?: InputMaybe<Scalars["String"]>;
  performanceTime?: InputMaybe<Scalars["Time"]>;
  preshowNotes?: InputMaybe<Scalars["String"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type Showrole = {
  __typename?: "Showrole";
  createdAt?: Maybe<Scalars["DateTime"]>;
  name: Scalars["String"];
  note?: Maybe<Scalars["String"]>;
  person?: Maybe<PersonEntityResponse>;
  roleoverrides?: Maybe<RoleoverrideRelationResponseCollection>;
  rostered?: Maybe<Scalars["Boolean"]>;
  show?: Maybe<ShowEntityResponse>;
  show_role_group?: Maybe<ShowRoleGroupEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ShowroleRoleoverridesArgs = {
  filters?: InputMaybe<RoleoverrideFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ShowroleEntity = {
  __typename?: "ShowroleEntity";
  attributes?: Maybe<Showrole>;
  id?: Maybe<Scalars["ID"]>;
};

export type ShowroleEntityResponse = {
  __typename?: "ShowroleEntityResponse";
  data?: Maybe<ShowroleEntity>;
};

export type ShowroleEntityResponseCollection = {
  __typename?: "ShowroleEntityResponseCollection";
  data: Array<ShowroleEntity>;
  meta: ResponseCollectionMeta;
};

export type ShowroleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ShowroleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ShowroleFiltersInput>;
  note?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ShowroleFiltersInput>>>;
  person?: InputMaybe<PersonFiltersInput>;
  roleoverrides?: InputMaybe<RoleoverrideFiltersInput>;
  rostered?: InputMaybe<BooleanFilterInput>;
  show?: InputMaybe<ShowFiltersInput>;
  show_role_group?: InputMaybe<ShowRoleGroupFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ShowroleInput = {
  name?: InputMaybe<Scalars["String"]>;
  note?: InputMaybe<Scalars["String"]>;
  person?: InputMaybe<Scalars["ID"]>;
  roleoverrides?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  rostered?: InputMaybe<Scalars["Boolean"]>;
  show?: InputMaybe<Scalars["ID"]>;
  show_role_group?: InputMaybe<Scalars["ID"]>;
};

export type ShowroleRelationResponseCollection = {
  __typename?: "ShowroleRelationResponseCollection";
  data: Array<ShowroleEntity>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  contains?: InputMaybe<Scalars["String"]>;
  containsi?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
  eq?: InputMaybe<Scalars["String"]>;
  eqi?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  ne?: InputMaybe<Scalars["String"]>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars["String"]>;
  notContainsi?: InputMaybe<Scalars["String"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  startsWith?: InputMaybe<Scalars["String"]>;
};

export type TextDocument = {
  __typename?: "TextDocument";
  createdAt?: Maybe<Scalars["DateTime"]>;
  creator?: Maybe<UsersPermissionsUserEntityResponse>;
  slug: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
  value: Scalars["JSON"];
};

export type TextDocumentEntity = {
  __typename?: "TextDocumentEntity";
  attributes?: Maybe<TextDocument>;
  id?: Maybe<Scalars["ID"]>;
};

export type TextDocumentEntityResponse = {
  __typename?: "TextDocumentEntityResponse";
  data?: Maybe<TextDocumentEntity>;
};

export type TextDocumentEntityResponseCollection = {
  __typename?: "TextDocumentEntityResponseCollection";
  data: Array<TextDocumentEntity>;
  meta: ResponseCollectionMeta;
};

export type TextDocumentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TextDocumentFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  creator?: InputMaybe<UsersPermissionsUserFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<TextDocumentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TextDocumentFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  value?: InputMaybe<JsonFilterInput>;
};

export type TextDocumentInput = {
  creator?: InputMaybe<Scalars["ID"]>;
  slug?: InputMaybe<Scalars["String"]>;
  value?: InputMaybe<Scalars["JSON"]>;
};

export type TextDocumentSnapshot = {
  __typename?: "TextDocumentSnapshot";
  createdAt?: Maybe<Scalars["DateTime"]>;
  creator?: Maybe<UsersPermissionsUserEntityResponse>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  text_document?: Maybe<TextDocumentEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  value?: Maybe<Scalars["JSON"]>;
};

export type TextDocumentSnapshotEntity = {
  __typename?: "TextDocumentSnapshotEntity";
  attributes?: Maybe<TextDocumentSnapshot>;
  id?: Maybe<Scalars["ID"]>;
};

export type TextDocumentSnapshotEntityResponse = {
  __typename?: "TextDocumentSnapshotEntityResponse";
  data?: Maybe<TextDocumentSnapshotEntity>;
};

export type TextDocumentSnapshotEntityResponseCollection = {
  __typename?: "TextDocumentSnapshotEntityResponseCollection";
  data: Array<TextDocumentSnapshotEntity>;
  meta: ResponseCollectionMeta;
};

export type TextDocumentSnapshotFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TextDocumentSnapshotFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  creator?: InputMaybe<UsersPermissionsUserFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<TextDocumentSnapshotFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TextDocumentSnapshotFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  text_document?: InputMaybe<TextDocumentFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  value?: InputMaybe<JsonFilterInput>;
};

export type TextDocumentSnapshotInput = {
  creator?: InputMaybe<Scalars["ID"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
  text_document?: InputMaybe<Scalars["ID"]>;
  value?: InputMaybe<Scalars["JSON"]>;
};

export type TimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Time"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Time"]>>>;
  contains?: InputMaybe<Scalars["Time"]>;
  containsi?: InputMaybe<Scalars["Time"]>;
  endsWith?: InputMaybe<Scalars["Time"]>;
  eq?: InputMaybe<Scalars["Time"]>;
  eqi?: InputMaybe<Scalars["Time"]>;
  gt?: InputMaybe<Scalars["Time"]>;
  gte?: InputMaybe<Scalars["Time"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Time"]>>>;
  lt?: InputMaybe<Scalars["Time"]>;
  lte?: InputMaybe<Scalars["Time"]>;
  ne?: InputMaybe<Scalars["Time"]>;
  not?: InputMaybe<TimeFilterInput>;
  notContains?: InputMaybe<Scalars["Time"]>;
  notContainsi?: InputMaybe<Scalars["Time"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Time"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Time"]>>>;
  startsWith?: InputMaybe<Scalars["Time"]>;
};

export type UploadFile = {
  __typename?: "UploadFile";
  alternativeText?: Maybe<Scalars["String"]>;
  caption?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  ext?: Maybe<Scalars["String"]>;
  formats?: Maybe<Scalars["JSON"]>;
  hash: Scalars["String"];
  height?: Maybe<Scalars["Int"]>;
  mime: Scalars["String"];
  name: Scalars["String"];
  previewUrl?: Maybe<Scalars["String"]>;
  provider: Scalars["String"];
  provider_metadata?: Maybe<Scalars["JSON"]>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars["Float"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
  url: Scalars["String"];
  width?: Maybe<Scalars["Int"]>;
};

export type UploadFileEntity = {
  __typename?: "UploadFileEntity";
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars["ID"]>;
};

export type UploadFileEntityResponse = {
  __typename?: "UploadFileEntityResponse";
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: "UploadFileEntityResponseCollection";
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars["String"]>;
  caption?: InputMaybe<Scalars["String"]>;
  ext?: InputMaybe<Scalars["String"]>;
  folder?: InputMaybe<Scalars["ID"]>;
  folderPath?: InputMaybe<Scalars["String"]>;
  formats?: InputMaybe<Scalars["JSON"]>;
  hash?: InputMaybe<Scalars["String"]>;
  height?: InputMaybe<Scalars["Int"]>;
  mime?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  previewUrl?: InputMaybe<Scalars["String"]>;
  provider?: InputMaybe<Scalars["String"]>;
  provider_metadata?: InputMaybe<Scalars["JSON"]>;
  size?: InputMaybe<Scalars["Float"]>;
  url?: InputMaybe<Scalars["String"]>;
  width?: InputMaybe<Scalars["Int"]>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: "UploadFileRelationResponseCollection";
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: "UploadFolder";
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars["String"];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars["String"];
  pathId: Scalars["Int"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UploadFolderEntity = {
  __typename?: "UploadFolderEntity";
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars["ID"]>;
};

export type UploadFolderEntityResponse = {
  __typename?: "UploadFolderEntityResponse";
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: "UploadFolderEntityResponseCollection";
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  name?: InputMaybe<Scalars["String"]>;
  parent?: InputMaybe<Scalars["ID"]>;
  path?: InputMaybe<Scalars["String"]>;
  pathId?: InputMaybe<Scalars["Int"]>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: "UploadFolderRelationResponseCollection";
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: "UsersPermissionsCreateRolePayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: "UsersPermissionsDeleteRolePayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars["String"];
  password: Scalars["String"];
  provider?: Scalars["String"];
};

export type UsersPermissionsLoginPayload = {
  __typename?: "UsersPermissionsLoginPayload";
  jwt?: Maybe<Scalars["String"]>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: "UsersPermissionsMe";
  blocked?: Maybe<Scalars["Boolean"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  email?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  permissions?: Maybe<Scalars["String"]>;
  person?: Maybe<Person>;
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars["String"];
};

export type UsersPermissionsMeRole = {
  __typename?: "UsersPermissionsMeRole";
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  type?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: "UsersPermissionsPasswordPayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsPermission = {
  __typename?: "UsersPermissionsPermission";
  action: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: "UsersPermissionsPermissionEntity";
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars["ID"]>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: "UsersPermissionsPermissionRelationResponseCollection";
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type UsersPermissionsRole = {
  __typename?: "UsersPermissionsRole";
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};

export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: "UsersPermissionsRoleEntity";
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars["ID"]>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: "UsersPermissionsRoleEntityResponse";
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: "UsersPermissionsRoleEntityResponseCollection";
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  type?: InputMaybe<Scalars["String"]>;
  users?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: "UsersPermissionsUpdateRolePayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsUser = {
  __typename?: "UsersPermissionsUser";
  blocked?: Maybe<Scalars["Boolean"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  email: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  permissions?: Maybe<Scalars["String"]>;
  person?: Maybe<PersonEntityResponse>;
  phone?: Maybe<Scalars["String"]>;
  provider?: Maybe<Scalars["String"]>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  username: Scalars["String"];
};

export type UsersPermissionsUserEntity = {
  __typename?: "UsersPermissionsUserEntity";
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars["ID"]>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: "UsersPermissionsUserEntityResponse";
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: "UsersPermissionsUserEntityResponseCollection";
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  permissions?: InputMaybe<StringFilterInput>;
  person?: InputMaybe<PersonFiltersInput>;
  phone?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars["Boolean"]>;
  confirmationToken?: InputMaybe<Scalars["String"]>;
  confirmed?: InputMaybe<Scalars["Boolean"]>;
  email?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
  permissions?: InputMaybe<Scalars["String"]>;
  person?: InputMaybe<Scalars["ID"]>;
  phone?: InputMaybe<Scalars["String"]>;
  provider?: InputMaybe<Scalars["String"]>;
  resetPasswordToken?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<Scalars["ID"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: "UsersPermissionsUserRelationResponseCollection";
  data: Array<UsersPermissionsUserEntity>;
};

export type GetPermissionsForPersonQueryVariables = Exact<{
  personId: Scalars["ID"];
}>;

export type GetPermissionsForPersonQuery = {
  __typename?: "Query";
  person?: {
    __typename?: "PersonEntityResponse";
    data?: {
      __typename?: "PersonEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Person";
        user?: {
          __typename?: "UsersPermissionsUserEntityResponse";
          data?: {
            __typename?: "UsersPermissionsUserEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UsersPermissionsUser";
              permissions?: string | null;
            } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type CreateEventMutationVariables = Exact<{
  data: EventInput;
}>;

export type CreateEventMutation = {
  __typename?: "Mutation";
  createEvent?: {
    __typename?: "EventEntityResponse";
    data?:
      | ({ __typename?: "EventEntity"; id?: string | null } & {
          " $fragmentRefs"?: {
            EditEvent_EventFragmentFragment: EditEvent_EventFragmentFragment;
          };
        })
      | null;
  } | null;
};

export type UpdateEventMutationVariables = Exact<{
  id: Scalars["ID"];
  data: EventInput;
}>;

export type UpdateEventMutation = {
  __typename?: "Mutation";
  updateEvent?: {
    __typename?: "EventEntityResponse";
    data?:
      | ({ __typename?: "EventEntity"; id?: string | null } & {
          " $fragmentRefs"?: {
            EditEvent_EventFragmentFragment: EditEvent_EventFragmentFragment;
          };
        })
      | null;
  } | null;
};

export type DeleteEventMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteEventMutation = {
  __typename?: "Mutation";
  deleteEvent?: {
    __typename?: "EventEntityResponse";
    data?:
      | ({ __typename?: "EventEntity"; id?: string | null } & {
          " $fragmentRefs"?: {
            EditEvent_EventFragmentFragment: EditEvent_EventFragmentFragment;
          };
        })
      | null;
  } | null;
};

export type GetEventQueryVariables = Exact<{
  eventId: Scalars["ID"];
}>;

export type GetEventQuery = {
  __typename?: "Query";
  event?: {
    __typename?: "EventEntityResponse";
    data?:
      | ({ __typename?: "EventEntity" } & {
          " $fragmentRefs"?: {
            EditEvent_EventFragmentFragment: EditEvent_EventFragmentFragment;
          };
        })
      | null;
  } | null;
};

export type GetEventsQueryVariables = Exact<{
  showId: Scalars["ID"];
}>;

export type GetEventsQuery = {
  __typename?: "Query";
  events?: {
    __typename?: "EventEntityResponseCollection";
    data: Array<{
      __typename?: "EventEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Event";
        start: any;
        end?: any | null;
        name?: string | null;
        shortnote?: string | null;
        curtainsUp?: string | null;
        requiresAvailabilities?: boolean | null;
        publishedAt?: any | null;
        location?: {
          __typename?: "ComponentTestLocation";
          name?: string | null;
          address?: string | null;
          lat?: number | null;
          lng?: number | null;
        } | null;
        show?: {
          __typename?: "ShowEntityResponse";
          data?: { __typename?: "ShowEntity"; id?: string | null } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type EditEvent_EventFragmentFragment = {
  __typename?: "EventEntity";
  id?: string | null;
  attributes?: {
    __typename?: "Event";
    start: any;
    end?: any | null;
    name?: string | null;
    shortnote?: string | null;
    curtainsUp?: string | null;
    requiresAvailabilities?: boolean | null;
    publishedAt?: any | null;
    location?: {
      __typename?: "ComponentTestLocation";
      name?: string | null;
      address?: string | null;
      lat?: number | null;
      lng?: number | null;
    } | null;
    show?: {
      __typename?: "ShowEntityResponse";
      data?: {
        __typename?: "ShowEntity";
        id?: string | null;
        attributes?: { __typename?: "Show"; slug: string } | null;
      } | null;
    } | null;
  } | null;
} & { " $fragmentName"?: "EditEvent_EventFragmentFragment" };

export type GetPersonQueryVariables = Exact<{
  personId: Scalars["ID"];
}>;

export type GetPersonQuery = {
  __typename?: "Query";
  person?: {
    __typename?: "PersonEntityResponse";
    data?: {
      __typename?: "PersonEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Person";
        firstname: string;
        lastname?: string | null;
        email?: string | null;
        phone?: string | null;
        wwc?: string | null;
        dob?: any | null;
        rosterNotificationsByEmail?: boolean | null;
        rosterNotificationsByPhone?: boolean | null;
        allergies?: string | null;
        emergencyName?: string | null;
        emergencyPhone?: string | null;
        emergencyRelationship?: string | null;
        pronoun?: string | null;
        avatar?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            attributes?: {
              __typename?: "UploadFile";
              formats?: any | null;
            } | null;
          } | null;
        } | null;
        documents?: {
          __typename?: "UploadFileRelationResponseCollection";
          data: Array<{
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              url: string;
              name: string;
            } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type CreatePersonMutationVariables = Exact<{
  data: PersonInput;
}>;

export type CreatePersonMutation = {
  __typename?: "Mutation";
  createPerson?: {
    __typename?: "PersonEntityResponse";
    data?: { __typename?: "PersonEntity"; id?: string | null } | null;
  } | null;
};

export type GetPeopleQueryVariables = Exact<{ [key: string]: never }>;

export type GetPeopleQuery = {
  __typename?: "Query";
  people?: {
    __typename?: "PersonEntityResponseCollection";
    data: Array<{
      __typename?: "PersonEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Person";
        firstname: string;
        lastname?: string | null;
        avatar?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            attributes?: {
              __typename?: "UploadFile";
              formats?: any | null;
            } | null;
          } | null;
        } | null;
        shows?: {
          __typename?: "ShowRelationResponseCollection";
          data: Array<{ __typename?: "ShowEntity"; id?: string | null }>;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetPeopleForShowQueryVariables = Exact<{
  showId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetPeopleForShowQuery = {
  __typename?: "Query";
  people?: {
    __typename?: "PersonEntityResponseCollection";
    data: Array<{
      __typename?: "PersonEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Person";
        firstname: string;
        lastname?: string | null;
        avatar?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            attributes?: {
              __typename?: "UploadFile";
              formats?: any | null;
            } | null;
          } | null;
        } | null;
        shows?: {
          __typename?: "ShowRelationResponseCollection";
          data: Array<{ __typename?: "ShowEntity"; id?: string | null }>;
        } | null;
        user?: {
          __typename?: "UsersPermissionsUserEntityResponse";
          data?: {
            __typename?: "UsersPermissionsUserEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UsersPermissionsUser";
              permissions?: string | null;
            } | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetRoleGroupsQueryVariables = Exact<{
  showId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetRoleGroupsQuery = {
  __typename?: "Query";
  showRoleGroups?: {
    __typename?: "ShowRoleGroupEntityResponseCollection";
    data: Array<{
      __typename?: "ShowRoleGroupEntity";
      id?: string | null;
      attributes?: {
        __typename?: "ShowRoleGroup";
        name?: string | null;
        show_roles?: {
          __typename?: "ShowroleRelationResponseCollection";
          data: Array<{
            __typename?: "ShowroleEntity";
            id?: string | null;
            attributes?: {
              __typename?: "Showrole";
              name: string;
              rostered?: boolean | null;
              note?: string | null;
            } | null;
          }>;
        } | null;
      } | null;
    }>;
  } | null;
};

export type DeleteRoleGroupMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteRoleGroupMutation = {
  __typename?: "Mutation";
  deleteShowRoleGroup?: {
    __typename?: "ShowRoleGroupEntityResponse";
    data?: { __typename?: "ShowRoleGroupEntity"; id?: string | null } | null;
  } | null;
};

export type CreateRoleGroupMutationVariables = Exact<{
  data: ShowRoleGroupInput;
}>;

export type CreateRoleGroupMutation = {
  __typename?: "Mutation";
  createShowRoleGroup?: {
    __typename?: "ShowRoleGroupEntityResponse";
    data?: { __typename?: "ShowRoleGroupEntity"; id?: string | null } | null;
  } | null;
};

export type DeleteRoleMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteRoleMutation = {
  __typename?: "Mutation";
  deleteShowrole?: {
    __typename?: "ShowroleEntityResponse";
    data?: { __typename?: "ShowroleEntity"; id?: string | null } | null;
  } | null;
};

export type CreateRoleMutationVariables = Exact<{
  data: ShowroleInput;
}>;

export type CreateRoleMutation = {
  __typename?: "Mutation";
  createShowrole?: {
    __typename?: "ShowroleEntityResponse";
    data?: { __typename?: "ShowroleEntity"; id?: string | null } | null;
  } | null;
};

export type UpdateRoleMutationVariables = Exact<{
  id: Scalars["ID"];
  data: ShowroleInput;
}>;

export type UpdateRoleMutation = {
  __typename?: "Mutation";
  updateShowrole?: {
    __typename?: "ShowroleEntityResponse";
    data?: { __typename?: "ShowroleEntity"; id?: string | null } | null;
  } | null;
};

export type GetAvailabilitiesForPersonAndShowQueryVariables = Exact<{
  personId?: InputMaybe<Scalars["ID"]>;
  showId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetAvailabilitiesForPersonAndShowQuery = {
  __typename?: "Query";
  availabilities?: {
    __typename?: "AvailabilityEntityResponseCollection";
    data: Array<{
      __typename?: "AvailabilityEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Availability";
        available?: boolean | null;
        person?: {
          __typename?: "PersonEntityResponse";
          data?: { __typename?: "PersonEntity"; id?: string | null } | null;
        } | null;
        event?: {
          __typename?: "EventEntityResponse";
          data?: { __typename?: "EventEntity"; id?: string | null } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetAvailabilitiesForShowQueryVariables = Exact<{
  showId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetAvailabilitiesForShowQuery = {
  __typename?: "Query";
  events?: {
    __typename?: "EventEntityResponseCollection";
    data: Array<{
      __typename?: "EventEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Event";
        start: any;
        end?: any | null;
        name?: string | null;
        curtainsUp?: string | null;
        availabilities?: {
          __typename?: "AvailabilityRelationResponseCollection";
          data: Array<{
            __typename?: "AvailabilityEntity";
            id?: string | null;
            attributes?: {
              __typename?: "Availability";
              available?: boolean | null;
              person?: {
                __typename?: "PersonEntityResponse";
                data?: {
                  __typename?: "PersonEntity";
                  id?: string | null;
                } | null;
              } | null;
            } | null;
          }>;
        } | null;
      } | null;
    }>;
  } | null;
};

export type CreateAvailabilityMutationVariables = Exact<{
  data: AvailabilityInput;
}>;

export type CreateAvailabilityMutation = {
  __typename?: "Mutation";
  createAvailability?: {
    __typename?: "AvailabilityEntityResponse";
    data?: {
      __typename?: "AvailabilityEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Availability";
        available?: boolean | null;
        person?: {
          __typename?: "PersonEntityResponse";
          data?: { __typename?: "PersonEntity"; id?: string | null } | null;
        } | null;
        event?: {
          __typename?: "EventEntityResponse";
          data?: { __typename?: "EventEntity"; id?: string | null } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateAvailabilityMutationVariables = Exact<{
  id: Scalars["ID"];
  data: AvailabilityInput;
}>;

export type UpdateAvailabilityMutation = {
  __typename?: "Mutation";
  updateAvailability?: {
    __typename?: "AvailabilityEntityResponse";
    data?: {
      __typename?: "AvailabilityEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Availability";
        available?: boolean | null;
        person?: {
          __typename?: "PersonEntityResponse";
          data?: { __typename?: "PersonEntity"; id?: string | null } | null;
        } | null;
        event?: {
          __typename?: "EventEntityResponse";
          data?: { __typename?: "EventEntity"; id?: string | null } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type CreateShowMutationVariables = Exact<{
  data: ShowInput;
}>;

export type CreateShowMutation = {
  __typename?: "Mutation";
  createShow?: {
    __typename?: "ShowEntityResponse";
    data?:
      | ({ __typename?: "ShowEntity"; id?: string | null } & {
          " $fragmentRefs"?: {
            ShowBox_ShowFragmentFragment: ShowBox_ShowFragmentFragment;
          };
        })
      | null;
  } | null;
};

export type ShowBox_ShowFragmentFragment = ({
  __typename?: "ShowEntity";
  id?: string | null;
  attributes?: {
    __typename?: "Show";
    name: string;
    company?: string | null;
    slug: string;
    bannerimage?: {
      __typename?: "UploadFileEntityResponse";
      data?: {
        __typename?: "UploadFileEntity";
        attributes?: { __typename?: "UploadFile"; formats?: any | null } | null;
      } | null;
    } | null;
    events?: {
      __typename?: "EventRelationResponseCollection";
      data: Array<{
        __typename?: "EventEntity";
        attributes?: {
          __typename?: "Event";
          start: any;
          curtainsUp?: string | null;
        } | null;
      }>;
    } | null;
  } | null;
} & {
  " $fragmentRefs"?: {
    ContactForm_ShowFragmentFragment: ContactForm_ShowFragmentFragment;
  };
}) & { " $fragmentName"?: "ShowBox_ShowFragmentFragment" };

export type ContactForm_ShowFragmentFragment = {
  __typename?: "ShowEntity";
  id?: string | null;
  attributes?: {
    __typename?: "Show";
    name: string;
    company?: string | null;
    mainContact?: {
      __typename?: "PersonEntityResponse";
      data?: {
        __typename?: "PersonEntity";
        id?: string | null;
        attributes?: {
          __typename?: "Person";
          firstname: string;
          lastname?: string | null;
          email?: string | null;
        } | null;
      } | null;
    } | null;
  } | null;
} & { " $fragmentName"?: "ContactForm_ShowFragmentFragment" };

export type AssignedShowsListQueryVariables = Exact<{
  personId: Scalars["ID"];
}>;

export type AssignedShowsListQuery = {
  __typename?: "Query";
  shows?: {
    __typename?: "ShowEntityResponseCollection";
    data: Array<
      { __typename?: "ShowEntity"; id?: string | null } & {
        " $fragmentRefs"?: {
          ShowBox_ShowFragmentFragment: ShowBox_ShowFragmentFragment;
        };
      }
    >;
  } | null;
};

export type UnassignedShowsListQueryVariables = Exact<{ [key: string]: never }>;

export type UnassignedShowsListQuery = {
  __typename?: "Query";
  shows?: {
    __typename?: "ShowEntityResponseCollection";
    data: Array<
      {
        __typename?: "ShowEntity";
        id?: string | null;
        attributes?: {
          __typename?: "Show";
          crews?: {
            __typename?: "PersonRelationResponseCollection";
            data: Array<{ __typename?: "PersonEntity"; id?: string | null }>;
          } | null;
        } | null;
      } & {
        " $fragmentRefs"?: {
          ShowBox_ShowFragmentFragment: ShowBox_ShowFragmentFragment;
        };
      }
    >;
  } | null;
};

export type ShowSummaryQueryVariables = Exact<{
  slug?: InputMaybe<Scalars["String"]>;
}>;

export type ShowSummaryQuery = {
  __typename?: "Query";
  shows?: {
    __typename?: "ShowEntityResponseCollection";
    data: Array<{
      __typename?: "ShowEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Show";
        name: string;
        slug: string;
        company?: string | null;
      } | null;
    }>;
  } | null;
};

export type LoginMutationVariables = Exact<{
  identifier: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UsersPermissionsLoginPayload";
    jwt?: string | null;
    user: {
      __typename?: "UsersPermissionsMe";
      id: string;
      email?: string | null;
      confirmed?: boolean | null;
      blocked?: boolean | null;
      permissions?: string | null;
    };
  };
};

export type GetMeQueryVariables = Exact<{
  userId: Scalars["ID"];
}>;

export type GetMeQuery = {
  __typename?: "Query";
  people?: {
    __typename?: "PersonEntityResponseCollection";
    data: Array<{
      __typename?: "PersonEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Person";
        firstname: string;
        lastname?: string | null;
        email?: string | null;
        phone?: string | null;
        avatar?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            attributes?: {
              __typename?: "UploadFile";
              formats?: any | null;
            } | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetPersonForUnlinkQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]>;
}>;

export type GetPersonForUnlinkQuery = {
  __typename?: "Query";
  person?: {
    __typename?: "PersonEntityResponse";
    data?: {
      __typename?: "PersonEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Person";
        shows?: {
          __typename?: "ShowRelationResponseCollection";
          data: Array<{ __typename?: "ShowEntity"; id?: string | null }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type UpdatePersonMutationVariables = Exact<{
  id: Scalars["ID"];
  data: PersonInput;
}>;

export type UpdatePersonMutation = {
  __typename?: "Mutation";
  updatePerson?: {
    __typename?: "PersonEntityResponse";
    data?: {
      __typename?: "PersonEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Person";
        shows?: {
          __typename?: "ShowRelationResponseCollection";
          data: Array<{ __typename?: "ShowEntity"; id?: string | null }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateUserPermissionsMutationVariables = Exact<{
  id: Scalars["ID"];
  data: UsersPermissionsUserInput;
}>;

export type UpdateUserPermissionsMutation = {
  __typename?: "Mutation";
  updateUsersPermissionsUser: {
    __typename?: "UsersPermissionsUserEntityResponse";
    data?: {
      __typename?: "UsersPermissionsUserEntity";
      id?: string | null;
      attributes?: {
        __typename?: "UsersPermissionsUser";
        permissions?: string | null;
      } | null;
    } | null;
  };
};

export const EditEvent_EventFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EditEvent_EventFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "EventEntity" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "attributes" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "start" } },
                { kind: "Field", name: { kind: "Name", value: "end" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "shortnote" } },
                { kind: "Field", name: { kind: "Name", value: "curtainsUp" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "requiresAvailabilities" },
                },
                { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "location" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "lat" } },
                      { kind: "Field", name: { kind: "Name", value: "lng" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "show" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "data" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "attributes" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "slug" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EditEvent_EventFragmentFragment, unknown>;
export const ContactForm_ShowFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ContactForm_ShowFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ShowEntity" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "attributes" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "mainContact" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "data" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "attributes" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "firstname" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "lastname" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "email" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "company" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContactForm_ShowFragmentFragment, unknown>;
export const ShowBox_ShowFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ShowBox_ShowFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ShowEntity" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "attributes" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "company" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "bannerimage" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "data" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "attributes" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "formats" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "events" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "pagination" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "limit" },
                            value: { kind: "IntValue", value: "100" },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "data" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "attributes" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "start" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "curtainsUp" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "ContactForm_ShowFragment" },
          },
        ],
      },
    },
    ...ContactForm_ShowFragmentFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ShowBox_ShowFragmentFragment, unknown>;
export const GetPermissionsForPersonDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPermissionsForPerson" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "personId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "person" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "personId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "user" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "attributes",
                                          },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "permissions",
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPermissionsForPersonQuery,
  GetPermissionsForPersonQueryVariables
>;
export const CreateEventDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateEvent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "EventInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createEvent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "EditEvent_EventFragment",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...EditEvent_EventFragmentFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<CreateEventMutation, CreateEventMutationVariables>;
export const UpdateEventDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateEvent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "EventInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateEvent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "EditEvent_EventFragment",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...EditEvent_EventFragmentFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UpdateEventMutation, UpdateEventMutationVariables>;
export const DeleteEventDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteEvent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteEvent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "EditEvent_EventFragment",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...EditEvent_EventFragmentFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<DeleteEventMutation, DeleteEventMutationVariables>;
export const GetEventDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetEvent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "eventId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "event" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "eventId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "EditEvent_EventFragment",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...EditEvent_EventFragmentFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetEventQuery, GetEventQueryVariables>;
export const GetEventsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetEvents" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "showId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "events" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "show" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "id" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "showId" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "pagination" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "limit" },
                      value: { kind: "IntValue", value: "100" },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "start" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "end" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "shortnote" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "curtainsUp" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "requiresAvailabilities",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "publishedAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "location" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "address" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "lat" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "lng" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "show" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetEventsQuery, GetEventsQueryVariables>;
export const GetPersonDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getPerson" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "personId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "person" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "personId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstname" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastname" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "phone" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "wwc" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "dob" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "rosterNotificationsByEmail",
                              },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "rosterNotificationsByPhone",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "allergies" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "emergencyName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "emergencyPhone" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "emergencyRelationship",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "pronoun" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "avatar" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "attributes",
                                          },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "formats",
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "documents" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "attributes",
                                          },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "url",
                                                },
                                              },
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "name",
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPersonQuery, GetPersonQueryVariables>;
export const CreatePersonDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreatePerson" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PersonInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createPerson" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreatePersonMutation,
  CreatePersonMutationVariables
>;
export const GetPeopleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPeople" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "people" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstname" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastname" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "avatar" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "attributes",
                                          },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "formats",
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "shows" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPeopleQuery, GetPeopleQueryVariables>;
export const GetPeopleForShowDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPeopleForShow" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "showId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "people" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "shows" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "id" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "showId" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstname" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastname" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "avatar" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "attributes",
                                          },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "formats",
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "shows" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "user" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "attributes",
                                          },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "permissions",
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPeopleForShowQuery,
  GetPeopleForShowQueryVariables
>;
export const GetRoleGroupsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetRoleGroups" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "showId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "showRoleGroups" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "show" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "id" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "showId" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "show_roles" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "attributes",
                                          },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "name",
                                                },
                                              },
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "rostered",
                                                },
                                              },
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "note",
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetRoleGroupsQuery, GetRoleGroupsQueryVariables>;
export const DeleteRoleGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteRoleGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteShowRoleGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteRoleGroupMutation,
  DeleteRoleGroupMutationVariables
>;
export const CreateRoleGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateRoleGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ShowRoleGroupInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createShowRoleGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateRoleGroupMutation,
  CreateRoleGroupMutationVariables
>;
export const DeleteRoleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteRole" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteShowrole" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteRoleMutation, DeleteRoleMutationVariables>;
export const CreateRoleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateRole" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ShowroleInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createShowrole" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateRoleMutation, CreateRoleMutationVariables>;
export const UpdateRoleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateRole" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ShowroleInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateShowrole" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const GetAvailabilitiesForPersonAndShowDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAvailabilitiesForPersonAndShow" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "personId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "showId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "availabilities" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "person" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "id" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "personId" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "event" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "show" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "id" },
                                  value: {
                                    kind: "ObjectValue",
                                    fields: [
                                      {
                                        kind: "ObjectField",
                                        name: { kind: "Name", value: "eq" },
                                        value: {
                                          kind: "Variable",
                                          name: {
                                            kind: "Name",
                                            value: "showId",
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "available" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "person" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "event" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAvailabilitiesForPersonAndShowQuery,
  GetAvailabilitiesForPersonAndShowQueryVariables
>;
export const GetAvailabilitiesForShowDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAvailabilitiesForShow" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "showId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "events" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "show" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "id" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "showId" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: {
                  kind: "StringValue",
                  value: "start:asc",
                  block: false,
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "start" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "end" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "curtainsUp" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "availabilities" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "attributes",
                                          },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "available",
                                                },
                                              },
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "person",
                                                },
                                                selectionSet: {
                                                  kind: "SelectionSet",
                                                  selections: [
                                                    {
                                                      kind: "Field",
                                                      name: {
                                                        kind: "Name",
                                                        value: "data",
                                                      },
                                                      selectionSet: {
                                                        kind: "SelectionSet",
                                                        selections: [
                                                          {
                                                            kind: "Field",
                                                            name: {
                                                              kind: "Name",
                                                              value: "id",
                                                            },
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAvailabilitiesForShowQuery,
  GetAvailabilitiesForShowQueryVariables
>;
export const CreateAvailabilityDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateAvailability" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AvailabilityInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createAvailability" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "available" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "person" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "event" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateAvailabilityMutation,
  CreateAvailabilityMutationVariables
>;
export const UpdateAvailabilityDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateAvailability" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AvailabilityInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateAvailability" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "available" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "person" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "event" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateAvailabilityMutation,
  UpdateAvailabilityMutationVariables
>;
export const CreateShowDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateShow" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ShowInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createShow" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ShowBox_ShowFragment" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...ShowBox_ShowFragmentFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<CreateShowMutation, CreateShowMutationVariables>;
export const AssignedShowsListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AssignedShowsList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "personId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "shows" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "crews" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "id" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "personId" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ShowBox_ShowFragment" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...ShowBox_ShowFragmentFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  AssignedShowsListQuery,
  AssignedShowsListQueryVariables
>;
export const UnassignedShowsListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "UnassignedShowsList" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "shows" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ShowBox_ShowFragment" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "crews" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...ShowBox_ShowFragmentFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  UnassignedShowsListQuery,
  UnassignedShowsListQueryVariables
>;
export const ShowSummaryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ShowSummary" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "slug" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "shows" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "slug" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "slug" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "slug" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "company" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ShowSummaryQuery, ShowSummaryQueryVariables>;
export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "identifier" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "identifier" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "identifier" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "password" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "password" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "jwt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "confirmed" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "blocked" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "permissions" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GetMeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getMe" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "people" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "user" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "id" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "userId" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstname" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastname" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "phone" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "avatar" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "attributes",
                                          },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "formats",
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const GetPersonForUnlinkDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPersonForUnlink" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "person" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "shows" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPersonForUnlinkQuery,
  GetPersonForUnlinkQueryVariables
>;
export const UpdatePersonDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdatePerson" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PersonInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePerson" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "shows" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdatePersonMutation,
  UpdatePersonMutationVariables
>;
export const UpdateUserPermissionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateUserPermissions" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UsersPermissionsUserInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateUsersPermissionsUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "permissions" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateUserPermissionsMutation,
  UpdateUserPermissionsMutationVariables
>;
