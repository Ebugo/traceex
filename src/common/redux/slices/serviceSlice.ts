import { createSlice } from '@reduxjs/toolkit';
import { Service } from '../../../_types';

type ServiceSliceInitialState = {
  isLoading: boolean;
  error: Record<string, unknown>;
  services: Service[];
};

const initialState: ServiceSliceInitialState = {
  isLoading: true,
  error: {},
  services: [],
};

export const serviceSlice = createSlice({
  name: 'services',
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
    getServicesSuccess(state, action: { payload: Service[] }) {
      state.isLoading = false;
      state.services = action.payload;
    },
  },
});

export default serviceSlice.reducer;
