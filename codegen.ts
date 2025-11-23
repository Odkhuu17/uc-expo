import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3NjM4ODMxODksImV4cCI6MTc2Mzg5MDM4OSwianRpIjoiMGI2NmU5MDctNDY2Ny00ZWU0LWFiM2EtN2IzYWEzNDI4MGFlIiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTU2OTA0ODAiLCJyb2xlIjoiZHJpdmVyIn19.lvk7xzAJItnaOvIr_6xLblR-ANQCx_ihuk-lilrTExF-rC2Zee3kyBzTHPQ_ioEnkRvhGr7RkTXT-4YtTlK1mRPhTX5xy1DJPFLNu2gIgKj4FQ_4naKowyvhck6rY0terYga-NyM81FL4b-yw-ZGH6-x6N6ocx0eJM6PTdxTCJXXkBZzUYUlj7UC1h6Xd49savQxIxkiS2HVvciJ5kp--jEJAEbbB7Gy1uXzwnXgs5W82XNcYBnw1ZFSARQR7BvVo817JxFaPHBRfCIsP7UMU5zQcOC4WFbR72vX4b2CVKTLYh40Fon3D3j5Wu-GnCIWORdIavbOz4NKbK-rWDNzdA`,
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
