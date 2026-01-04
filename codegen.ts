import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3Njc1MTEwNjMsImV4cCI6MTc2NzUxODI2MywianRpIjoiZmRmMWE0Y2UtZmVhMy00MTQ1LWI5ZjctMjUyMjhjMDE4NGUzIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.D487KuhTETrYCUIyTo4g7xGYIuKTnimRNV76jwBszU2rNWqGVxx7HA-xXHpiuklDJWIfQKu4st_MspqFOIg0JNgqoMi_hiY_GQxotBXM-UzW8XQUTieF9fTVvfev-17uORDO1ODVdvSXCIv66c4ROgovKKgfEqjAhwKMUpGCGUYA4JDfTxEuRDB05dRcgE7vS02C0P8mgwSGBdel5nNKoohm2JcHj3-KH4Jt2KPKeSFJrtgERYguOmOaV_PBGgXYQROneo2SFnqo8eJcRnjBHxcApZdUahhL0J0tA9bDSZL6ZH4CJci3mZrstmkFlLvScHEn-Yk9iwewMU9ypgTXkg`,
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
