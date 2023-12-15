import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SessionProvider } from "next-auth/react";

import { Footer } from "./Footer";

export default {
  title: "Footer",
  component: Footer,
  decorators: [
    (Story) => {
      return (
        <SessionProvider>
          <Story />
        </SessionProvider>
      );
    },
  ],
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => <Footer />;

export const Primary = Template.bind({});

Primary.args = {};
