import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Reveal } from '.';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Reveal',
  component: Reveal,
  parameters: {},
} as ComponentMeta<typeof Reveal>;

const Template: ComponentStory<typeof Reveal> = (args) => <Reveal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Hover on me',
  children: <p>Show hidden content!</p>,
};
