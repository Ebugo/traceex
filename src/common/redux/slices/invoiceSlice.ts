import { createSlice } from '@reduxjs/toolkit';
import { Invoice } from '../../../_types';

type InvoiceSliceInitialState = {
  isLoading: boolean;
  error: Record<string, unknown>;
  unpaidInvoices: Invoice[];
};

const initialState: InvoiceSliceInitialState = {
  isLoading: true,
  error: {},
  unpaidInvoices: [],
};

export const invoiceSlice = createSlice({
  name: 'invoices',
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
    getInvoicesSuccess(state, action: { payload: Invoice[] }) {
      state.isLoading = false;
      state.unpaidInvoices = action.payload.filter(
        (invoice) => invoice.is_paid === false
      );
    },
  },
});

export default invoiceSlice.reducer;
