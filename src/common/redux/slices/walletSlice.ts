import { createSlice } from '@reduxjs/toolkit';
import { Wallet, Transaction, Bank } from '../../../_types';
import { Token } from '../../../_types/Wallet';

type WalletSliceInitialState = {
  isLoading: boolean;
  error: Record<string, unknown>;
  wallet: Wallet | null;
  wallets: Wallet[];
  coins: Token[];
  transactions: Array<Transaction>;
  address: string;
  banks: Array<any>;
};

const initialState: WalletSliceInitialState = {
  isLoading: true,
  error: {},
  wallet: null,
  wallets: [],
  coins: [],
  transactions: [],
  address: "",
  banks: []
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
    getWalletsSuccess(state, action: { payload: Wallet[] }) {
      state.isLoading = false;
      state.wallets = action.payload;
    },
    getTransactionsSuccess(state, action: { payload: Array<Transaction> }) {
      state.isLoading = false;

      state.transactions = action.payload;
    },
    getAddressSuccess(state, action: { payload: string }) {
      state.isLoading = false;
      state.address = action.payload;
    },
    getCoinsSuccess(state, action: { payload: Token[] }) {
      state.isLoading = false;
      state.coins = action.payload;
    },
  },
});

export default walletSlice.reducer;
