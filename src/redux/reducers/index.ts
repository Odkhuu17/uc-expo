import { combineReducers } from '@reduxjs/toolkit';

import authSlice from '../slices/auth';
import generalSlice from '../slices/general';
import settingsSlice from '../slices/settings';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  general: generalSlice.reducer,
  settings: settingsSlice.reducer,
});

export default rootReducer;
