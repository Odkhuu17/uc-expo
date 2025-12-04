import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjQ4ODMzNDQsImV4cCI6MTc2NDg5MDU0NCwianRpIjoiNzI4YzQxZGUtM2Y2My00MWY2LTk4N2MtZmMwMmZjYjE5OGIzIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.zaZoPLiQnx38Dqx4griMNdWxwEmnTMpy4LJ3wi771cO8vLxNtb17FR0Pc5ydtX_fCdoINT3ovX5QGs6OuShaOG3ZCQVAMIhbTeYXU92kNGP2H5orRyKT0aNKpT0ANt4bK2oAptBfaqz0io6oU_wnOJd3G9UVsaBqfoOVG4WDoomX1ZiyYFD8idujQ1TBAaXohNIGX4Y5YEPo1P_ypn8DJpKbzq5TRVjGXGBdiYq5OqMOf5rNquyvxQBcPoUGAOefMwRBt2hmbuH70Pmx5Tc7G--hJbdcT-sW0OcexxqndPl8SJuVbK7PdaC8wXN-uu87WKB88e_UDz-ZrjW1-Rsmjg`,
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
