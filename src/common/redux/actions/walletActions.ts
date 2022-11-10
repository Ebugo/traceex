import { walletSlice as slice } from '../slices/walletSlice';
import { dispatch } from '../store';
import {
  getAddressApi,
  getTransactionsApi,
  getWalletApi,
} from '../../../_apis_/wallet';

export function getWallet() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await getWalletApi();

      dispatch(slice.actions.getWalletSuccess(data));

      dispatch(slice.actions.startLoading());

      const { data: transactionData } = await getTransactionsApi();

      dispatch(slice.actions.getTransactionsSuccess(transactionData));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}

export function getAddress() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await getAddressApi();

      dispatch(slice.actions.getAddressSuccess(data));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}
