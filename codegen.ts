import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjQ1OTAwODQsImV4cCI6MTc2NDU5NzI4NCwianRpIjoiYzlkMjA1MTQtNTBmMy00MzQ1LTljN2EtYzlmYzZlNjJjNDgxIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODAiLCJyb2xlIjoiZHJpdmVyIn19.TMkUD-6LivrY7a0SDATUizNDr9eim4qOr_1KC8TbACBL2P8Qr2XqiZXENYaaRQQSHxTZHCstA3omTG61xGSowzgfvhABKY_jdhOAr96_GBM5u9c_WqemOGUt7MGFRy1hEBgDfW6ky6uVGD2G6d3q63Wc7tUiBq-3QmRIYOcRkJjnO3BOozMvfUF806-fRVtvls7RAI3ViTaKJn8ByiNFzU6LUGULLKYmX9LPsl1NradhTwrdRnHYTCN4hzCDrIM8rxftgtsVOIhnPHpq7Kz0PPCZudNZ4EDgphROkkVEVqtM0zs1S-5XiC4Dh_q9XL4gppRgpUXZZByMu3OVoA1MpA`,
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
