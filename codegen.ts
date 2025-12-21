import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjYzMDE4NTUsImV4cCI6MTc2NjMwOTA1NSwianRpIjoiYTJlYmI2MmUtYmUwMC00NzZkLWI3NmMtZTk1ODQ1YTVhM2E2Iiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODEiLCJyb2xlIjoiZHJpdmVyIn19.F1wlu9-wMBC8D_DEv0DXIADCZeNKt9rQ-8c-0iEtYUN5s4mpCSs_UV9JMYjlAXDCZUWRSgNuAN7YuOEeiYwq1geLiEZMQ8Hbm7MPWZ1NIzzX66UzJD-fVppZEUNcXoYnH75WQ30Lg8bKK8B52fr9gtRx0IlVYEKN6N4HXMfJn5M9sTHX1zkLX5evt3eSxm6LjZ5Htq_QoT0b4UC4jHmM8l7pUX6AWsrffkt_xkreLe_lcKNbEZ2LTEO9b8sl0zQ-ox_8Zdx0mrRqsB_qzKuyMQMecXYpK3fGiw-mA5GCq2NweABzIq2j5H7sNQerWbOKSvaZCtZeB5yy_2SkR_1LqA`,
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
