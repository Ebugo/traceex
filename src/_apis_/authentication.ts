import { getExchangeApi } from '.';
import {
  Auth,
  AuthSuccess,
  CreateProfile,
  HttpSuccessResponse,
  RefreshTokenPayload,
  UpdatePassword,
} from '../_types';

import httpService from './httpService';

export const signUpApi = async (
  payload: CreateProfile
): Promise<HttpSuccessResponse<AuthSuccess>> => {
  return httpService.post(getExchangeApi() + 'auth/sign-up', payload);
};

export const signInApi = async (
  user: Auth['email'],
  password: string
): Promise<HttpSuccessResponse<Pick<AuthSuccess, 'token'> & AuthSuccess['auth']>> => {
  return httpService.post(getExchangeApi() + 'auth/sign-in', { user, password });
};

export const refreshTokenApi = async (
  refresh_token: string,
  auth_id: string,
  type: string
): Promise<HttpSuccessResponse<RefreshTokenPayload>> => {
  return httpService.post('access-token', { refresh_token, auth_id, type });
};

export const getProfileApi = async (): Promise<
  HttpSuccessResponse<AuthSuccess['auth']>
> => {
  return httpService.get(getExchangeApi()+'user');
};

export const forgotPasswordApi = async (
  email: Auth['email']
): Promise<HttpSuccessResponse<string>> => {
  return httpService.post('auth/reset-password', { email });
};

export const updatePasswordApi = async (
  payload: Omit<UpdatePassword, 'confirmNewPassword'>
): Promise<HttpSuccessResponse<Auth>> => {
  return httpService.patch('user/change-password', payload);
};
