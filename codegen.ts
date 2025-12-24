import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjY1ODUxOTUsImV4cCI6MTc2NjU5MjM5NSwianRpIjoiN2U4MTBiNjYtNTRhNi00MGRhLWIyN2EtYWQ3ODc2OTU1NmQ3Iiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.PBx-fmFLXKlgV4GUCVeodYYgb9rLURnoboxx7dLrGuI07IzRJuB7OXFCR3nPmsHfblg76QxrV0oUnilpNaow16TSauyHYJ_SCJfQcWSmw_8fBIFv3eVoTJK4W8-w80J3x6MZNPsXf7zHkXcJ-Ssl1ArMj5fMeffizR737Pd30LhmrKa_l73YWBA7lRVCQTWaVYAbaD-UOIMvnSW4Al4w1dC8mcn12uz_ISPDcxwiZbv7Ie7Xb7IasGEFeNq72cbA9dVefUxRHynWL1FzIi8YrEDYCorxMQJymXxGVjo-OeRDunqcrGO6DcmBIvCj-LLGeuPD0a4eF__kEIwt2snhdQ`,
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
