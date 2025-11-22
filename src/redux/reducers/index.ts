import { combineReducers } from '@reduxjs/toolkit';

import authSlice from '../slices/auth';
import generalSlice from '../slices/general';
import orderSlice from '../slices/order';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  general: generalSlice.reducer,
  order: orderSlice.reducer,
});

export default rootReducer;
