// src/config/constants.ts
import Constants from 'expo-constants';

const ENV = {
  development: {
    API_BASE_URL: 'https://dev-api.unlimitedcarrier.mn',
    GRAPHQL_URL: 'https://dev-api.unlimitedcarrier.mn/graphql',
    OAUTH_CLIENT_ID: process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID || '',
    OAUTH_CLIENT_SECRET: process.env.EXPO_PUBLIC_OAUTH_CLIENT_SECRET || '',
    API_TIMEOUT: 10000,
  },
  staging: {
    API_BASE_URL: 'https://staging-api.unlimitedcarrier.mn',
    GRAPHQL_URL: 'https://staging-api.unlimitedcarrier.mn/graphql',
    OAUTH_CLIENT_ID: process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID || '',
    OAUTH_CLIENT_SECRET: process.env.EXPO_PUBLIC_OAUTH_CLIENT_SECRET || '',
    API_TIMEOUT: 15000,
  },
  production: {
    API_BASE_URL: 'https://api.unlimitedcarrier.mn',
    GRAPHQL_URL: 'https://api.unlimitedcarrier.mn/graphql',
    OAUTH_CLIENT_ID: process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID || '',
    OAUTH_CLIENT_SECRET: process.env.EXPO_PUBLIC_OAUTH_CLIENT_SECRET || '',
    API_TIMEOUT: 15000,
  },
};

const getEnvVars = () => {
  const releaseChannel =
    Constants.expoConfig?.extra?.releaseChannel || 'development';

  if (releaseChannel.includes('production')) return ENV.production;
  if (releaseChannel.includes('staging')) return ENV.development;
  return ENV.production;
};

export const {
  API_BASE_URL,
  GRAPHQL_URL,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  API_TIMEOUT,
} = getEnvVars();
