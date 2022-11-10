import { HttpSuccessResponse, Invoice, Optional } from '../_types';
import httpService from './httpService';

export const getInvoicesApi = async (): Promise<
  HttpSuccessResponse<Invoice[]>
> => {
  return httpService.get('invoice');
};

export const sendInvoiceReminderApi = async (
  invoiceId: Invoice['id']
): Promise<HttpSuccessResponse<{ success: boolean }>> => {
  return httpService.post(`invoice/${invoiceId}/remind`);
};

export const updateInvoiceApi = async (
  id: Invoice['id'],
  payload: Optional<
    Pick<
      Invoice,
      'customer' | 'total' | 'is_cash' | 'note' | 'is_paid' | 'amount_collected'
    >,
    'note'
  >
): Promise<HttpSuccessResponse<{ success: boolean }>> => {
  return httpService.patch(`invoice/update`, { id, ...payload });
};
