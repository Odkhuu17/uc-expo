import { GetOrderQuery } from '@/gql/query/getOrder.generated';
import { createSlice } from '@reduxjs/toolkit';

export interface IOrderReduxState {
  order?: GetOrderQuery['order'];
}

const initialState = {} as IOrderReduxState;

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    changeOrder: (state, action: { payload: IOrderReduxState['order'] }) => {
      return { ...state, order: action.payload };
    },
  },
});

export default orderSlice;
