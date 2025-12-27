import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjY4NDAxMTQsImV4cCI6MTc2Njg0NzMxNCwianRpIjoiYTAxYjkzYTYtZTE3NS00YmNiLTg3NjQtNDYwMDZmZGFkNWRlIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.3JJHrfbTr-XbJpPDT7gA7zyrDCGJpGqouNS95xZPl4BytIGXb6VBLl-WCK8k32hZvkGVIITswi1WOCF_zVp8aiNsvou6Kixsu_rqLsdUv99oOyqFmCo9C_8uvtSkwRnC3I71-PL6ZsEKTZMFa3SKM9ePlbNpeKtK-zWpZn0YuZckAsoMBxNAQYFJ_oR84puAXohv1-uUAPVsgxvVm-gKh4R9CZLFq54UDBgwpYAnTQAvzbJGBTkH4yXCN_019r2APuFZsPQnrMBsCdek6K-I0euIJ8q2GhpGF2Hr4QOyXhWSIdM5IJHNXGFsuHDKHJn9je4Z0H_4fUz1TSo3PbQRtQ`,
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
