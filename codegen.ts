import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3Njk1MTU4MjcsImV4cCI6MTc2OTUyMzAyNywianRpIjoiODdkZjMzY2QtMjVkMi00NmQyLTkyZDAtNmJmOTM3NDY2NjdmIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.KedehBILMmZ-wt3ohbh-NqqlwMelyIOTNOscwXa81aZD6m2bnr8S_67D-wU7iFk9jUwpmzoKsb4kcHPyuofFriOrMhRSCfXXaa0dapMMe5iev2w0zy1TTl0DgBDfFK-wwDplg9BE0BXHusGWGikIEpOA-lRbsgSOtR3Pz11841t8ZvCCKJZvB5LUHiT0jFuWEkof7cm6Jz0a2aGh4oXPoJSnIazOZyPFDqaV0bFa_NshCxZUGQmqpojlQ8r-wH_zD4MYBEGfrFAFxnLuTapZm33UfqoIpwBXAcxI784sKdDrnNHCUOg7RIiDAP8V-YxvbWjBFbKx4D-3H8Q9LbQRrg`,
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
