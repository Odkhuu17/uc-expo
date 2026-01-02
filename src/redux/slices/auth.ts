import { createSlice } from '@reduxjs/toolkit';

import { GetMeQuery } from '@/gql/queries/getMe.generated';

export interface IAuthReduxState {
  isAuthenticated: boolean;
  user?: GetMeQuery['me'];
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
