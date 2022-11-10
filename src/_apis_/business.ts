import {
  HttpSuccessResponse,
  BusinessMetrics,
  Business,
  UpdateBusiness,
} from '../_types';
import httpService from './httpService';

export const getBusinessMetricsApi = async (
  businessId: Business['id']
): Promise<HttpSuccessResponse<BusinessMetrics>> => {
  return httpService.get(`metrics/${businessId}`);
};

export const getBusinessApi = async (): Promise<
  HttpSuccessResponse<Business>
> => {
  return httpService.get(`business`);
};

export const updateBusinessApi = async (
  payload: UpdateBusiness
): Promise<HttpSuccessResponse<Business>> => {
  return httpService.patch('business', payload);
};
