import {
  HttpSuccessResponse,
  Order,
  CreateOrder,
  CreateInvoice,
  Invoice,
} from '../_types';
import httpService from './httpService';

export const getOrdersApi = async (): Promise<HttpSuccessResponse<Order[]>> => {
  return httpService.get('order');
};

export const createOrderApi = async (
  payload: CreateOrder
): Promise<HttpSuccessResponse<Order>> => {
  return httpService.post('order', payload);
};

export const createInvoiceApi = async (
  payload: CreateInvoice
): Promise<HttpSuccessResponse<Invoice>> => {
  return httpService.post('invoice', payload);
};

export const acceptOrderApi = async (
  payload: Pick<Order, 'pickup_date' | 'pickup_time' | 'is_pickup'> & {
    order_id: Order['id'];
  }
): Promise<HttpSuccessResponse<Order>> => {
  return httpService.patch('order/accept', payload);
};

export const declineOrderApi = async (
  payload: Pick<Order, 'reason'> & {
    order_id: Order['id'];
  }
): Promise<HttpSuccessResponse<Order>> => {
  return httpService.patch('order/decline', payload);
};

export const getOrderByIdApi = async (
  orderId: Order['id']
): Promise<HttpSuccessResponse<Order>> => {
  return httpService.get(`order/${orderId}`);
};

export const updateOrderStatusApi = async (
  payload: Pick<Order, 'id' | 'status' | 'is_complete'>
): Promise<HttpSuccessResponse<Order>> => {
  return httpService.patch('order/update', payload);
};
