import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjQwMTcwNTksImV4cCI6MTc2NDAyNDI1OSwianRpIjoiZGJjNWQ4NjYtY2YxNS00MjRhLWI3MzMtNGE1Njc2YWQ4MzhlIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODAiLCJyb2xlIjoiZHJpdmVyIn19.ALG-mSVMrCTLGYKjxyN8nXBtWIPFXRM1imtQZbV9tBWGfRmfO_tT-K_bo_zucbPYS7cQOF1A6rsXxqjwK7H-fCNUeWEfupqgjLAG_UkXNu0aiZHM_DjBiQ9y3qgAxWzq2uY-58oD0_HsAZIrTJd4LKg7b2QGz4I5B8QOkqYuE9QJY5L4MKf5hueO-lzynPDbcZIfqYHhQ7jrRkyWxQ33I0loMG5Q59yEPu3uNJ_f0hFm7SO6tyz2EgiEd9-k_OeHWJviIeB2jiw5aGULQJ6M_w0DBAH-iVHjZs8f12Dt29jr_jVjebSqn9PSC9zlVSC-n8ir6fqDijbntJ0TBeCrgw`,
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
