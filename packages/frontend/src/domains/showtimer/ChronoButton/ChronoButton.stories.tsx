import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChronoButton } from "./ChronoButton";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "ChronoButton",
  component: ChronoButton,
} as ComponentMeta<typeof ChronoButton>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ChronoButton> = (args) => (
  <ChronoButton {...args} />
);

export const Initial = Template.bind({});

Initial.args = {};

export const SavedState = Template.bind({});

SavedState.args = { id: "storybook" };
