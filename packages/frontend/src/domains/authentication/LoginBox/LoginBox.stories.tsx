import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SessionProvider } from "next-auth/react";
import React from "react";

import { LoginBox } from "./LoginBox";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Authentication/LoginBox",
  component: LoginBox,
  decorators: [
    (Story) => {
      return (
        <SessionProvider>
          <Story />
        </SessionProvider>
      );
    },
  ],
} as ComponentMeta<typeof LoginBox>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof LoginBox> = (args) => (
  <LoginBox {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};

export const Signup = Template.bind({});

Signup.args = { signup: true };
