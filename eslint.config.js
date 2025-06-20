import { defineConfig } from 'eslint/config';
import jest from 'eslint-plugin-jest';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import neostandard, { resolveIgnoresFromGitignore } from 'neostandard';
import tseslint from 'typescript-eslint';

import js from '@eslint/js';

export default defineConfig([
  ...neostandard({
    ignores: [...resolveIgnoresFromGitignore(), 'eslint.config.mjs'],
    semi: true,
  }),
  tseslint.configs.recommended,
  {
    files: ['**/*.js', '**/*.ts'],
    plugins: { js, 'simple-import-sort': simpleImportSort },
    languageOptions: { globals: globals.node },
    extends: ['js/recommended'],
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^\\u0000'], ['^\\w'], ['^@\\w'], ['^\\.\\.(?!/?$)', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)']],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': 'error',
      '@stylistic/quotes': 'off',
      '@stylistic/space-before-function-paren': 'off',
    },
  },
  {
    files: ['**/*.spec.js', '**/*.spec.ts', '**/*.test.ts', '**/*.test.ts'],
    ...jest.configs['flat/recommended'],
    plugins: { jest },
    languageOptions: {
      globals: { ...globals.jest, ...jest.environments.globals.globals },
    },
  },
]);
