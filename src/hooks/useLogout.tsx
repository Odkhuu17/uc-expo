import * as Keychain from 'react-native-keychain';

import { apolloClient } from '@/apollo/useClient';
import { useAppDispatch } from '@/redux/hooks';
import constants from '@/constants';
import authSlice from '@/redux/slices/auth';

const useLogout = () => {
  const dispatch = useAppDispatch();

  const logout = async () => {
    dispatch(authSlice.actions.logout());
    await Keychain.resetGenericPassword({
      service: constants.keyChainAuthServiceKey,
    });
    await apolloClient?.clearStore();
  };

  return { logout };
};

export default useLogout;
