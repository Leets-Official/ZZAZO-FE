import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { ConditionForm } from './ConditionForm';

// 제출(mutation) 인터랙션 테스트는 별도 네트워크 요청을 가로챌 방법(예: msw-storybook-addon)이
// 아직 이 프로젝트에 없어서 렌더링만 검증한다. 실제 제출 흐름은 `pnpm dev:mock` + 브라우저로 확인한다.
const meta = {
  title: 'features/timetable/ConditionForm',
  component: ConditionForm,
  decorators: [
    (Story) => {
      const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
      return (
        <QueryClientProvider client={client}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof ConditionForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('학과')).toBeInTheDocument();
    await expect(canvas.getByLabelText('목표 학점')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: '시간표 추천 받기 →' })).toBeInTheDocument();
  },
};
