import {
  HttpSuccessResponse,
  Product,
  CreateProduct,
  UpdateProduct,
  Business,
} from '../_types';
import httpService from './httpService';

export const getProductsApi = async (
  business_id: Business['id']
): Promise<HttpSuccessResponse<Product[]>> => {
  return httpService.get('products', {
    params: {
      business_id,
      type: 'mobile',
    },
  });
};

export const createProductApi = async (
  payload: CreateProduct
): Promise<HttpSuccessResponse<Omit<Product, 'product_price'>>> => {
  return httpService.post('products', payload);
};

export const updateProductApi = async (
  payload: UpdateProduct
): Promise<HttpSuccessResponse<Product>> => {
  return httpService.patch('products/update', payload);
};

export const deleteProductApi = async (
  id: Product['id']
): Promise<HttpSuccessResponse<undefined>> => {
  return httpService.patch('products/delete', { id });
};
