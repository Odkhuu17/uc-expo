import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjU5Nzg1NjgsImV4cCI6MTc2NTk4NTc2OCwianRpIjoiZTEyOWZlZWQtZWQyOC00YmQ2LTkwNzItYTNkMzQ2NzQ3NjM0Iiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODEiLCJyb2xlIjoiZHJpdmVyIn19.mKXIwI_GlOuEHkDnCDvVTxqlZhFV2IQJEmi9U38OR7vYiCsEu2oo5W3atPPPMCJf7hFPwZJm4jHe0WM9MRdnXAOAgKwVROmTQss6AA6hfnAaqCupGGpOaYDIDZZY_QVYgm3KptKBkmw56NydzFmKHrUubxzOAaD9guHky9RcA7a8TyQDSKoxIu5diq2IjBEr6Y2H0OUWjAfKN0fzIYKrrcIl0F7rhqyvaVrDMwfTKaFpj9vEm1yFcCR3HEEl24fIbCFGmhWnXn4Vuz-vvkIPv6I7AYBrhaPg98un719VXk5MYQMizI_J2rtTY1cjbWVKJYvFL6sqIPRVsWsWUxNtvg`,
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
