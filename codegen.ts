import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjY5MzM0OTIsImV4cCI6MTc2Njk0MDY5MiwianRpIjoiZjE1YWRkMTQtY2RjZi00MDhmLThlNmEtNzZmYTEzZDA0YzA1Iiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.y0o8G2slgI_xPo_VrarXLTtZl7VgZBoYnYKG3fKAsnL25WOkkYdUT_oBhx37jevyWpXwKzHwYcCZNJlT4dR8HN8l9ld1n3OlU4d-sTABiCwFPG7Urc4HLlGpUE7ZiU4aoRTNdGz4C57X3HszRAr_V7dhu2mTJ8ffIU9mQEDMg39oJwlpQv1e0EWWtNQ73-g-LRFe_jIr1qySVJ9B4ccc8nKWLTSwdLM32OK2nU4S9fdPEepg8qnOAvH_-rEYidR421YduwVU_QzGuVuVc1s90s7yW4d2iXrTyfiHJ6CenpJLTnRhLSEuAHgpmR5nFx3OHpFX0Tweog2LqO1flRQwmw`,
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
