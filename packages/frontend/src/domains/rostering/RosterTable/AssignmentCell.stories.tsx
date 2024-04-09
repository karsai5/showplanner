import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { PureAssignmentCell } from "./AssignmentCell";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "AssignmentCell",
  component: PureAssignmentCell,
} as ComponentMeta<typeof PureAssignmentCell>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof PureAssignmentCell> = (args) => (
  <PureAssignmentCell {...args} />
);

export const Simple = Template.bind({});

Simple.args = {
  assignment: {
    person: {
      id: "0",
      firstName: "John",
      lastName: "Really really long last name",
    },
    assignmentId: 0,
    available: true,
    cover: false,
  },
  people: [
    {
      id: "0",
      firstName: "Jane",
      lastName: "Smith",
    },
    {
      id: "1",
      firstName: "Alice",
      lastName: "Cooper",
    },
  ],
  onChangeAssigned: () => {},
  isLoading: false,
  event: {
    id: 0,
    start: new Date(),
    shadows: { "0": [] },
  },
};
