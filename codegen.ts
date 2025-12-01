import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjQ1NDAyNDksImV4cCI6MTc2NDU0NzQ0OSwianRpIjoiYjhjMjhmZTItYTFiYy00YmMxLTgzNTItZjEyZDUyZGJiMmE4Iiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODAiLCJyb2xlIjoiZHJpdmVyIn19.WF6t_hXvasNZrJNDEMVvVpO0M0zoXwUhuSmcDmc62VLutHyGI2KnjXjr2we5xv6EwyyiAvUW1VtOMhylQcwVuwEsIfoApvWTFqEqHD6hAwp53TdyXOYLVqnUeIM2boA2Asd1VMmBzQaeF2ZSTTjOzUNoxpqJ5KTkRriC873a1IkqTmV7sK_GOBhqMaikRtaCd95UsvRr9rxoiot34xKtLLIDaJO3ONAR_avi93x32v58B7-JHvo5SNX7EhkH-J10BfVatM4lfKkdTTUfGcrduZb4IKOTfDTnkupLX7JuTASc0atA-GTYqKEIyPCaITyCR75mtz0vQkU0yLT_Wg4Ppg`,
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
