import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { FreeDayChips } from './FreeDayChips';
import type { DayOfWeek } from '../type';

function FreeDayChipsDemo({
  initialValue = [],
  error,
}: {
  initialValue?: DayOfWeek[];
  error?: string;
}) {
  const [value, setValue] = useState<DayOfWeek[]>(initialValue);
  return <FreeDayChips value={value} onChange={setValue} error={error} />;
}

const meta = {
  title: 'features/timetable/FreeDayChips',
  component: FreeDayChipsDemo,
} satisfies Meta<typeof FreeDayChipsDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithSelection: Story = {
  args: { initialValue: ['WED', 'FRI'] },
};

export const WithError: Story = {
  args: { error: '공강 요일은 최대 2개까지 선택할 수 있습니다.' },
};

export const BlocksSelectingMoreThanTwo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '월' }));
    await userEvent.click(canvas.getByRole('button', { name: '화' }));

    const wed = canvas.getByRole('button', { name: '수' });
    await expect(wed).toBeDisabled();

    await userEvent.click(canvas.getByRole('button', { name: '월' }));
    await expect(wed).toBeEnabled();
  },
};
