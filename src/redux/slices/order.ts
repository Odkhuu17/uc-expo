import { CreateAddressMutation } from '@/gql/mutations/createAddressMutation.generated';
import { GetOrderQuery } from '@/gql/query/getOrder.generated';
import { createSlice } from '@reduxjs/toolkit';

export interface IOrderReduxState {
  orderLocation?: {
    origin?: CreateAddressMutation['createAddress'];
    destination?: CreateAddressMutation['createAddress'];
    selected: 'origin' | 'destination';
  };
  order?: GetOrderQuery['order'];
}

const initialState = {
  orderLocation: {
    selected: 'origin',
  },
} as IOrderReduxState;

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    changeOrderLocation: (
      state,
      action: { payload: IOrderReduxState['orderLocation'] }
    ) => {
      return { ...state, orderLocation: action.payload };
    },
    changeOrder: (state, action: { payload: IOrderReduxState['order'] }) => {
      return { ...state, order: action.payload };
    },
  },
});

export default orderSlice;
