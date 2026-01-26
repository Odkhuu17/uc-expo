import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjkzOTIwNzAsImV4cCI6MTc2OTM5OTI3MCwianRpIjoiNzg4N2E3OTgtMjdkMC00ZDk3LWJlYWItNjQ5YzY1MjY5YjliIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.f9JWDavvmXPc2QceMdm-yxErRTSAMq8vLlrK2b5zh_LLUo59EAXpMQBol-_g5m3wDDW_YHwiEQTNZHgEfuP1VJ3NYt9S5PJb1sJbEzOkH_3VTCY8zTNvhZz2d9cqOIwLzHARcRZsfsB23qHYUiBTI8CAY4HfllzwFxe7oElK9t0Vl7OVwpGErQI8uSlmXy9dOmDOadijTwXw1OM7DoM_9UyXxlhrB-mQ6TC8lJAK2YFZy6miveeEFeKNTCRL_MmwnwWZEbw3pxCQIUAuCnCqsdHiipKIIGml69lpjHEvSHtOJf5meif2toK1uqOWhoaY1VDjzylVKMLoDMLHO5vdXQ`,
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
