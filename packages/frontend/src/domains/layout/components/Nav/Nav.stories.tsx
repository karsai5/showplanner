import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Nav } from './Nav';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Nav',
  component: Nav,
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
} as ComponentMeta<typeof Nav>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Nav> = (args) => <Nav {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
