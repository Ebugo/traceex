import { Dispatch, SetStateAction } from 'react';
import { Business, RefreshTokenPayload } from './Authentication';
export interface Customer {
  id: string;
  first_name: string;
  last_name?: string;
  email?: string;
  phone: string;
  address?: string;
  business: Business['id'];
  refresh_token: RefreshTokenPayload['refresh_token'];
  created_at: string;
  updated_at: string;
}

export type CreateCustomer = Pick<
  Customer,
  'first_name' | 'last_name' | 'email' | 'phone' | 'address'
>;

export type UpdateCustomer = CreateCustomer & { id: Customer['id'] };

export type DispatchSetCustomer = Dispatch<SetStateAction<Customer | null>>;
