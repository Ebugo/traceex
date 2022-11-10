import { teamSlice as slice } from '../slices/teamSlice';
import { dispatch } from '../store';
import { Business } from '../../../_types';
import { getTeamsApi } from '../../../_apis_/team';

export function getTeamMembers(businessId: Business['id']) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await getTeamsApi(businessId);

      dispatch(slice.actions.getTeamMembersSuccess(data));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}
