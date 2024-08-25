import type { Meta, StoryObj } from "@storybook/react";

import { RosterWarning } from "./RosterWarning";

const meta: Meta<typeof RosterWarning> = {
  component: RosterWarning,
};

export default meta;

type Story = StoryObj<typeof RosterWarning>;

export const Primary: Story = {
  args: {},
};
