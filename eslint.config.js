// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const tsparser = require('@typescript-eslint/parser');

module.exports = defineConfig([
  expoConfig,
  { ignores: ['dist/*'] },
  {
    languageOptions: { parser: tsparser },
    plugins: {
      prettier: require('eslint-plugin-prettier'),
      'unused-imports': require('eslint-plugin-unused-imports'),
    },
    rules: {
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]);
