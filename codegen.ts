import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjU2MjQwNTYsImV4cCI6MTc2NTYzMTI1NiwianRpIjoiODFiNDNlMjQtOTFhOC00M2YwLWI5NzItZjZhMDJlYzI0ZjE1Iiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODAiLCJyb2xlIjoiZHJpdmVyIn19.Pn8YFDcNzCn6HDL3MwsLxLMhcJ_PEpTfLZOUD68YGqO8NKItJRs5MsLOBHQ5V603ndHQXWVF5CKfLaY_EYccsUwJemgUY9EpnHMgLkDWk2OsJPpMIOpG3Z1UyzR4go5ljFev3YZXWwYv7Tn462Wj1vVtko2ilfkOl6q1JL034PQ11Sh0ICY0NnBBdoGhLonCCi0bRZAQsJKFNsLhecWmpbrncswPwd1IkkthvcN-BM6PnekmDoT8LTbYrNiGHqfeg5Hns98KYUX5qJ7EINpwQjUam9z-bYEu2-UVrl7X09J_SQe6YB1OkGHbTgkNUmvt1wK8l1OVqKQSYKplpxI6MA`,
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
