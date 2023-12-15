import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ShowBox } from "./ShowBox";
import exampleBannerImage from "./static/example-bannerimage.jpeg";

const futureEvents = {
  data: [
    {
      attributes: {
        start: new Date("2025-03-02"),
        type: "show",
      },
    },
    {
      attributes: {
        start: new Date("2025-03-05"),
        type: "show",
      },
    },
  ],
};

const pastEvents = {
  data: [
    {
      attributes: {
        start: new Date("2018-03-02"),
        type: "show",
      },
    },
    {
      attributes: {
        start: new Date("2018-03-05"),
        type: "show",
      },
    },
  ],
};

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "ShowBox",
  component: ShowBox,
} as ComponentMeta<typeof ShowBox>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ShowBox> = (args) => (
  <ShowBox {...args} />
);

export const Simple = Template.bind({});

Simple.args = {
  show: {
    id: "1",
    attributes: {
      name: "👠 Priscilla",
      company: "Willoughby Theatre Company",
      events: futureEvents,
      slug: "priscilla",
      crews: [],
    },
  } as any,
};

export const ExpressionOfInterest = Template.bind({});

ExpressionOfInterest.args = {
  show: {
    id: "1",
    attributes: {
      name: "👠 Priscilla",
      company: "Willoughby Theatre Company",
      events: futureEvents,
      slug: "priscilla",
      crews: [],
      mainContact: {
        data: {
          attributes: {
            firstname: "Linus",
            lastname: "Karsai",
          },
        },
      },
    },
  } as any,
  expressionOfInterest: true,
};

export const PastEvent = Template.bind({});

PastEvent.args = {
  show: {
    id: "1",
    attributes: {
      name: "👠 Priscilla",
      company: "Willoughby Theatre Company",
      events: pastEvents,
      slug: "priscilla",
      crews: [],
    },
  } as any,
};

export const WithImage = Template.bind({});

WithImage.args = {
  show: {
    id: "1",
    attributes: {
      name: "👠 Priscilla",
      company: "Willoughby Theatre Company",
      events: futureEvents,
      slug: "priscilla",
      crews: [],
      bannerimage: {
        id: 5,
        name: "download (1).jpeg",
        alternativeText: "",
        caption: "",
        width: 1536,
        height: 864,
        formats: {
          medium: {
            ext: ".jpeg",
            url: exampleBannerImage,
            hash: "medium_download_1_f7bead2c12",
            mime: "image/jpeg",
            name: "medium_download (1).jpeg",
            path: null,
            size: 52.86,
            width: 750,
            height: 422,
          },
        },
      },
    },
  } as any,
};
