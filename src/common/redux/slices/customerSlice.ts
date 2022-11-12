import { createSlice } from '@reduxjs/toolkit';
import { Customer } from '../../../_types';

type CustomerSliceInitialState = {
  isLoading: boolean;
  error: Record<string, unknown>;
  customers: Customer[];
  customer: Customer | null;
};

const initialState: CustomerSliceInitialState = {
  isLoading: true,
  error: {},
  customers: [],
  customer: null,
};

export const customerSlice = createSlice({
  name: 'customers',
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
    getCustomersSuccess(state, action: { payload: Customer[] }) {
      state.isLoading = false;
      state.customers = action.payload;
    },
    getCustomerByIdSuccess(state, action: { payload: Customer }) {
      state.isLoading = false;
      state.customer = action.payload;
    },
    clearCustomer(state) {
      state.isLoading = false;
      state.customer = initialState.customer;
    },
  },
});

export default customerSlice.reducer;
