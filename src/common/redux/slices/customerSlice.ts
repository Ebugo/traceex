import { createSlice } from '@reduxjs/toolkit';
import { Customer, Invoice, Order } from '../../../_types';

type CustomerSliceInitialState = {
  isLoading: boolean;
  error: Record<string, unknown>;
  customers: Customer[];
  customer: Customer | null;
  orders: Order[];
  invoices: Invoice[];
};

const initialState: CustomerSliceInitialState = {
  isLoading: true,
  error: {},
  customers: [],
  customer: null,
  orders: [],
  invoices: [],
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
    getCustomerOrdersSuccess(state, action: { payload: Order[] }) {
      state.isLoading = false;
      state.orders = action.payload;
    },
    getCustomerInvoicesSuccess(state, action: { payload: Invoice[] }) {
      state.isLoading = false;
      state.invoices = action.payload;
    },
    clearCustomer(state) {
      state.isLoading = false;
      state.customer = initialState.customer;
      state.orders = initialState.orders;
      state.invoices = initialState.invoices;
    },
  },
});

export default customerSlice.reducer;
