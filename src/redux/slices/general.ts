import { createSlice } from '@reduxjs/toolkit';

export interface IGeneralReduxState {
  mode: 'driver' | 'shipper';
}

const initialState = {
  mode: 'shipper',
} as IGeneralReduxState;

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    changeMode: (state, action: { payload: IGeneralReduxState['mode'] }) => {
      return { ...state, mode: action.payload };
    },
  },
});

export default generalSlice;
