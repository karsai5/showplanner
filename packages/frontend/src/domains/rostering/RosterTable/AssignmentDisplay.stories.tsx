import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { AssignmentDisplay } from "./AssignmentCell";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Assignment Display",
  component: AssignmentDisplay,
} as ComponentMeta<typeof AssignmentDisplay>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof AssignmentDisplay> = (args) => (
  <div className="bg-blue-200 w-40 h-20">
    <AssignmentDisplay {...args} key="1" />
  </div>
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
    cover: true,
  },
  shadows: {},
  roleId: 123,
};
