// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import next from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

const eslintConfig = [
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  prettierConfig,
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**'],
  },
  ...storybook.configs['flat/recommended'],
];

export default eslintConfig;
