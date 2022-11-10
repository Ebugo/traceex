import { createSlice } from '@reduxjs/toolkit';
import { BUSINESS_TYPES, COUNTRIES, STATES } from '../../constants';
import { DropDown, Currencies } from '../../../_types';

type DropdownSliceInitialState = {
  isLoading: boolean;
  error: Record<string, unknown>;
  states: Array<DropDown & { id: number }>;
  businessTypes: Array<DropDown>;
  countries: Array<DropDown>;
  currencies: Array<Currencies>;
};

const initialState: DropdownSliceInitialState = {
  isLoading: true,
  error: {},
  states: STATES,
  businessTypes: BUSINESS_TYPES,
  countries: COUNTRIES,
  currencies: [],
};

export const dropDownSlice = createSlice({
  name: 'dropdowns',
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
    getCurrenciesSuccess(state, action: { payload: Array<Currencies> }) {
      state.isLoading = false;
      state.currencies = action.payload;
    },
  },
});

export default dropDownSlice.reducer;
