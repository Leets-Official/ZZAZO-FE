import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { scheduleGridCourses } from '../../../../mocks/data/scheduleGrid';
import { ScheduleGrid } from './ScheduleGrid';

const meta = {
  title: 'features/timetable/ScheduleGrid',
  component: ScheduleGrid,
  parameters: {
    layout: 'padded',
  },
  args: {
    courses: scheduleGridCourses,
  },
} satisfies Meta<typeof ScheduleGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    courses: [],
  },
};
