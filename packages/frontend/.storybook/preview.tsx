import '../src/styles/globals.css';
import React from 'react';
import type { Preview } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { googleMapsScriptUrl } from "core/maps/maps";
import Script from "next/script";

import { withThemeByDataAttribute } from "@storybook/addon-themes";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-mode',
    }),
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <SessionProvider>
          <Script src={googleMapsScriptUrl}></Script>
          <QueryClientProvider client={queryClient}>
            <Story />
          </QueryClientProvider>
        </SessionProvider>
      );
    },
  ]
};

export default preview;
