import { Dispatch, SetStateAction } from 'react';
import { Business } from './Authentication';
import { Customer } from './Customer';
import { Invoice } from './Invoice';
import { Product } from './Product';

export type OrderStatus =
  | 'CREATED'
  | 'ACCEPTED'
  | 'SCHEDULED'
  | 'IN STORE'
  | 'PROCESSING'
  | 'DELIVERY'
  | 'COMPLETED';
export interface Order {
  id: string;
  customer: Customer['id'];
  status: OrderStatus;
  customer_name: string;
  delivery_address?: string;
  pickup_address?: string;
  is_accepted: boolean;
  phone: string;
  pickup_date?: string | null;
  pickup_time?: string | null;
  reason?: string | null;
  business: Business['id'];
  is_delivery: boolean;
  is_pickup: boolean;
  is_complete?: boolean;
  is_booking: boolean;
  booking_date: string;
  booking_time: string;
  created_at: string;
  updated_at: string;
  service_orderToservice: null;
  invoice: Invoice[];
}

export type OrderForm = Pick<
  Order,
  | 'customer'
  | 'is_pickup'
  | 'pickup_date'
  | 'pickup_time'
  | 'pickup_address'
  | 'is_delivery'
> & {
  delivery_fee: Invoice['delivery_fee'] | null;
  delivery_type: Invoice['delivery_type'] | null;
  sendSMS: boolean;
  is_paid: Invoice['is_paid'];
};

export type CreateOrder = Omit<
  OrderForm,
  'delivery_fee' | 'delivery_type' | 'sendSMS' | 'is_paid'
> & {
  business: Business['id'];
  status: Order['status'];
  delivery_address?: OrderForm['pickup_address'];
  customer_name: string;
  phone: Customer['phone'];
  is_accepted: boolean;
};

export type CreateInvoice = {
  customer: OrderForm['customer'];
  is_cash: boolean;
  total?: string;
  amount_collected?: string;
  invoice_items?: Array<{
    item_id: Product['id'];
    quantity: string;
    total: string;
  }>;
  order?: Order['id'];
  delivery_fee?: OrderForm['delivery_fee'];
  delivery_type?: OrderForm['delivery_type'];
  sendSMS: OrderForm['sendSMS'];
  is_paid: OrderForm['is_paid'];
};

export type DispatchSetOrder = Dispatch<SetStateAction<Order | null>>;
