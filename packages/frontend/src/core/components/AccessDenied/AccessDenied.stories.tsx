import type { Meta, StoryObj } from '@storybook/react';

import { AccessDenied } from './AccessDenied';

const meta: Meta<typeof AccessDenied> = {
  title: 'AccessDenied',
  component: AccessDenied,
};

export default meta;
type Story = StoryObj<typeof AccessDenied>;

export const Default: Story = {};
