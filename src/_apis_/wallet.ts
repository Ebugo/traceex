import { getExchangeApi } from '.';
import {
  HttpSuccessResponse,
  Wallet,
  Transaction,
  Bank,
  Withdraw,
  AccountNameLookup,
} from '../_types';
import { Token, WithdrawApi } from '../_types/Wallet';
import httpService from './httpService';

export const getWalletApi = async (token: string, network: string): Promise<HttpSuccessResponse<Wallet>> => {
  return httpService.get(getExchangeApi() + `wallet`, { 
    params: {
      token, network
    }
  });
};

export const getWalletsApi = async (): Promise<HttpSuccessResponse<Wallet[]>> => {
  return httpService.get(getExchangeApi() + `wallets`);
};

export const getBalancesApi = async (): Promise<HttpSuccessResponse<Wallet>> => {
  return httpService.get(`balances`);
};

export const getTransactionsApi = async (): Promise<
  HttpSuccessResponse<Transaction[]>
> => {
  return httpService.get(getExchangeApi() + `transactions`);
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
  accountNumber: Withdraw['network']
): Promise<HttpSuccessResponse<AccountNameLookup>> => {
  return httpService.get(`payment/accountname`, {
    params: { selectedBankCode, accountNumber },
  });
};

export const withdrawFundsApi = async (
  payload: WithdrawApi
): Promise<HttpSuccessResponse<Transaction>> => {
  return httpService.post(getExchangeApi() + 'send-crypto', payload);
};

export const getCoinsApi = async (
): Promise<HttpSuccessResponse<Token[]>> => {
  return httpService.get('misc/tokens');
};
