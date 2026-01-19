import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3Njg4MDMwNzMsImV4cCI6MTc2ODgxMDI3MywianRpIjoiY2ZiMDIzN2MtNTAyZC00ZDc1LTk1ZmQtNWY3ZGYwMzk3MDE3Iiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.C9Q-ZPrH7O8A0W_7JztfAdm7iTr_c9cnY4nPBNoR11R3r2sI0yJ0ukEFNnhjZdWF0smZf5CcJ_rKV58Pc9Mvyz-p0ssPsW-Mn9lGrE2lJ0zdTksf-7DqDJY_lEPkOOwvfLm_3sUMDzgr0StvOvbXoxYqFkgm6EMEnYBZh3g_58L_LxMF-NYL53-zIS7ro1fJibiSPd2BT4GM7zV_ehZmjFFLBPrduYaz7kPsJU6v6jaAuFQvOao4WAP0VGfUJUP9pvihOMEyxVvDWXSHoNmTca6mhq2aQDn8_p6819EQFMDvL1O_0HVplXZVf75L2MRP-ogY4JyKMmPLL1D9DSTxnw`,
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
