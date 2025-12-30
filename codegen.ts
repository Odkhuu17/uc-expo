import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjcwNzIwMDMsImV4cCI6MTc2NzA3OTIwMywianRpIjoiMWY3MzkxZWEtMTc5YS00NGEyLWI3YjktYzE4Y2U2YTgyM2I5Iiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.fM2fk63QbwxwJ8VAUxMRlmLkWr8AyV_GZMS4NNcngMu1gCW9F-ZbpF_n3VO8fc4Y0ZoWRtf-tO9ubcRs9UNCkFVo1rS9BD6weDixaup1LsJRSF6Ps0OymyQe5DM5mxTOlTSjXb8WSJ953fTqVste5zK4JnekP3bhiXv7GI-07ZNdSqMRDWeUBIIwfl4ponoMojCra7G_oaHWF0SYH60LNPz_1p1xjRJdv5rYcStMgtQ07PJU9ci1s0aeNUpWdMgrsuaIO8OFUFPenfOmA2gHvJJJ00Tlf6wTbNa6zChPnBeiK3AIbaKK7TTXu2peI_O0eRln-i6zOI6B_04kBxt6lQ`,
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
