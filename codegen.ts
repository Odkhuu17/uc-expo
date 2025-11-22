import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjM4MTA0MTksImV4cCI6MTc2MzgxNzYxOSwianRpIjoiNjJlNmNkYjUtZjYxMi00ZDRjLWIzZGEtN2IxYjRjZTVmOGQyIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODAiLCJyb2xlIjoiZHJpdmVyIn19.YAPp3jtdwyNPRjKckJCQ9MsjY9iF3wBam8pJDBFXFSagWEtOE_fEkOwqSigh79ilMf3DhSN7kUCizzfturvQGvgt47X8-2FGUt6ppMsJl9O_0HNe8C3vKb3GqRNDX6RxD8G1KfoiCwlZuxRXCr1OccH28EqOYV385mM7tnP9C02V0cFCERvqFEWdqsWhLwXZk5Om1EeV6RtN9rvnYbBqZTjHzM2g8sGAruSy0b8dVUQp2UN6s2ueXHU1NYcg7c-WQ5skmg1L_E1wqRCW-RHIjRIMLlAdscAMTXGsT7QGx8n0q6r7f7gJHKMrUID662xDRxGHRzbP7-BmMjTC-YeL6A`,
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
