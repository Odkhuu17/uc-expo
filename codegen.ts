import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjY0OTQxODMsImV4cCI6MTc2NjUwMTM4MywianRpIjoiYzIyZmM3OWYtODJlOC00MzlmLThmMGEtMDdlYWQ1MTliM2E0Iiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.SN-Qfu8anjN7YBZ6tDvWyg2yZUvNE5FU3B25-QaFvIv_7yjUO3_x81k1soHg2CqRYY8nKPqjTU8NK22ChuyxYERlNVKkUv01sxERg75nl1rfb8yKJdy6FhvStjfy0W1yPOztBr7NW8Li4CeZpvKTJ7ShQhzAQIEOHjnFccddXQ9AkokeggdqBdSaI8AUV7TqJr5cbvwM19MQxMjLGrcbM2zLzuMNJPbsHV444rLauTI9yDfNlENHQpqCEgrAXdF1OqJGKCwFzLCO5Fszc3ojOjPCrVbWnZUEMUkMtMcH_RPuibHdWjg0Y2jGTNSX21PvQIzb8kmU7sojHI-Z1q6QoQ`,
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
