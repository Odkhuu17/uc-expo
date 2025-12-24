import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { Buffer } from 'buffer';
import Config from 'react-native-config';

import constants from '@/constants';

export const refreshAccessToken = async (): Promise<string> => {
  const credentials = await Keychain.getGenericPassword({
    service: constants.keyChainAuthServiceKey,
  });

  const authHeader = await Buffer.from(
    `${Config.OAUTH_CLIENT_ID}:${Config.OAUTH_CLIENT_SECRET}`,
  ).toString('base64');

  if (!credentials) {
    const { data } = await axios.post(
      `${Config.API_URL}/oauth/token`,
      {
        grant_type: 'client_credentials',
        scope: 'public',
      },
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
        },
      },
    );

    await Keychain.setGenericPassword(data?.refresh_token, data?.access_token, {
      service: constants.keyChainAuthServiceKey,
    });

    return data.access_token;
  }

  const { data } = await axios.post(
    `${Config.API_URL}/oauth/token`,
    {
      grant_type: 'refresh_token',
      refresh_token: credentials.password,
    },
    {
      headers: {
        Authorization: `Basic ${authHeader}`,
      },
    },
  );

  await Keychain.setGenericPassword(data?.refresh_token, data?.access_token, {
    service: constants.keyChainAuthServiceKey,
  });

  return data.access_token;
};
