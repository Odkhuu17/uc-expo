import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjU3OTg3MTYsImV4cCI6MTc2NTgwNTkxNiwianRpIjoiNjBlMDlhYjItYzI5MS00YzBhLWI4NmMtNDJlN2ViYjgwYWNiIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODAiLCJyb2xlIjoiZHJpdmVyIn19.S87aG17Ya5kGLJfPWOXo95MSkMNPkj__k_DC92XIH2ujjamsX4c-CxpUUYblbFJW1Jt6SNz3Eh33xKEA4DrLyvmtJlhG0fY8dEhOej9jabnvdRLAX-ij7tyPfbbmqnIuRy46Qj7eSqAIbfaVovLFbr-EVyFT2ZQo_mDlpWXoid06YRxaaDTSOfw1vHV1ObAGGrRzCbT1oyYa-qBobLXRrxdiKfGxYXQ9IZKPK5fidmH-3RyXmlZ2nN770_HzDFpaPk8LA56YAtx1L3VmskSGgWwFASsAbOu8iDMWD3CoZwyMogjGIkpeHHwyOMpIRopWVdmHoy_aEDKtFkDu1RZa3Q`,
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
