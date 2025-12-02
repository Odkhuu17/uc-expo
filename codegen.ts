import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjQ2MTk1ODAsImV4cCI6MTc2NDYyNjc4MCwianRpIjoiZjU0MTMyOTctOWU2Mi00ZjJiLTk3YjktN2ZiYTU3MTUyMWUzIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.GoPDJ0KAw78CbpaDE6YVRcFxZ3lRWRMK3oMHngeuZZ93I_SBgeD4g2Hg5kgD_19EdIm3jdwLESCLQ2oGCgAeBIl45kClF8eokGizyUFWL3LOwVaiNtbyIvkhEu3EI1LAC78GWOyhID25YFc2zMCa53xjmMvDFMTLgvt8HmKowIAC0Q-Jk0m2CU-uv6afdB8N_-yahr3jio8gM8xRsWxAR5XyvdD_UUySGYLKtRmixpZ4hwG_66VZadsLLgdtQN2q6ZY06IzQuAQmi0hFSTJ8ENueuoLYbiEioPoGJuCR7fO7Wqvc4GnfWz4kq1UjZ3dKkqDTAHbhS5c_vxYUrkF1tw`,
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
