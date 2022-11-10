export interface Wallet {
  id: string;
  created_at: string;
  updated_at: string;
  business: string;
  balance: string;
  previous_balance: string;
  pin: string | null;
  hasPin: boolean;
}

export interface Transaction {
  id: string;
  created_at: string;
  updated_at: string;
  business: string;
  fees: string;
  reference: string;
  event: string;
  amount: string;
  channel: string;
  type: string;
  user: string;
  // previousBalance: string; // computed
}

export interface Withdraw {
  account_number: string;
  amount: string;
  bank_code: string;
  account_name: string;
  pin: string;
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
