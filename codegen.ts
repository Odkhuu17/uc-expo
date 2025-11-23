import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjM4NzI4MjQsImV4cCI6MTc2Mzg4MDAyNCwianRpIjoiZmI3NTg4MDEtMDdhZC00YjM5LWIzNGQtNGRjMTg2NjY1OGYzIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODAiLCJyb2xlIjoiZHJpdmVyIn19.MPgCp_fyCiKHe21-fhA1XohCZNtHzK0-ci03Uz4STpcMqR5vPrwJCkrTsNvXwFrPQLf17HpfZITnmewmYAJE_o3gBisYPXIf4o3ycikfuewUnjUXo7s8wr-_j9joqGA0z0ASYe7ehy9m4kTbXP28kjebl95mb6BalL8FXq9KPjSaiGdD2bX4VOinmPRjJx1PYbxpeUbMwq7fdu7ApG49IVlmYngBc59KwamDgOOMxlk49TBBi4QmeXrt1jdljf4GyF4tFr8PZqmrbsa0NmMifWovA7DFAbUv4T5rCTqZI37dDbXWKIgiDVizJ2x2kPPp2FrJCGAZOTdkzM1BLneB4Q`,
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
