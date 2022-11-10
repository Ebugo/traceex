import {
  HttpSuccessResponse,
  Wallet,
  Transaction,
  Bank,
  Withdraw,
  AccountNameLookup,
} from '../_types';
import httpService from './httpService';

export const getWalletApi = async (): Promise<HttpSuccessResponse<Wallet>> => {
  return httpService.get(`wallet`);
};

export const getTransactionsApi = async (): Promise<
  HttpSuccessResponse<Transaction[]>
> => {
  return httpService.get(`transaction`);
};

export const updateTransactionPinApi = async (
  pin: string
): Promise<HttpSuccessResponse<Transaction>> => {
  return httpService.patch('transaction/pin', {
    pin,
  });
};

export const getAddressApi = async (): Promise<HttpSuccessResponse<string>> => {
  return httpService.get(`payment/address`);
};

export const getAccountNameApi = async (
  selectedBankCode: Bank['code'],
  accountNumber: Withdraw['account_number']
): Promise<HttpSuccessResponse<AccountNameLookup>> => {
  return httpService.get(`payment/accountname`, {
    params: { selectedBankCode, accountNumber },
  });
};

export const withdrawFundsApi = async (
  payload: Withdraw
): Promise<HttpSuccessResponse<Transaction>> => {
  return httpService.post('wallet/withdraw', payload);
};
