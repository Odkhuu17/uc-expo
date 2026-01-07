import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3Njc3ODkxNDksImV4cCI6MTc2Nzc5NjM0OSwianRpIjoiOGViYjUzMWYtYjU1NC00OTlkLWI4N2MtMDkwZDE1YWQzMDEwIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.VD1Q1WVu784P7U6wq_dDJ3R7JGHzz15YmuAl50DJFfYaaNj_yaHRPSFevNup7HcvkDvYkQ29jNT7oFkqKSilugPsB6n5LDk8g0YaxnN1QM1WSHW7bdMlhRh2iZWMIax7dQJu9TYRrRCuusm6oAZz4U3iwRNKmPh7gl67jnBEva1J8hzLCZtwQZOPhb6umll60sfGG9miozZNIZEfAdaAGQF0FNdeQhyOD3G3tWAqR4nlBA5RVhoHsGWpUNEOghUW5FqlCdz92-UkqIB_0Ji2EyUdq4r__dF2-eG2fQ1xjvs5rZZDYqrhRlcr_AF126bcOZdM2cXSF6j91TCCdi5OEQ`,
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
