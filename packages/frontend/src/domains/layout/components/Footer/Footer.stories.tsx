import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Footer } from "./Footer";

export default {
  title: "Footer",
  component: Footer,
  decorators: [
    (Story) => {
      return (
        <Story />
      );
    },
  ],
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => <Footer />;

export const Primary = Template.bind({});

Primary.args = {};
