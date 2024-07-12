import type { Meta, StoryObj } from "@storybook/react";
import { PersonDTO, PersonPrivateDetailsDTO } from "core/api/generated";

import { PersonCard } from "./PersonCard";

const meta: Meta<typeof PersonCard> = {
  component: PersonCard,
};

export default meta;
type Story = StoryObj<typeof PersonCard>;

const person: PersonDTO = {
  id: "1",
  firstName: "John",
  preferredName: "Jim",
  pronouns: "He/Him",
  lastName: "Smith",
};

const privateDetails: PersonPrivateDetailsDTO = {
  email: "John.Smith@test.com",
  phone: "0444 444 444",
  dob: new Date("1999-01-01"),
  allergies: "Penuts",
  emergencyContact: {
    name: "Joan Smith",
    relationship: "Partner",
    phone: "0444 444 444",
  },
};

export const Primary: Story = {
  render: () => <PersonCard person={person} privateDetails={privateDetails} />,
};
