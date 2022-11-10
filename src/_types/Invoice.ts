import { Business } from './Authentication';
import { Customer } from './Customer';
import { Order } from './Order';
import { Product } from './Product';

export interface Invoice {
  id: string;
  created_at: string;
  updated_at: string;
  order: string;
  business: string;
  delivery_type: string;
  delivery_fee: string;
  is_cash: boolean;
  customer: string;
  note: string;
  is_paid: boolean;
  total: string;
  payment_link: string;
  amount_collected: string;
  customer_customerToinvoice: Customer;
  invoice_item: Array<{
    total: string;
    id: string;
    created_at: string;
    updated_at: string;
    product: Product['id'];
    invoice: Invoice['id'];
    quantity: string;
    business: Business['id'];
    product_invoice_itemToproduct: Product;
  }>;
  order_invoiceToorder: Order;
  _count: Count;
}

export interface Count {
  invoice_item: number;
}
