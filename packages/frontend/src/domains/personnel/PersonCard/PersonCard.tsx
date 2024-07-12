import {
  CalendarIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  PersonPrivateDetailsDTO,
  PersonPrivateDetailsDTOEmergencyContact,
} from "core/api/generated";
import dayjs from "dayjs";
import { PersonDetails } from "domains/personnel/types/PersonDetails";
import React, { useState } from "react";

export const PersonCard: React.FC<{
  person: PersonDetails;
  privateDetails: PersonPrivateDetailsDTO;
}> = ({ person, privateDetails }) => {
  let name = person.firstName;
  if (person.preferredName) {
    name = name + ` (${person.preferredName})`;
  }
  name = name + ` ${person.lastName}`;

  return (
    <div>
      <div className="text-lg font-bold mb-2">{name}</div>
      <ul className="mb-2">
        <Pronouns pronouns={person.pronouns} />
        <Email email={privateDetails.email} />
        <Phone phone={privateDetails.phone} />
        <Age dob={privateDetails.dob} />
      </ul>
      <Allergies allergies={privateDetails.allergies} />
      <EmergencyContact contact={privateDetails.emergencyContact} />
      <div className="mt-4">
        <a
          href={`tel:${privateDetails.phone}`}
          className="btn min-w-40 btn-outline mr-2"
        >
          <PhoneIcon className="h-5 w-5" />
          Call
        </a>
        <a
          href={`mailto:${privateDetails.email}`}
          className="btn min-w-40 btn-outline"
        >
          <EnvelopeIcon className="h-5 w-5" />
          Email
        </a>
      </div>
    </div>
  );
};

const Pronouns: React.FC<{ pronouns?: string }> = ({ pronouns }) => {
  if (!pronouns) {
    return null;
  }
  return (
    <li className="flex items-center">
      <UserIcon className="h-5 w-5 inline mr-1" />
      {pronouns}
    </li>
  );
};

const Email: React.FC<{ email?: string }> = ({ email }) => {
  if (!email) {
    return null;
  }
  return (
    <li>
      <a href={`mailto:${email}`} className="link flex items-center">
        <EnvelopeIcon className="h-5 w-5 inline mr-1" />
        {email}
      </a>
    </li>
  );
};

const Phone: React.FC<{ phone?: string }> = ({ phone }) => {
  if (!phone) {
    return null;
  }
  return (
    <li>
      <a href={`tel:${phone}`} className="link flex items-center">
        <PhoneIcon className="h-5 w-5 inline mr-1" />
        {phone}
      </a>
    </li>
  );
};

const Age: React.FC<{ dob?: Date }> = ({ dob }) => {
  const [showDob, setShowDob] = useState(false);
  if (!dob) {
    return null;
  }
  const age = dayjs().diff(dayjs(dob), "years");
  const formattedDob = dayjs(dob).format("DD/MM/YYYY");
  return (
    <li
      className="flex items-center cursor-pointer"
      onClick={() => setShowDob(!showDob)}
    >
      <CalendarIcon className="h-5 w-5 inline mr-2" />
      {showDob ? `${formattedDob} (${age} years old)` : ageDescription(age)}
    </li>
  );
};

const ageDescription = (age: number): string => {
  switch (true) {
    case age < 16:
      return "Child";
    case age < 18:
      return "Young Adult";
    default:
      return "Adult";
  }
};

const Allergies: React.FC<{ allergies?: string }> = ({ allergies }) => {
  if (!allergies) {
    return null;
  }
  return (
    <div>
      <span className="font-bold">Allergies:</span> {allergies}
    </div>
  );
};

const EmergencyContact: React.FC<{
  contact?: PersonPrivateDetailsDTOEmergencyContact;
}> = ({ contact }) => {
  if (!contact) {
    return null;
  }
  return (
    <div>
      <span className="font-bold">Emergency Contact:</span> {contact.name} /{" "}
      {contact.relationship} / {contact.phone}
    </div>
  );
};
