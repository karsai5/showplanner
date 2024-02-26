import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ShowTimer } from './ShowTimer';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'ShowTimer',
  component: ShowTimer,
} as ComponentMeta<typeof ShowTimer>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ShowTimer> = (args) => (
  <ShowTimer {...args} />
);

export const Initial = Template.bind({});

Initial.args = {};
