import { createSlice } from '@reduxjs/toolkit';

import { GetUserQuery } from '@/gql/query/getUserQuery.generated';

export interface IAuthReduxState {
  isAuthenticated: boolean;
  user?: GetUserQuery['me'] & { verifyStatus?: string };
}

const initialState: IAuthReduxState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeUser: (state, action: { payload: IAuthReduxState['user'] }) => {
      return { ...state, user: action.payload };
    },
    login: state => {
      return { ...state, isAuthenticated: true };
    },
    logout: state => {
      return { ...state, isAuthenticated: false };
    },
  },
});

export default authSlice;
