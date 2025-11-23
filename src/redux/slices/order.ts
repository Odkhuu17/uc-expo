import { CreateAddressMutation } from '@/gql/mutations/createAddressMutation.generated';
import { createSlice } from '@reduxjs/toolkit';

export interface IOrderReduxState {
  orderLocation?: {
    origin?: CreateAddressMutation['createAddress'];
    destination?: CreateAddressMutation['createAddress'];
    selected: 'origin' | 'destination';
  };
  order?: {
    packageType: string;
    travelHour: string;
    travelTime: string;
    vatIncluded: boolean;
    priceNegotiable: boolean;
    price: string;
    quantity: string;
    additionalInfo: string;
    receiverName: string;
    receiverMobile: string;
    senderName: string;
    senderMobile: string;
    video: string;
    images: string[];
    audio: string;
  };
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
