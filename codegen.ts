import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3Njk1OTc3MDksImV4cCI6MTc2OTYwNDkwOSwianRpIjoiMjRhMjFmOWEtMTZkZC00ZGIzLTg5YTUtNWYzOTc0ZDQyYzYxIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.cO8rRsJPjoHb3tFavjDt9JR7rSe9hG_FfSsFEOxSxlVSpru5zIO1lvLNycdSqwcKUOKbQolp_1zwCIOTML6ESaqmJCdSgSLH-Un-JIl_IfJsLD_HxjLenDKyuD9LQxztPuwMIimy269--3mK-UVhAEMShCJQ4kR5r5VAfH5fm9OyM-skMjn_IRaJ06tMeTRro0TjPQ9-HmKiE5dYR4O6H-lrkWTgac5Z4gqKxHAaNkOpD-q0jE5Wi-e-cCrGoPTs5bKmwwez1Yx0b9C-0v8NNbTL_xpX3G9tXbZSQYfq6scdfYjiYdFI72-yPQagTcZX1iTjggcSpcybuVV-ycmGGg`,
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
