import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjY4OTc5NDksImV4cCI6MTc2NjkwNTE0OSwianRpIjoiYWMzODFmNmQtNzNkNi00NTUzLTlmNzYtNmFmYjIwYjBmNDQ3Iiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.nt9bsGJ954QJcOKjp21dhqJcE9g3gasmGr5R62lb7NRhUvsfYEg1tqIGt1j2C_JWg6nMLEoiwEo-qmSSuZ9wC13Xh9YP5kn_4ytaXdIiY6rPIdBFpx_iwPUT7Ojn0EuIMNb62UhDKX8dar40L9f2ZKfweWbAd1eLIkyFAeokdd2TRLjt5qBaujHFAVCusU07H3b9oencLXpjSrdHjYFayz_34GXzG48zYkKKzjs4bs9O09HL9XPZVqeRbXFVUKtOMTaTU92j0Niyz0okD1jOi6ErwJb9_hWlbS2veIOMA4iHXg-ur2ahoCB0X6Sx4haKqEHCC8LpgtrcNqjaPTTMXA`,
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
