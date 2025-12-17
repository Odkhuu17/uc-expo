import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjU5NzAzNTAsImV4cCI6MTc2NTk3NzU1MCwianRpIjoiMDNlMTMzMWUtMWU4YS00Yzc1LTg3ZjktMTlkZmE2ZThmOWFkIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODEiLCJyb2xlIjoiZHJpdmVyIn19.0DnLj5L4z8COzVAQ1dvWcJUUYYtRTveyZeMIRVqqu24zeVrXsoufvycNRKYjAsz_SirQLfucJ_-UsyPzhNaVsIJRUDeTdf56bN8ocJAwMvt3LFIo4-DgpQNYgfCS1mIFwTGKPcgy47Z9iFmT8Y6936zzkDuYdxYplOCCVT-mYER3NIwG9vM82IdhfakTt0Z-p6UPowzunrrAzMp5IjgXtgS8Hpmo_iVRG7dB89uV0ABF0JVXTzp86cmaEqJ031ZRh6k7i-ALX9FVSfhXwfWXwozA7vrKePndr8H4mv4HIXaFrZ048X7b7uxfhfzrvrB2pe0KZfCw_6IIDG1EFytjoQ`,
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
