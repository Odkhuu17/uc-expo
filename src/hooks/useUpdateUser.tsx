import { useEffect } from 'react';

import { useGetMeQuery } from '@/gql/queries/getMe.generated';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import authSlice from '@/redux/slices/auth';

const useUpdateUser = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { data } = useGetMeQuery({
    fetchPolicy: 'no-cache',
    skip: !isAuthenticated,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(authSlice.actions.changeUser(data.me!));
    }
  }, [data]);
};
export default useUpdateUser;
