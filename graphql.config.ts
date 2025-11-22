import type { IGraphQLConfig } from 'graphql-config';

const headers = { Authorization: `Bearer ${process.env.EXPO_PUBLIC_INTROSPECTION_TOKEN}` };

const config: IGraphQLConfig = {
  schema: 'schema.graphql',
  extensions: {
    endpoints: {
      default: { url: 'http://127.0.0.1:3003/graphql', headers },
      staging: {
        url: 'https://api.unlimitedcarrier.mn/graphql',
        introspect: true,
        headers,
      },
    },
  },
};

export default config;
