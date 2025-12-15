import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';

import { useGetUserLazyQuery } from '@/gql/query/getUserQuery.generated';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import authSlice from '@/redux/slices/auth';

const useInit = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const appState = useRef(AppState.currentState);
  const [getUser] = useGetUserLazyQuery({
    fetchPolicy: 'no-cache',
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        init();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [isAuthenticated]);

  const init = async () => {
    if (isAuthenticated) {
      const { data } = await getUser();
      dispatch(authSlice.actions.changeUser(data?.me));
    }
  };
};

export default useInit;
