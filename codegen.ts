import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjUyNzg5NjEsImV4cCI6MTc2NTI4NjE2MSwianRpIjoiZjUxNTIwMDgtNzgxZS00YmY0LTk1YzYtZjk2Y2ZkYjc2ODhmIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODAiLCJyb2xlIjoiZHJpdmVyIn19.eiqlU9asTy5msfD7J_un-wwBSlIr8bchTtvuMur8ONg6BPhiwHzsmbz4bpDvfu1Nuc3S1oKygfW31894WjymbxmSDa70cOeSDQDYcB6jiJO6JwlXHzHiXjTC7Lk2jdWTN2-MK1CHL4jnBNJ_AdJC-1m2debzOZskKNcG2qAUvnuKPnKmU774NGVpDZ1WI0cbqnXNEGXL6ZvZe--CRifj1vhhbsxyufTl9PzoT6mnjFgVRyTjNZDJ_5WjpGkGgFNbZlhecs2XraTdWrwaKefp1E-Tep6ouoc2EZZQsayWiEUhlksNc1WoD6Cwy9iLpksZGYChlk4-J01wz9aEkEpyfg`,
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
