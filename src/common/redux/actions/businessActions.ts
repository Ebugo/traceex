import { businessSlice as slice } from '../slices/businessSlice';
import { dispatch } from '../store';
import { Business } from '../../../_types';
import {
  getBusinessMetricsApi,
  getBusinessApi,
} from '../../../_apis_/business';

export function getBusinessMetrics(businessId: Business['id']) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await getBusinessMetricsApi(businessId);

      dispatch(slice.actions.getMetricsSuccess(data));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}

export function getBusiness() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await getBusinessApi();

      dispatch(slice.actions.getBusinessSuccess(data));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}
