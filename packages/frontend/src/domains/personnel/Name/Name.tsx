import { Avatar } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { MailLink, PhoneLink } from "core/components/links";
import { Pronoun } from "core/components/Pronoun";
import { Reveal } from "core/components/Reveal";
import { API_URL, GRAPHQL_URL } from "core/config";
import { graphql } from "core/gql";
import request from "graphql-request";
import md5 from "md5";
import Link from "next/link";
import React from "react";
import { Grid, Header, Icon, Popup } from "semantic-ui-react";

import {
  AvatarContainer,
  Body,
  CrewAreas,
  NameWrapper,
  PronounContainer,
} from "./styles";

type IncompletePerson = {
  id: string;
  firstname: string;
  lastname: string;
};

const getPerson = graphql(`
  query getPerson($personId: ID!) {
    person(id: $personId) {
      data {
        id
        attributes {
          firstname
          lastname
          email
          phone
          wwc
          dob
          rosterNotificationsByEmail
          rosterNotificationsByPhone
          allergies
          emergencyName
          emergencyPhone
          emergencyRelationship
          pronoun
          avatar {
            data {
              attributes {
                formats
              }
            }
          }
          documents {
            data {
              id
              attributes {
                url
                name
              }
            }
          }
        }
      }
    }
  }
`);

export const RosterLink: React.FunctionComponent<
  React.PropsWithChildren<{
    showSlug: string;
    personId: string;
  }>
> = ({ showSlug, personId: crewId }) => {
  return (
    <a
      href={`/shows/${showSlug}/crew/${crewId}/roster`}
      style={{ whiteSpace: "nowrap" }}
    >
      <Icon name="columns" color="blue" />
      Roster
    </a>
  );
};

export const getAvatarUrl = (person?: any & { emailHash?: string }) => {
  if (!person) {
    return undefined;
  }
  if (person?.avatar) {
    return `${API_URL}/${person?.avatar?.formats?.thumbnail?.url}`;
  }

  const emailMd5 = md5(`${person.firstname}${person.lastname}`);
  return `https://robohash.org/${emailMd5}.jpg?size=150x150&bgset=bg1`;
};

const PopupContent: React.FunctionComponent<
  React.PropsWithChildren<{
    person: IncompletePerson;
  }>
> = ({ person: incompletePerson }) => {
  const { data, isLoading, isError } = useQuery(["person"], async () =>
    request(GRAPHQL_URL, getPerson, {
      personId: incompletePerson.id,
    })
  );
  const person = data?.person?.data?.attributes;
  const personLink = "/";

  if (!person) {
    return null;
  }

  const { phone, email, pronoun } = person;

  return (
    <Grid>
      <Avatar src={getAvatarUrl(incompletePerson)} />
      <Body>
        <Header>
          <Link href={personLink}>
            {incompletePerson.firstname} {incompletePerson.lastname}
          </Link>
          {isError ? <CrewAreas>Error getting person details</CrewAreas> : null}
          {person ? (
            <>
              {pronoun ? (
                <PronounContainer>
                  {" "}
                  (<Pronoun pronoun={pronoun} />)
                </PronounContainer>
              ) : null}
            </>
          ) : null}
        </Header>
        {isLoading && <Icon name="spinner" size="large" color="grey" loading />}
        {person && (
          <>
            <div>
              <PhoneLink number={phone} />
            </div>
            <div>
              <MailLink email={email} />
            </div>
            <Reveal text="Medical details">
              <div>
                <Icon name="medkit" />{" "}
                {person.allergies ? person.allergies : "N/A"}
              </div>
              <div>
                <Icon name="emergency" /> {person.emergencyName} /{" "}
                {person.emergencyPhone} / {person.emergencyRelationship}
              </div>
            </Reveal>
          </>
        )}
      </Body>
    </Grid>
  );
};

export const Name: React.FunctionComponent<
  React.PropsWithChildren<{
    person?: IncompletePerson | null;
    avatar?: boolean;
    short?: boolean;
    noLastName?: boolean;
    avatarPosition?: "left" | "right";
    className?: string;
    nopopup?: boolean;
    open?: boolean;
    bigAvatar?: boolean;
    style?: any;
    inline?: boolean;
  }>
> = ({
  person,
  avatar,
  short,
  open,
  noLastName,
  avatarPosition = "left",
  className,
  nopopup = false,
  bigAvatar = false,
  inline = false,
  style,
}) => {
  if (!person) {
    return null;
  }

  const avatarImage = getAvatarUrl(person);

  const showLastName = person.lastname && !noLastName;

  const lastName = short
    ? person?.lastname?.charAt(0)?.toUpperCase()
    : person?.lastname;

  const NameWithAvatar = (props: any) => {
    return (
      <NameWrapper
        className={"name-container " + className}
        style={style}
        inline={inline}
        {...props}
      >
        {avatar && avatarPosition === "left" && (
          <AvatarContainer src={avatarImage} bigAvatar={bigAvatar} />
        )}{" "}
        <span className="name">
          {person.firstname} {showLastName && lastName}
        </span>
        {avatar && avatarPosition === "right" && (
          <AvatarContainer
            src={avatarImage}
            style={{ marginLeft: "0.5rem" }}
            bigAvatar={bigAvatar}
          />
        )}
      </NameWrapper>
    );
  };

  return !nopopup ? (
    <Popup basic hoverable trigger={<NameWithAvatar />} open={open} wide>
      <PopupContent person={person} />
    </Popup>
  ) : (
    <NameWithAvatar />
  );
};
