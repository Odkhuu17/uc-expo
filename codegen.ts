import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjYyNjUwMTcsImV4cCI6MTc2NjI3MjIxNywianRpIjoiMDRkM2NlODYtMmNmZS00OGZjLThhMzEtNzQ2YzFhYzZlNmZkIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODEiLCJyb2xlIjoiZHJpdmVyIn19.0Ab2yuyBPeY8NX9674nQuhk5DiacK3x8RBZKbIGjeBE3BOh44vgO21tTGf1MlJK5n2rrUgbY0WTGA8SjvdWmWgU5tHIGwOqa5GRjcsC03TOfuovp-TyOI0p4WyWqVbzKYhaYv_qB0-Ysv0NxtQsW7MuX5os9AdL9PJKUvO5KV_VQBH7Adr-yJtnnHecxRFBTaBN8wA_AhrVv0eDcLlTKfo2CqwIuA_oWN2elwTTdcEZN76T3pt0YsfqMYL-ea_2w_YKGChc8NTOdNJRO2-CAePTikvZFbNn8iMWIIfMoFMkjl5EMAhJ1JaH2EE3q29PlyUgYlWfgJPU-VG2sw1WXrg`,
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
