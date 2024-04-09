import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ShadowSelectorPure } from "./ShadowSelector";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Rostering/ShadowSelector",
  component: ShadowSelectorPure,
} as ComponentMeta<typeof ShadowSelectorPure>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ShadowSelectorPure> = (args) => (
  <ShadowSelectorPure {...args} />
);

export const Simple = Template.bind({});

Simple.args = {
  event: {
    id: 0,
    start: new Date(),
    shadows: {
      0: [
        {
          id: 0,
          person: {
            id: "0",
            firstName: "Jane",
            lastName: "Smith",
          },
          available: true,
        },
      ],
    },
  },
  roleId: 0,
  people: [],
};

export const NoShadows = Template.bind({});

NoShadows.args = {
  event: {
    id: 0,
    start: new Date(),
    shadows: {
      0: [],
    },
  },
  roleId: 0,
  people: [],
};
