import { invoiceSlice as slice } from '../slices/invoiceSlice';
import { dispatch } from '../store';
import { getInvoicesApi } from '../../../_apis_/invoice';

export function getInvoices() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await getInvoicesApi();

      dispatch(slice.actions.getInvoicesSuccess(data));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}
