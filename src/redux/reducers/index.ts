import { combineReducers } from '@reduxjs/toolkit';

import authSlice from '../slices/auth';
import generalSlice from '../slices/general';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  general: generalSlice.reducer,
});

export default rootReducer;
