import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Chip } from './Chip';

const meta = {
  title: 'shared/ui/Chip',
  component: Chip,
  args: {
    children: '월',
    onClick: fn(),
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const TogglesOnClick: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole('button', { name: '월' });
    await userEvent.click(chip);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
