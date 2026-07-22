import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TimetableDetail } from '@/features/timetable/components/TimetableDetail';
import { mockCourses } from '../../../../mocks/data/mockCourses';

const meta = {
  title: 'Timetable/TimetableDetail',
  component: TimetableDetail,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-s50 px-8 py-10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TimetableDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalCredit: mockCourses.reduce((sum, course) => sum + course.credit, 0),
    courses: mockCourses,
  },
};
