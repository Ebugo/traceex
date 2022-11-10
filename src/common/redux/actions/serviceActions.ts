import { serviceSlice as slice } from '../slices/serviceSlice';
import { dispatch } from '../store';
import { Business } from '../../../_types';
import { getServicesApi } from '../../../_apis_/service';

export function getServices(business_id: Business['id']) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await getServicesApi(business_id);

      const { data } = response;

      dispatch(slice.actions.getServicesSuccess(data));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}
