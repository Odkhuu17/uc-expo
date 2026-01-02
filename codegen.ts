import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjczMzM1ODYsImV4cCI6MTc2NzM0MDc4NiwianRpIjoiNWU3ZjY5MmItZDBkZi00MzJhLTg3YzMtOTM1ZjUzZjhkZTkzIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.DQzTL8Q3JxHNBsYXO92JIadADa2ZFdrA1l0Z6MPZNrEPvbnv4-iJ9lT1qWW3MV-or7A6mVP0_1o9X6AVsBYJCEdJXIAdpoZY1bVqpvwFmamwHTBfxD9Y-BdMCv0JPjHRyHBNhnnxYtNkCIsAHEZaL9iqeUDKQs3p366FNB5SA_nwDV6srNt-Rq2LLH42RRWV69W-MLvrrAvr2szVuSGOylgGrdtm7cZ4rLSgcK3mFnsKxN1PGevp2enC1JeYduwMaiM-iWDHncRVqLEBsQNdaTDfFT6oudqCDSOyo_PamwV3_UQd7eq8z28EOAc4L9OlelaQLrl97rmmNRYTSE_b9Q`,
      },
    },
  },
  documents: ['src/**/*.gql'],
  config: {
    maybeValue: 'T',
    withHooks: true,
    preResolveTypes: true,
    flattenGeneratedTypes: false,
    flattenGeneratedTypesIncludeFragments: false,
    disableDescriptions: true,
    useTypeImports: true,
    allowEnumStringTypes: true,
  },
  generates: {
    'src/gql/graphql.ts': { plugins: ['typescript'] },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: 'gql/graphql.ts',
        extension: '.generated.tsx',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        reactApolloVersion: 4,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloClientVersion: 4,
        apolloReactCommonImportFrom: '@apollo/client',
        apolloReactHooksImportFrom: '@apollo/client/react',
      },
    },
  },
  overwrite: true,
  ignoreNoDocuments: true,
};

export default config;
