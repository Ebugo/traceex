import { RolesEnum } from '../common/enums/roles.enum';
export interface AuthSuccess {
  auth: Auth;
  business: Business;
  profile: Profile;
  access_token: string;
  refresh_token: string;
}

export interface Auth {
  id: string;
  created_at: string;
  updated_at: string;
  role: RolesEnum;
  password: string;
  email_confirmed_at: string;
  last_sign_in_at: string;
  is_super_admin: boolean;
  phone: string | null;
  is_email_confirmed: boolean;
  email: string;
  email_confirm_token: string;
  is_delete: boolean;
  username: string;
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
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  is_delete: boolean;
  business: string;
}

export type CreateProfile = Pick<
  Profile,
  'first_name' | 'last_name' | 'email'
> & {
  password: string;
  role?: Auth['role'];
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
