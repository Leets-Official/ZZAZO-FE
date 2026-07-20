import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TimetableDetail } from '@/features/timetable/components/TimetableDetail';
import { getTimetableCandidateMock } from '../../../../mocks/data/timetableCandidates';

const candidate = getTimetableCandidateMock('1');

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
    candidate: candidate!,
  },
};
