import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getShowPermissionString, PERMISSIONS } from "core/permissions";
import { SessionProvider } from "next-auth/react";

import NavBar from "./Navbar";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "NavBar",
  component: NavBar,
  decorators: [
    (Story) => {
      return (
        <SessionProvider>
          <Story />
        </SessionProvider>
      );
    },
  ],
} as ComponentMeta<typeof NavBar>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

const shows = [
  { name: "Priscilla", slug: "priscilla" },
  { name: "👠 Kinky Boots", slug: "boots" },
];

export const WithoutShow = Template.bind({});

WithoutShow.args = { shows };

export const WithShow = Template.bind({});

WithShow.args = {
  show: {
    slug: "priscilla",
    name: "Priscilla",
  },
  shows,
};

export const WithPermissions = Template.bind({});

WithPermissions.args = {
  show: {
    slug: "priscilla",
    name: "Priscilla",
  },
  shows,
  user: {
    permissions: [
      getShowPermissionString("priscilla", "personnel"),
      PERMISSIONS.PERSONNEL.value,
      PERMISSIONS.LOCATIONS_EDIT.value,
      // PERMISSIONS.APPLICATION_EVENTS.value,
    ].join(","),
  } as any,
};

export const LoggedIn = Template.bind({});

LoggedIn.args = {
  show: {
    slug: "priscilla",
    name: "Priscilla",
  },
  shows,
  user: {
    permissions: [
      getShowPermissionString("priscilla", "personnel"),
      PERMISSIONS.PERSONNEL.value,
      PERMISSIONS.LOCATIONS_EDIT.value,
      // PERMISSIONS.APPLICATION_EVENTS.value,
    ].join(","),
    person: {
      id: "1",
      firstname: "John",
      lastname: "Smith",
      avatar: {
        formats: {
          thumbnail: {
            url: "/uploads/thumbnail_Clean_Shot_2022_01_01_at_16_45_10_2x_7b2b0c6616.png",
          },
        },
      },
    },
  } as any,
};
