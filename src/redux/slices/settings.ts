import { createSlice } from '@reduxjs/toolkit';

export interface ISettingsReduxState {
  locationPermission: boolean;
}

const initialState = {
  locationPermission: false,
} as ISettingsReduxState;

const settingsSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    changeLocationPermission: (
      state,
      action: { payload: ISettingsReduxState['locationPermission'] },
    ) => {
      return { ...state, locationPermission: action.payload };
    },
  },
});

export default settingsSlice;
