import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { Buffer } from 'buffer';
import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, API_URL } from '@env';

import constants from '@/constants';

  console.log(API_URL, 'asofjsffwefwef')


export const refreshAccessToken = async (): Promise<string> => {
  const credentials = await Keychain.getGenericPassword({
    service: constants.keyChainAuthServiceKey,
  });

  const authHeader = await Buffer.from(
    `${OAUTH_CLIENT_ID}:${OAUTH_CLIENT_SECRET}`,
  ).toString('base64');

  console.log(API_URL, 'asofjsffwefwef')

  console.log(credentials, 'credentialscredentialscredentials')

  if (!credentials) {
    console.log('No credentials found, fetching new access token', credentials);

    const { data } = await axios.post(
      `${API_URL}/oauth/token`,
      {
        grant_type: 'client_credentials',
        scope: 'public',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authHeader}`,
        },
      },
    );

    console.log('Fetched new access token using client credentials', data);

    await Keychain.setGenericPassword(data?.access_token, data?.access_token, {
      service: constants.keyChainAuthServiceKey,
    });

    return data.access_token;
  }

  console.log('Refreshing access token using refresh token', credentials);

  const { data } = await axios.post(
    `${API_URL}/oauth/token`,
    {
      grant_type: 'refresh_token',
      refresh_token: credentials.username,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authHeader}`,
      },
    },
  );

  await Keychain.setGenericPassword(data?.refresh_token, data?.access_token, {
    service: constants.keyChainAuthServiceKey,
  });

  return data.access_token;
};
