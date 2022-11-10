import { orderSlice as slice } from '../slices/orderSlice';
import { dispatch } from '../store';
import { getOrderByIdApi, getOrdersApi } from '../../../_apis_/order';
import { Order } from '../../../_types';

export function getOrders() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await getOrdersApi();

      dispatch(slice.actions.getOrdersSuccess(data));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}
export function getOrderById(orderId: Order['id']) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await getOrderByIdApi(orderId);

      dispatch(slice.actions.getOrderByIdSuccess(data));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}

export function clearOrder() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.clearOrder());
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}
