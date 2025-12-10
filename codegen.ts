import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjUzNjgzNzAsImV4cCI6MTc2NTM3NTU3MCwianRpIjoiOTNlNDQyZGEtNDIwZi00ZjJlLTlmNWUtNDg1YzA2OWUwNjg1Iiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODAiLCJyb2xlIjoiZHJpdmVyIn19.vtUwypLhbzLnMymiZJHWLhzAkMP6LYYextPz8xQLiN_qBSTbkaU4c0QVSY3kK-Lsgv0SpIyBjspxR6L4p_Q1TEGs4lB8rBnKuTWiGufFubxJC6XMrHR_enKNh2nDkvrq7o7imWiQwyQDK-LNVIxjZQQ9aoroPcpE4rIAugUcOFYTScO47b1y8li6SmFj324cLXWHBVR0HlievY9NJOnFRcb-dKH3hZrFwgkr9Y7faYWxoD6W9ZRs59_1jcV6-OHR91TGiwyqkmw1XvwSEtDMVnyw-vljDTsR-7Jjo3Xkj3IFLtrpFcjnKzSUOQMPkGmXH-HNOD4mP_QjNun5KnHorQ`,
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
