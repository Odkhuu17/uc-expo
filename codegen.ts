import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjY1MzIzODAsImV4cCI6MTc2NjUzOTU4MCwianRpIjoiODMzNWZlNTItNTQ2Yi00M2M5LTg1MGYtY2ExM2I0MjYzNzdkIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.JBZtKbN-4mFEYBaiFkdv73TS_Efbnd2kFqmxiMkn_C8A0mqRgPDBP_399n3cV1-1m2WK1H6qW-cv2G4PyIOmxVMkFARJBg39HJvozFnjCqX7c4qzHjV1VKOJ1mFN7FOt8zYt37pC_Vxp5IhSgYHmQh5ihrMkS4ExEgV2mjUspuPQpN0-GwZ533IcZEOqckvyF-RvgO1GZM4soNmZA9ZX2iaWrYMjJ8utDkILd7R5Z2pFI59IgysaRLz8s_xLKRqiWYgn5FxBTaN9uyv86ucDEteVqXXxmBUamYRyISkLVIt2CPepgZ3yQR-XGfZDhmFFMlGUGiu2XHCPR-zOo-MoZg`,
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
