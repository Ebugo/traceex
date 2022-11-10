import { storeFrontSlice as slice } from '../slices/storeFrontSlice';
import { dispatch } from '../store';
import { Business } from '../../../_types';
import { getStoreFrontApi } from '../../../_apis_/storeFront';

export function getStoreFront(business_id: Business['id']) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await getStoreFrontApi(business_id);

      const { data } = response;

      const parsedData = Object.keys(data).length === 0 ? null : data;

      dispatch(slice.actions.getStoreFrontSuccess(parsedData));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}
