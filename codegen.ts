import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjY2MzA2ODUsImV4cCI6MTc2NjYzNzg4NSwianRpIjoiN2M0NmEzOWYtMTk4NS00MmQ5LWE1ZDAtNWM2ZTQ5MjM1OWE3Iiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.sDEtmXbZWTJYaq83P6k4ILuwFplYHDoXApRxNq-VT-CYlfJMDZTP6MCESZKc5Fhpwl_0b07kHxfPUQZXUfl9_V9PrnKPYt6EsRnbmWfmgCcTnARAQg9Ob2z_klECONOeUNva0i75g8T9FPE2By-UBQ8k3JJOBkn8sn5dk4IKvWerdRhRSnUa9rTXXbSkqUj9UL48ny8MT1xnYFm-Phkp2B8sn_P5uucDX1hweGHW5oeRvmdGw7vVo9JRicfpkbvDGO7crN7xc4p_9ayICDl4tQ0hiLLunZgW-eeJZMUIukjCHKFpiLGQDHJAd9qzA4pOWAEIcl9dgAPpho4ZdwaGwg`,
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
