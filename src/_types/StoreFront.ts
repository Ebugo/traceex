import { Business } from './Authentication';

export interface StoreFront {
  id: string;
  domain: string;
  tagline?: string | null;
  color: string;
  logo?: File | null | string | Blob;
  instagram_url?: string | null;
  facebook_url?: string | null;
  twitter_url?: string | null;
  business: Business;
  created_at: string;
  updated_at: string;
}

export type CreateStoreFront = Pick<
  StoreFront,
  'domain' | 'color' | 'instagram_url' | 'facebook_url' | 'twitter_url' | 'logo'
>;

export type UpdateStoreFront = CreateStoreFront & { id: StoreFront['id'] };
