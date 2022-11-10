import { createSlice } from '@reduxjs/toolkit';
import { BusinessMetrics, Business } from '../../../_types';

type BusinessSliceInitialState = {
  isLoading: boolean;
  error: Record<string, unknown>;
  metrics: BusinessMetrics | null;
  onboardingPercentage: number;
  onboardingComplete: boolean;
  businessProfile: Business | null;
};

const initialState: BusinessSliceInitialState = {
  isLoading: true,
  error: {},
  metrics: null,
  onboardingPercentage: 0,
  onboardingComplete: false,
  businessProfile: null,
};

export const businessSlice = createSlice({
  name: 'business',
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
    getMetricsSuccess(state, action: { payload: BusinessMetrics }) {
      const totalMetrics = Object.values(
        action.payload as BusinessMetrics
      ).filter((value) => [true, false].includes(value));

      state.isLoading = false;
      state.metrics = action.payload;
      state.onboardingPercentage =
        (totalMetrics.filter((item) => !!item).length / totalMetrics.length) *
        100;

      state.onboardingComplete = state.onboardingPercentage === 100;
    },
    getBusinessSuccess(state, action: { payload: Business }) {
      state.isLoading = false;
      state.businessProfile = action.payload;
    },
  },
});

export default businessSlice.reducer;
