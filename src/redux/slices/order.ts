import { CreateAddressMutation } from '@/gql/mutations/createAddressMutation.generated';
import { createSlice } from '@reduxjs/toolkit';

export interface IOrderReduxState {
  orderLocation?: {
    origin?: CreateAddressMutation['createAddress'];
    destination?: CreateAddressMutation['createAddress'];
  };
  selectedLocation?: 'origin' | 'destination';
  carType: string;
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

const initialState = {} as IOrderReduxState;

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    changeSelectedLocation: (
      state,
      action: { payload: IOrderReduxState['selectedLocation'] }
    ) => {
      return { ...state, selectedLocation: action.payload };
    },
    changeCarType: (
      state,
      action: { payload: IOrderReduxState['carType'] }
    ) => {
      return { ...state, carType: action.payload };
    },
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
