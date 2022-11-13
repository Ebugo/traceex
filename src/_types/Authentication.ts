import { RolesEnum } from '../common/enums/roles.enum';
export interface AuthSuccess {
  auth: Auth;
  // business: Business;
  // profile: Profile;
  token: string;
  refresh_token?: string;
}

export interface Auth {
  avatar: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  phone: string;
  token: string;
  updatedAt: string;
  verifiedEmail: boolean;
  verifiedPhone: boolean;
}

export interface Business {
  id: string;
  created_at: string;
  updated_at: string;
  business_name: string | null;
  currency: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  address: string | null;
  phone: string | null;
  type: string | null;
  is_delete: boolean;
}

export interface Profile {
  id: string;
  created_at: string;
  updated_at: string;
  role: string;
  auth_id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  is_delete: boolean;
  business: string;
}

export type CreateProfile = Pick<
  Profile,
  'firstName' | 'lastName' | 'email' | 'phone'
> & {
  password: string;
  // role?: Auth['role'];
};

export interface RefreshTokenPayload {
  access_token: string;
  refresh_token: string;
}

export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type UpdateProfile = Pick<
  CreateProfile,
  'first_name' | 'last_name' | 'email'
>;
