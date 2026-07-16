import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Navbar } from '@/app/(afterLogin)/_component/Navbar';
import { CandidateEmptyState } from './CandidateEmptyState';

const meta = {
  title: 'features/timetable/CandidateEmptyState',
  component: CandidateEmptyState,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    actionHref: '#',
  },
} satisfies Meta<typeof CandidateEmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="min-h-screen bg-s50">
      <Navbar
        actions={[
          {
            label: '피드백 남기기',
            href: '#',
            variant: 'text',
          },
        ]}
      />

      <main className="flex min-h-[calc(100vh-57px)] items-center justify-center">
        <CandidateEmptyState {...args} />
      </main>
    </div>
  ),
};
