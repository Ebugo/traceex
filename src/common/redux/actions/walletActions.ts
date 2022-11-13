import { walletSlice as slice } from '../slices/walletSlice';
import { dispatch } from '../store';
import {
  getAddressApi,
  getCoinsApi,
  getTransactionsApi,
  getWalletApi,
  getWalletsApi,
} from '../../../_apis_/wallet';

export function getWallet(token: string, network: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await getWalletApi(token, network);

      dispatch(slice.actions.getWalletSuccess(data));

      dispatch(slice.actions.startLoading());

      const { data: transactionData } = await getTransactionsApi();

      dispatch(slice.actions.getTransactionsSuccess(transactionData));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}

export function getWallets() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await getWalletsApi();
      console.log({ data })

      dispatch(slice.actions.getWalletsSuccess(data));

      // dispatch(slice.actions.startLoading());

      // const { data: transactionData } = await getTransactionsApi();

      // dispatch(slice.actions.getTransactionsSuccess(transactionData));
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

export function getCoins() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await getCoinsApi();

      dispatch(slice.actions.getCoinsSuccess(data));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}

export function getTransactions() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await getTransactionsApi();

      dispatch(slice.actions.getTransactionsSuccess(data));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}
