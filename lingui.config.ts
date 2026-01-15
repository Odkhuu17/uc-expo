import type { LinguiConfig } from '@lingui/conf';

const config: LinguiConfig = {
  locales: ['en', 'mn'],
  sourceLocale: 'en',
  format: 'po',
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}',
      include: ['src'],
      exclude: ['**/*.d.ts', '**/*.generated.ts', '**/node_modules/**'],
    },
  ],
  compileNamespace: 'ts',
};

export default config;
