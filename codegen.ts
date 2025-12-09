import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjUyODcwNDUsImV4cCI6MTc2NTI5NDI0NSwianRpIjoiZDFjNTBkN2MtNzgyNi00YjY4LTg4NTYtYzAzOTdhN2JiZTYzIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODAiLCJyb2xlIjoiZHJpdmVyIn19.EW0aLcKKaogF4i1G_aiih5kKArPuNz0HVg2rdQTCTbp1QakUzOuel66EsUCOkPWHjZh4gWv5M2EPPQXxVHQrRN6Z0NQ6QxyvC5S1Ib80q9wJHX6www73atJ6C_Qh54rreFpon3e9GnOTfYoeixCyWMvGbLuivpQ_cGc9ndgNna2mJdYWMQFdQc6GlyOH1Ry0OGo_R-5bGtzgDXvig9clAZIVVXfumDUcz5gHe3y09TgZTCJgEbzW4ZRXHkxdDN_HyM95KRVqCx-CvVVEDkg3FqtT6esD7HSy29N00vApdzoA4iDgtCZd1rDAWZnACiQUt3B6L1vhSPHTJRDzq11r6Q`,
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
