import type { Meta, StoryObj } from "@storybook/react";
import { PersonPrivateDetailsDTO,PersonSummaryDTO } from "core/api/generated";

import { PersonCard } from "./PersonCard";

const meta: Meta<typeof PersonCard> = {
  component: PersonCard,
};

export default meta;
type Story = StoryObj<typeof PersonCard>;

const person: PersonSummaryDTO = {
  id: "1",
  firstName: "John",
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
