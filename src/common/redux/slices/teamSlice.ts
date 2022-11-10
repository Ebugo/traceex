import { createSlice } from '@reduxjs/toolkit';
import { Team } from '../../../_types';

type TeamSliceInitialState = {
  isLoading: boolean;
  error: Record<string, unknown>;
  teamMembers: Team[];
};

const initialState: TeamSliceInitialState = {
  isLoading: true,
  error: {},
  teamMembers: [],
};

export const teamSlice = createSlice({
  name: 'teams',
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
    getTeamMembersSuccess(state, action: { payload: Team[] }) {
      state.isLoading = false;
      state.teamMembers = action.payload;
    },
  },
});

export default teamSlice.reducer;
