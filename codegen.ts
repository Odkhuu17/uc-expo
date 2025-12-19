import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjYwNjMzNzksImV4cCI6MTc2NjA3MDU3OSwianRpIjoiOGFjZjk4ZDItOGQ1Ny00MmU4LTliOGYtOWY4NTFjMWRmYWJmIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODEiLCJyb2xlIjoiZHJpdmVyIn19.jyw3CuqGJafRCOt4hPiFStml9IM3SG40QN_4gnIFSt41KMiD2Tj7adMNtNSCkrmDV7_wwmIYAV-QYojxUKloEIsu9zPdTp4phbUs0y0rFY44D4Zif_icP_sbg0OektMNamTM8oq0TckCL9gtieGM0uTd-q2V1f8_2R-trGvHlLW05WW9m7AJ9zEc2upcb50JrVAU5Y-RMOjaye2tkhKyE72O0SCWsz2xNhpXy6eTsCxn-zHlhc8gFNA0FozT3plrWVTX5rETbIRUstZtsvgC7zrf_el7C_L-kBxNxD59JXkq25fBR0U-CAz9BipbXl-QBOhAhM-OlsImjGAOzML7aQ`,
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
