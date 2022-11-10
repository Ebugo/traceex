import { createSlice } from '@reduxjs/toolkit';
import { StoreFront } from '../../../_types';

type StoreFrontSliceInitialState = {
  isLoading: boolean;
  error: Record<string, unknown>;
  storeFront: StoreFront | null;
};

const initialState: StoreFrontSliceInitialState = {
  isLoading: true,
  error: {},
  storeFront: null,
};

export const storeFrontSlice = createSlice({
  name: 'storeFront',
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
    getStoreFrontSuccess(state, action: { payload: StoreFront | null }) {
      state.isLoading = false;
      state.storeFront = action.payload;
    },
  },
});

export default storeFrontSlice.reducer;
