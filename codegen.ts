import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjU4MDc2ODEsImV4cCI6MTc2NTgxNDg4MSwianRpIjoiNGEzOTU3N2UtNWZkZC00ZTM2LWE3YmQtNTVkMTZhZDI4NjFjIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODEiLCJyb2xlIjoiZHJpdmVyIn19.ZGxZk7H7B2kLcwznhWqlhLBrtsJvBfR64oyiF7jnt43wYo207J7fiTkSCIgTgqsdN7sGZmUa1qgqz9vX3vzcCKJvjRannI8-oKv2Q2pP3STF93n-8a_b9pR8ZQVyN7l8wSAwZZHqsvp3o5OWVU_ZUBS96MijYsAeA9a1PSXAwn5Ai4AC7eu-ntq9X53Mx1MwKKTVpaUPxEBpD1RRnqpIfEiHDU4ZenG9zSjxxFd4nBmZCjBXTtSLFWLvPCovBQ_4VwfJKGZomATSVtTQD1WKyy1IH91wT7__SmIWyB4C0_Yikf_f4e2QbyA-ildvX68XoiFEmGN25JqRdStcuMDrZw`,
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
