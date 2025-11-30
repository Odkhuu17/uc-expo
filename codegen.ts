import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjQ1MDU3OTksImV4cCI6MTc2NDUxMjk5OSwianRpIjoiOTkzMWMyYmEtMmIxNy00NjM5LWJiODktOWNjNDBjNWFkOWUwIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODAiLCJyb2xlIjoiZHJpdmVyIn19.BNF9y10u1IFZQ4ti8pR51YD9JS54kmGj2YvwdE1JE-dsPSk_SGbdevA7jzxvJUiMxu2DEVIvvMSGGuhT_KeKMQBvfFKxt2nblSAkvOuCJk1S9HXZI_7pm2b_MqRgzAP5nXMPIH0xp7cWB6_3gJIleCRPUgCCc5y4JubG5txoxkAQJ21wNVkIGOrMyQb7HadZW_3X7PGrrKlmCwGF3EscEKzQ14sh37Vt2HE9nPu9LmDVXusQzpUGP9QHWmG7ALBANr5kyx2Js7JNrEW17N36VWiJcWX_qg7hc28I_BaN81dcpZN5R7uVvh0nPeMvZDd3M0d6zTm8trSgnfdssYBGaQ`,
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
