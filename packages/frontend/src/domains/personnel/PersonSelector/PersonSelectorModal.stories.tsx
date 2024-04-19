import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { PersonSelectorModal } from "./PersonSelectorModal";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Person Selector Modal",
  component: PersonSelectorModal,
} as ComponentMeta<typeof PersonSelectorModal>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof PersonSelectorModal> = (args) => (
  <table className="table">
    <tbody>
      <tr>
        <PersonSelectorModal {...args} key="1" />
      </tr>
    </tbody>
  </table>
);

export const Simple = Template.bind({});
Simple.args = {
  people: [
    {
      id: "0",
      firstName: "Jane",
      lastName: "Smith",
    },
    {
      id: "1",
      firstName: "Jhon",
      lastName: "Smith",
    },
    {
      id: "1",
      firstName: "Jhon",
      lastName: "Smith",
    },
    {
      id: "1",
      firstName: "Jhon",
      lastName: "Smith",
    },
    {
      id: "1",
      firstName: "Jhon",
      lastName: "Smith",
    },
    {
      id: "1",
      firstName: "Jhon",
      lastName: "Smith",
    },
    {
      id: "1",
      firstName: "Jhon",
      lastName: "Smith",
    },
    {
      id: "1",
      firstName: "Jhon",
      lastName: "Smith",
    },
    {
      id: "1",
      firstName: "Jhon",
      lastName: "Smith",
    },
    {
      id: "1",
      firstName: "Jhon",
      lastName: "Smith",
    },
    {
      id: "1",
      firstName: "Jhon",
      lastName: "Smith",
    },
    {
      id: "1",
      firstName: "Jhon",
      lastName: "Smith",
    },
    {
      id: "1",
      firstName: "Jhon",
      lastName: "Smith",
    },
    {
      id: "1",
      firstName: "Jhon",
      lastName: "Smith",
    },
  ],
};
