import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjYwMTA0OTcsImV4cCI6MTc2NjAxNzY5NywianRpIjoiNThlYmNkMGEtMjQzMi00MTQ5LTljZjItNTY0MGIzZmUzYjVmIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODEiLCJyb2xlIjoiZHJpdmVyIn19.CVkXT42iYpnMKUKK91mfKcwtDomAYrCEOLNd4wMiFRIUceDNetpNgj6R_xe-aUKavbaGonU8QBap0wdYYiHiPLM8_pG0hLoEF5YXGsAD3mTyBdErru87PTZ_G-_7Ub03jr8e3Yk_xjzPBGLtOiZGVZzC7lNLbRxersL_FyXuYIU3mEHdCDP213VDaDfMGimrXRMCXYabZ5AXTWrBPzTPgsBZUImdHabBV7RtF2z7PFQUZZBr9brwMgrw5oD9rJC5IvnHUGi6gW7CCt5igRtz_teQaoOXTxgjHSkEwd8Jy2KbZHnE0sUMc1bpKFnyZOug449MhM_KuTMminA1Qt9Caw`,
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
