import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ShowSummaryDTO } from "core/api/generated";
import React from "react";

import { ShowBox } from "./ShowBox";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "ShowBox",
  component: ShowBox,
} as ComponentMeta<typeof ShowBox>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ShowBox> = (args) => (
  <ShowBox {...args} />
);

export const Simple = Template.bind({});

const show: ShowSummaryDTO = {
  id: 0,
  name: "🎙️Jersey Boys",
  company: "Willoughby Theatre Company",
  slug: "jersey",
};

Simple.args = {
  show: show,
};
