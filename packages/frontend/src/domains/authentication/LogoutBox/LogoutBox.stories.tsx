import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { LogoutBox } from "./LogoutBox";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Authentication/LogoutBox",
  component: LogoutBox,
} as ComponentMeta<typeof LogoutBox>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof LogoutBox> = (args) => (
  <LogoutBox {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};
