import {
  HttpSuccessResponse,
  CreateService,
  Service,
  UpdateService,
  Business,
} from '../_types';
import httpService from './httpService';

export const createServiceApi = async (
  payload: CreateService
): Promise<HttpSuccessResponse<Service>> => {
  return httpService.post('service', payload);
};

export const getServicesApi = async (
  business_id: Business['id']
): Promise<HttpSuccessResponse<Service[]>> => {
  return httpService.get('service', {
    params: {
      business_id,
    },
  });
};

export const updateServiceApi = async (
  payload: UpdateService
): Promise<HttpSuccessResponse<Service>> => {
  return httpService.patch('service/update', payload);
};

export const deleteServiceApi = async (
  id: Service['id']
): Promise<HttpSuccessResponse<Service>> => {
  return httpService.patch('service/delete', { id });
};
