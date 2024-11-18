import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: './tsconfig.json',
    }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'import/export': 'error',
      'import/no-duplicates': 'warn',
      ...importPlugin.configs.typescript.rules,
      '@typescript-eslint/no-use-before-define': 'off',
      'require-await': 'off',
      'no-duplicate-imports': 'error',
      'no-unneeded-ternary': 'error',
      'prefer-object-spread': 'error',

      '@typescript-eslint/no-unused-vars': [
          'error',
          {
              ignoreRestSiblings: true,
              args: 'none',
          },
      ],
    },
  },
)
