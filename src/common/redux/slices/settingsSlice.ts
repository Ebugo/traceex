import { createSlice } from '@reduxjs/toolkit';

type SettingsInitialState = {
  isLoading: boolean;
  error: Record<string, unknown>;
  miniNav: boolean;
};

const initialState: SettingsInitialState = {
  isLoading: true,
  error: {},
  miniNav: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
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
    toggleMiniNav(state) {
      state.isLoading = false;
      state.miniNav = !state.miniNav;
    },
  },
});

export const setingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
