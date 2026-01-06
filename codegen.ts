import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.unlimitedcarrier.mn/graphql': {
      headers: {
        Authorization: `Bearer eyJraWQiOiJiYWNrb2ZmaWNlIiwiYXBwIjoxLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJVY1N1cHBJc3N1ZXIiLCJpYXQiOjE3Njc2Mzg5OTUsImV4cCI6MTc2NzY0NjE5NSwianRpIjoiMWJhYzVmYjAtZTNlNi00YWRiLWI5ZGEtOWVmYTg2ZDE4MjQ4Iiwic2NvcGVzIjoicHVibGljIGJhY2tvZmZpY2UiLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImJ1eWFuYmF0LmNoQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5MDMzNjcyIiwicm9sZSI6ImRyaXZlciJ9fQ.lLXhFr6dlwjsu_Z77tsBye1Z_WATxvVVOozAww5MAF72i15QUXwBp7ZnL1CXUVWlVzguhkaSjrL0zqs-9iVzIOmU85QjkgHGu4SjzzcvrArLrPTPg8hgyq0w2YgBPM2hXaZdEDg-cf5xhVR8MSQTQ0DchI1-jjTTKgxyphORDD5HTlrncUGnSymmbEt6b89zY1e6b4Arsp7yLmSlpdtm1X1CvEyO-pHnO8Dz3nyMpvuAVDXs3rIp7FOUWSY6uShSL9GAAO4XhIpxhCDQUTqMSx3o_yBCPRWOZB9AUJxM2sqfwdaLNiKfUoAMbK0glZFbvqe6ORYTLqJqt4I2KEt3xw`,
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
