import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjY0NDg3NTQsImV4cCI6MTc2NjQ1NTk1NCwianRpIjoiNzQ1ZmU3MTctNTE4Mi00ODliLTljMjAtNDVjOWY2YTU1OTczIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.r0mTUsKIg4j5HjFuxm-5F0RhKISkmaQznIIV-grIDl-Z3hXpaurHYsEW752uArSuuLgni0AtSD2qY8Cr1XuwPcHU4GZTO2DaiCTVj20HENt-gyTFUbDu0M5k3MzIeUuLHrhvAVN2ZSGC3eaRQZnlZw6sTsVaDmEwvsr7xpJFuGIXUB-atNfGoHugOpb51Mm84rEwLSNmzcFXNv5lYRhGtujTph84ZH9yep6P7M9WEePk8aP32KEWavTCxVFcD5snHc6X7Owf_SKjWP6wuK_8jMd7EbbAZIpdTh7QXp1yWmHBy6qpKTSYPcy0vhdHyVfBiMKp4rZeYRhHYD8EMm3-Rg`,
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
