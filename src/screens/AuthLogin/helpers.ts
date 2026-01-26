import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { Buffer } from 'buffer';

import constants from '@/constants';
import { API_URL, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } from '@env';

export const login = async (username: string, password: string) => {
  const authHeader = Buffer.from(
    `${OAUTH_CLIENT_ID}:${OAUTH_CLIENT_SECRET}`,
  ).toString('base64');

  const { data } = await axios.post(
    `${API_URL}/oauth/token`,
    {
      grant_type: 'password',
      username: username,
      password: password,
      scope: 'public',
    },
    { headers: { Authorization: `Basic ${authHeader}` } },
  );

  //ene iluu yum shig sanagdsaj bn
  await Keychain.setGenericPassword(data?.refresh_token, data?.access_token, {
    service: constants.keyChainAuthServiceKey,
  });

  return data;
};
