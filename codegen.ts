import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3Njc4MDkzMDIsImV4cCI6MTc2NzgxNjUwMiwianRpIjoiMDE0NTY0MDUtZTk2My00ZDcwLTkwMDEtZTg1NTJhMjI2NzY3Iiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.kRTacO7HyrICNRE81wEf6Fk-GQofKJke8tGkt_BtXLUVRLU-wgkwsHGHcAc1OujUSBVtuf9t9q9FjVJgCaFFw-iqLn-m59bnu65GyljZcd4K7mDplUMC9CiHZjn1uS9Ulmq9L5-udQw53Dt8imD9OKGhtTAChJVrv1lSLaVpK-vbMd_dZEKL4ALIWrgfu5D6r_G1MCwHGh4en6Z4l79AqoCPUoqJHqYHeXPD9FsRc9ijaYG9cVERlLAZS2YaGCYvqfzv2ZmppEcd3MDmqKbdqAP-hc6xz7Hp2pm-2L19P79mxYkwiWS83oSKR6OGN2Z0vLPxm_4YlSMWZrwDb-sZXg`,
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
