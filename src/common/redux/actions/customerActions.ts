import { customerSlice as slice } from '../slices/customerSlice';
import { dispatch } from '../store';
import {
  getCustomersApi,
  getCustomerByIdApi,
} from '../../../_apis_/customer';
import { Customer } from '../../../_types';

export function getCustomers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await getCustomersApi();

      const { data } = response;

      dispatch(slice.actions.getCustomersSuccess(data));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}

export function getCustomerById(customerId: Customer['id']) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await getCustomerByIdApi(customerId);

      const { data } = response;

      dispatch(slice.actions.getCustomerByIdSuccess(data));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}

export function clearCustomer() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.clearCustomer());
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}
