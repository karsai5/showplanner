// import 'semantic-ui-css/semantic.min.css';

import '../src/styles/globals.css';
import * as NextImage from 'next/image';
import { SessionProvider } from 'next-auth/react';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
};

export const decorators = [
  (Story) => (
    <SessionProvider>
      <Story />
    </SessionProvider>
  ),
];
