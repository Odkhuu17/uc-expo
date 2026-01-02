import * as Keychain from 'react-native-keychain';

import { apolloClient } from '@/apollo/useClient';
import { useAppDispatch } from '@/redux/hooks';
import constants from '@/constants';
import authSlice from '@/redux/slices/auth';

const useLogout = () => {
  const dispatch = useAppDispatch();

  const logout = async () => {
    await apolloClient?.clearStore();
    await Keychain.resetGenericPassword({
      service: constants.keyChainAuthServiceKey,
    });
    dispatch(authSlice.actions.logout());
  };

  return { logout };
};

export default useLogout;
