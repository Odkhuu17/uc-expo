import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjUxNjY4MDEsImV4cCI6MTc2NTE3NDAwMSwianRpIjoiMDAwMTIwNTYtNGE0Yy00NzY2LWIzYzEtZTJjNGM3M2FkMTdjIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.seB9iadzZv4Mz5PeQg3WZ4t-ijLZMWAkOOPA6g92g5ctfBDrYFswBlhiJD4zFurRvO_hrcbQgryVMUGNXHc8zQJsBfAvFQhUvKfgz9jY0_eBvR7qCz_7FvjHbJPZ4T-3SaaMOUU6w1Iw3Bam-6keEOP5H3zUK9chJa7e56-QVUUo5uDDDDFJOMzEWPZ4oF9PfZjJ5SGpToju1TD-khZ-DAsjxsO-Dm_BtDsPqIACKg90fRcAppget4Rq9tmmIhqEUO7tzhqtTBsyNFmEhRzPy8SpOvvlPBnQY9-wEhVyfa7rr89X3R6XNe1_puIUSn5UgpeFx4bG0gsb2hCsXmLWuQ`,
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
