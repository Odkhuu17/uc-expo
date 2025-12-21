import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjYzMTgwMTAsImV4cCI6MTc2NjMyNTIxMCwianRpIjoiOTgwMDE5ZjMtMTY4ZS00Y2QwLWIzZTItY2E3YzQ1YTc0ZmFhIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODEiLCJyb2xlIjoiZHJpdmVyIn19.l9yiwy8ur70EeXy3axx9hf3GWZVHaLJzSyZodpfsKvq6p50jPNyn_PvAkFHI-s8w1MqDCExBb-4vLyV4zCQpXW_JfxVZuS1W5NeFP0KDhZDsZTByfHlD3IN9cqVc6tfW32hc5uNQ7jnK3r_HtUS2RnuhOgs2AyA00yEKuPbaKHAjlBVf-9znCrcCMVJ7m7TU9psI3M8U5kkBcFFsToZbHMfUJXQ_oksq-xDBsElwgdNxYBOfy62PloavMGCjtL_zgc97qP7d-JeuO47-q5wmbpBdjviMb8CtKoytXzaDMcPUWskT-4Ei8zWrURSN_pidrIjqG1ngP_tlLwuqBpsmTg`,
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
