import { createSlice } from '@reduxjs/toolkit';
import { Wallet, Transaction, Bank } from '../../../_types';

type WalletSliceInitialState = {
  isLoading: boolean;
  error: Record<string, unknown>;
  wallet: Wallet | null;
  transactions: Array<Transaction>;
  address: string;
};

const initialState: WalletSliceInitialState = {
  isLoading: true,
  error: {},
  wallet: null,
  transactions: [],
  address: "",
};

export const walletSlice = createSlice({
  name: 'wallet',
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
    getWalletSuccess(state, action: { payload: Wallet }) {
      state.isLoading = false;
      state.wallet = action.payload;
    },
    getTransactionsSuccess(state, action: { payload: Array<Transaction> }) {
      state.isLoading = false;

      state.transactions = action.payload;
    },
    getAddressSuccess(state, action: { payload: string }) {
      state.isLoading = false;
      state.address = action.payload;
    },
  },
});

export default walletSlice.reducer;
