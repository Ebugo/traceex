import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../../_types';

type ProductSliceInitialState = {
  isLoading: boolean;
  error: Record<string, unknown>;
  products: Product[];
};

const initialState: ProductSliceInitialState = {
  isLoading: true,
  error: {},
  products: [],
};

export const productSlice = createSlice({
  name: 'products',
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
    getProductsSuccess(state, action: { payload: Product[] }) {
      state.isLoading = false;
      state.products = action.payload;
    },
  },
});

export default productSlice.reducer;
