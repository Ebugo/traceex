import { createSlice } from '@reduxjs/toolkit';
import { Order } from '../../../_types';

type OrderSliceInitialState = {
  isLoading: boolean;
  error: Record<string, unknown>;
  orders: Order[];
  order: Order | null;
};

const initialState: OrderSliceInitialState = {
  isLoading: true,
  error: {},
  orders: [],
  order: null,
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getOrdersSuccess(state, action: { payload: Order[] }) {
      state.isLoading = false;
      state.orders = action.payload;
    },
    getOrderByIdSuccess(state, action: { payload: Order }) {
      state.isLoading = false;
      state.order = action.payload;
    },
    clearOrder(state) {
      state.isLoading = false;
      state.order = null;
    },
  },
});

export default orderSlice.reducer;
