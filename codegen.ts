import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjY2ODExNzIsImV4cCI6MTc2NjY4ODM3MiwianRpIjoiNjg4Y2E4YzktMjE5My00ZGQ0LThjZTMtNzdiMTU5YWJhODZjIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.qLaNCUOtCVa6frJ96Tn8_dcqLLBUC0dpZ_xvC8xDgSWmSyfJRCIB5G0k8Mp5rv4jQXXoGz9hUSaXjybTorSJQ9tsWt7rnj8Lb5ElObdupsVuvJ0SbDppItuwxOTlne_qsFXWa99MLBZWa4PWMhQWkeJ-BHy6NKlxhtnSsIvzAmxOLIy8e-es84VtkqLdEbhrbeKlRzkVNwwLRRZK5kV0Hhet5BG3M2Pl_d7QejJ1sKDTz5WXQPBgtgo_kz28CHmobhYZZJCK1L4Pby1wpmfz_5aYgAyZBVzUhbPFaeQ28yzLN8xruv_jXRGvrzApCNMYyIFm1k_ia16w18MjvFfc1w`,
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
