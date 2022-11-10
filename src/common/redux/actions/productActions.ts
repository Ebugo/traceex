import { productSlice as slice } from '../slices/productSlice';
import { dispatch } from '../store';
import { Business } from '../../../_types';
import { getProductsApi } from '../../../_apis_/product';

export function getProducts(business_id: Business['id']) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await getProductsApi(business_id);

      const { data } = response;

      dispatch(slice.actions.getProductsSuccess(data));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}
