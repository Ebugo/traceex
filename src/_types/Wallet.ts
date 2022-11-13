export interface Wallet {
  id: string;
  address: string;
  app: any;
  contact: any;
  createdAt: string;
  expiresAt: null | string;
  index: number;
  onChainBalance: string;
  platformBalance: string;
  targetAmount: null | string;
  token: any;
  totalRecieved: string;
  totalSpent: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  amount: string;
  confirmed: boolean;
  createdAt: string;
  metadata: any;
  shouldAggregate: boolean;
  type: string;
  updatedAt: string;
  wallet: Wallet;

}

export interface WithdrawApi {
  amount: string;
  to: string;
  token: string;
  network: string;
  blockchain: string;
}

export interface Withdraw {
  amount: string;
  to: string;
  coin: string;
  network: string;
  blockchain: string;
}

export interface Deposit {
  address: string;
  amount: string;
  coin: string;
  network: string;
  // pin: string;
}

export interface Bank {
  active: boolean;
  code: string;
  country: string;
  createdAt: string;
  currency: string;
  gateway: string;
  id: number;
  is_deleted: boolean;
  longcode: string;
  name: string;
  pay_with_bank: boolean;
  slug: string;
  type: string;
  updatedAt: string;
}

export interface AccountNameLookup {
  account_name: string;
  account_number: string;
  bank_id: number;
}

export interface Token {
  decimals: number;
  minimumDrainAmount: number;
  contractAddress: null | string;
  symbol: string;
  name: string;
  blockchain: string;
  network: string;
  coinGeckoId: string;
  isNativeToken: boolean;
  isStableToken: boolean;
  verified: boolean;
}
