import { Business } from './Authentication';
export interface BusinessMetrics {
  total_revenue: number;
  active_customers: number;
  orders_completed: number;
  unpaid_invoices: number;
  hasStorefront: boolean;
  hasProducts: boolean;
  hasServices: boolean;
  hasCompleteBusiness: boolean;
}

export type UpdateBusiness = Pick<
  Business,
  | 'type'
  | 'country'
  | 'state'
  | 'city'
  | 'business_name'
  | 'address'
  | 'phone'
  | 'currency'
>;
