import { Dispatch, SetStateAction } from 'react';
import { Business } from './Authentication';

export interface Product {
  id: string;
  name: string;
  price: string;
  business: Business['id'];
  image?: string | null;
  is_published: boolean;
  description?: string | null;
  created_at: string;
  updated_at: string;
}

export type CreateProduct = Pick<
  Product,
  'name' | 'price' | 'business' | 'is_published'
>;

export type UpdateProduct = CreateProduct & { id: Product['id'] };

export type ProductFormik = Pick<Product, 'name' | 'image' | 'is_published'> & {
  price: number;
};

export type DispatchSetProducts = Dispatch<
  SetStateAction<Array<Product & { quantity: number }>>
>;
