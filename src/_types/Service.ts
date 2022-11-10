import { Business } from './Authentication';
export interface Service {
  id: string;
  name: string;
  description: string;
  business: Business['id'];
  image: null;
  is_delete: boolean;
  created_at: string;
  updated_at: string;
}

export type CreateService = Pick<Service, 'name' | 'description' | 'business'>;

export type UpdateService = CreateService & { id: Service['id'] };
