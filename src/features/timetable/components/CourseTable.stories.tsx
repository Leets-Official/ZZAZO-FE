import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CourseTable } from '@/features/timetable/components/CourseTable';
import { getTimetableCandidateMock } from '../../../../mocks/data/timetableCandidates';

const candidate = getTimetableCandidateMock('1');

const meta = {
  title: 'Timetable/CourseTable',
  component: CourseTable,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen w-full bg-s50 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CourseTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    courses: candidate?.courses ?? [],
  },
};
