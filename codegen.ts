import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjY2MTcwMjEsImV4cCI6MTc2NjYyNDIyMSwianRpIjoiOTQ4ZTUzOGUtNWU1MC00ODQ0LTg5NDQtMjBmMGI3ZGQwNzNiIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.zqwEDeHU5hsV9uM0SODy76HLz0OVBl5Ed1HvXwxQoZ2AZcpoZphFLnf3-YEGOO5x9JhHfq32DJZ5LQD6WmRoZgJOx_hCAVn8ZauFbE5PyDeAiDtgNuTCkjwjie0pf0SYZ28RQ6CTcdJC2QjpWl16J7pzdBciYTffnfjZVE8-bW9IAvEMtGoXcaAGgswxsurl2MYwlsz2SUaIoIQ8tAoHZYmPIUUWwgFc063MkfIemISvWg_D_yt9Xuq-uD37rSgwIxfv5siSU4tlxtEwbepCYBKewThYqy9LF_rhnIgBZs7MmLxZyz3XauREfdPPMIzzYz9xNLF5K6Arho6BBcZ4Tw`,
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
