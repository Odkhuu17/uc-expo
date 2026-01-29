import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3Njk2Njk3OTgsImV4cCI6MTc2OTY3Njk5OCwianRpIjoiYTY2MzhiZjItZTg3Yi00ZWE1LTk2ODQtOTllZDMyNDBjZTlhIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.R0nvbsFxFCpSmYJqI1u7qc5oWHBrIUUoqkZgHmFkwsM6KJ2QJPN2u1idNnmoV1w-9qgbFz94c-JWS-84OHBTpbYzRIHzXxMLowLk0szEHgkFAmRewzMwoLYyWhTDfRefW0PjUl5WtprTI27gwtiP11bV9BNZTQsGzdFyS8X_8_RAM6zg8nuV-UZGyZhKSByl5HO9Tn-sjq5QA6e3_v4v5g2bpYyHaytRIodZhE8u6PZsnXFOWyYjlmM0RDsswAKdEJ6fpgLL3f-r25n_Qu9wjC67BCj5AiYoeIbaJbnX4WyQVEgpPOOpEt4EijCq0HK2Yhrfx92iQvJdfJZYN-ZxIQ`,
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
