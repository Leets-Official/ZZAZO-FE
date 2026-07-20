import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CandidateEmptyState } from './CandidateEmptyState';

const meta = {
  title: 'features/timetable/CandidateEmptyState',
  component: CandidateEmptyState,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CandidateEmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="min-h-screen bg-s50">
      <main className="flex min-h-[calc(100vh-57px)] items-center justify-center">
        <CandidateEmptyState {...args} />
      </main>
    </div>
  ),
};
