import '../src/app/globals.css';

import type { Preview } from '@storybook/nextjs-vite';

const preview: Preview = {
  parameters: {
    // 이 프로젝트는 App Router만 사용합니다. next/navigation의 useRouter 등을
    // 스토리에서 마운트하려면 이 파라미터가 전역으로 필요합니다.
    nextjs: {
      appDirectory: true,
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
