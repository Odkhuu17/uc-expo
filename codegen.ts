import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjYxMTgxOTIsImV4cCI6MTc2NjEyNTM5MiwianRpIjoiYjBlYTk2NjYtZmFlYy00NWNiLTg1MWQtN2E2NmI1NzAyNDFmIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODEiLCJyb2xlIjoiZHJpdmVyIn19.HscL4DGHAOZyp7SxYHq3FAbI1BLaDjLj_akVemDfKFRsWt2-5LSj5sMnof8jLFKwPRpmoaqX59vCLSkXPuAzpwSAk2aFawtj5j1wi0koGhXAsgxP6ySD3mIdV7ZOuscz7jbIPF6fTaPsDWx5jgbccrorBOpDCh6tm3EF10f-tTkW1zLdwaU5scSXSnBLGnzBGl6a1mR9bv76oYjWPDvmCrfEdIDDMpvPb-7LSEJH5k4NE8EE7FkzTW65Bg8MLYfcJTgp-bg1N-JGBqNuPW2sEsZAzQrsI277rF03UddpQHcsakCmZy_xAA87jYMFfrkuTfXaJs1frvUrrMdkjVIFHA`,
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
