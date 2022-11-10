import {
  CreateStoreFront,
  HttpSuccessResponse,
  StoreFront,
  UpdateStoreFront,
} from '../_types';
import httpService from './httpService';
import { Business } from '../_types/Authentication';

export const getStoreFrontApi = async (
  business_id: Business['id']
): Promise<HttpSuccessResponse<StoreFront>> => {
  return httpService.get('storefront', {
    params: {
      business_id,
    },
  });
};

export const createStoreFront = async (
  payload: CreateStoreFront
): Promise<HttpSuccessResponse<StoreFront>> => {
  return httpService.post('storefront', payload);
};

export const updateStoreFront = async (
  payload: UpdateStoreFront
): Promise<HttpSuccessResponse<StoreFront>> => {
  return httpService.patch('storefront/update', payload);
};
