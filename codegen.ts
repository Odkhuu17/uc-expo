import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjMyOTQ5ODYsImV4cCI6MTc2MzMwMjE4NiwianRpIjoiNTY4NjAzNDYtMzIxNC00M2FlLWJkNDQtMTVmMDYxOTNiNjg5Iiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODAiLCJyb2xlIjoiZHJpdmVyIn19.XK_DZNbkBKD0tdCVKDAd30kuKmz1Y-ACnDI9d7RxM0Ok5Fnv_CG6KA9Rnilq1i1a0-UX9QUpY_pjvdywoeIrszE-2P_ar9LvOgK9Affrxae1BwIo4CEMDkJQdGaIfgql83PzmjoLcvsb96pc6OuRndPtAiQ23OS5TWb_mpsIec9cV_orx0MWQ70j4rk2fEzvFlpzEG-XKRd-9FwVdi7StAG5yy7zDXVPTtFo8TTIZp8yKhNY_1C60MFuhIgNyygxhdHlMgtpm4o7az-z2kD6bmCMPC2YwCuac0sdHlXr0v6kSrYu8L4NN2nr1lqp-MqSMRzxQdjVatqCwRGCLt5zjg`,
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
