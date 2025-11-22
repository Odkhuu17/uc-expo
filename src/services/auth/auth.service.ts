// src/services/auth/auth.service.ts
import axios from 'axios';
import { Buffer } from 'buffer';
import * as SecureStore from 'expo-secure-store';

import {
  API_BASE_URL,
  API_TIMEOUT,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
} from '@/config/constants';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  created_at: number;
  scope: string;
  token_type: string;
}

const axioClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

export const loginService = async ({
  username,
  password,
}: LoginCredentials): Promise<AuthTokens> => {
  const authHeader = Buffer.from(
    `${OAUTH_CLIENT_ID}:${OAUTH_CLIENT_SECRET}`
  ).toString('base64');

  const { data } = await axioClient.post<AuthTokens>(
    '/oauth/token',
    {
      grant_type: 'password',
      username: username,
      password: password,
      scope: 'public backoffice',
    },
    { headers: { Authorization: `Basic ${authHeader}` } }
  );
  await SecureStore.setItemAsync('accessToken', data.access_token);
  await SecureStore.setItemAsync('refreshToken', data.refresh_token);
  return data;
};

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = await SecureStore.getItemAsync('refreshToken');
  const authHeader = btoa(`${OAUTH_CLIENT_ID}:${OAUTH_CLIENT_SECRET}`);

  if (!refreshToken) {
    const { data } = await axioClient.post<AuthTokens>(
      '/oauth/token',
      {
        grant_type: 'client_credentials',
        scope: 'public backoffice',
      },
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
        },
      }
    );

    await SecureStore.setItemAsync('accessToken', data.access_token);
    if (data.refresh_token) {
      await SecureStore.setItemAsync('refreshToken', data.refresh_token);
    }

    return data.access_token;
  }

  const { data } = await axioClient.post<AuthTokens>(
    '/oauth/token',
    {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
    {
      headers: {
        Authorization: `Basic ${authHeader}`,
      },
    }
  );

  // Store new tokens
  await SecureStore.setItemAsync('accessToken', data.access_token);
  if (data.refresh_token) {
    await SecureStore.setItemAsync('refreshToken', data.refresh_token);
  }

  return data.access_token;
};
