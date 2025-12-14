import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjU2OTUxMTQsImV4cCI6MTc2NTcwMjMxNCwianRpIjoiYWJhZDJlY2QtMGM0Yi00YWVjLWJlZjgtMWEzYmFiYWNiM2QxIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODAiLCJyb2xlIjoiZHJpdmVyIn19.GLqkj5-RWi0nKRDz4PWNJJJOtvR_xzeB9SqiwRG5_8Fokn9O_berb8bwjBn6ROnGUjTGDd_JkJcBgJb4vwsxHmnP4Uu5CIG3S7_XchpAeXL-sfFj0ag9jbV1SXymqc5Pm4rsXFxah5zQnkpJDAU-A61vZhCCYuXKwzp0Yv6MujNgmET46YjHYhnYGoJnCtVcEdNzT7nuxsF97_dKuR4liqG84DDKmzHb_USSt1R6GBcoghUFSF0bNB8fw55chqdfrL6PySalnHJZ-nsPULjuxx-bcKk07rvL5LZ-djlAyy9h9P_hhLTYpYV6IljJhl_ul1Xhkqna2btSiH8HCzEYyg`,
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
