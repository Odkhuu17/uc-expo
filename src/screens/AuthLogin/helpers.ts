import axios from 'axios';
import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';
import { Buffer } from 'buffer';

import constants from '@/constants';

export const login = async (username: string, password: string) => {
  const authHeader = Buffer.from(
    `${Config.OAUTH_CLIENT_ID}:${Config.OAUTH_CLIENT_SECRET}`,
  ).toString('base64');

  const { data } = await axios.post(
    `${Config.API_URL}/oauth/token`,
    {
      grant_type: 'password',
      username: username,
      password: password,
      scope: 'public backoffice',
    },
    { headers: { Authorization: `Basic ${authHeader}` } },
  );
  await Keychain.setGenericPassword(data?.refresh_token, data?.access_token, {
    service: constants.keyChainAuthServiceKey,
  });

  return data;
};
