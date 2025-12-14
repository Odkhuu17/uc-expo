import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjU2Nzk3NTQsImV4cCI6MTc2NTY4Njk1NCwianRpIjoiOTNhYmM2MDEtYWNhNy00MGQ5LWJjZDUtOGNlMjViN2ZhMmRmIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODAiLCJyb2xlIjoiZHJpdmVyIn19.LOXd9bsKK5dDrENdvaR3Y0xzFLZBfkv3bdkowLiadr5qRUU8DlvqzTIrUZWN0diyx5WF_06OANNhDqBdkdhvsolS8vIGzJtvTHQEUTHceaNq0kS3TM2_koKyCmXA3rmHdvYm1qid6E0Ncj05fgWjkU6zPeL_CuKZvEnoDdzFe0puRcZRJoWyH_B2AESb6z0G9Kk2rlyIUytCSxQ2fo5CBl-n6-3Dkw1SSISLbTyfbOZ0TJ1M9Wh6mwKlndEnp2A4zRWBTf7bgGcpaifadz1ZYSPWWnoLcNYdV6a8MTcUneW5V0MpqMjWWB5PKpoRE_SaFo6SM0YzrlgzdFT44OrMow`,
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
