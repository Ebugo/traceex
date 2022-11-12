import {
  HttpSuccessResponse,
  Customer,
  CreateCustomer,
  UpdateCustomer,
} from '../_types';
import httpService from './httpService';

export const getCustomersApi = async (): Promise<
  HttpSuccessResponse<Customer[]>
> => {
  return httpService.get('customer', {});
};

export const createCustomerApi = async (
  payload: CreateCustomer
): Promise<HttpSuccessResponse<Customer>> => {
  return httpService.post('customer', payload);
};

export const updateCustomerApi = async (
  payload: UpdateCustomer
): Promise<HttpSuccessResponse<Customer>> => {
  return httpService.patch('customer/update', payload);
};

export const deleteCustomerApi = async (
  id: Customer['id']
): Promise<HttpSuccessResponse<Customer>> => {
  return httpService.patch('customer/delete', { id });
};

export const getCustomerByIdApi = async (
  customerId: Customer['id']
): Promise<HttpSuccessResponse<Customer>> => {
  return httpService.post(`/customer/${customerId}`);
};
