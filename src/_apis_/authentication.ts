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
  return httpService.post('user/signup', payload);
};

export const signInApi = async (
  email: Auth['email'],
  password: string
): Promise<HttpSuccessResponse<AuthSuccess>> => {
  return httpService.post('user/signin', { email, password });
};

export const refreshTokenApi = async (
  refresh_token: string,
  auth_id: string,
  type: string
): Promise<HttpSuccessResponse<RefreshTokenPayload>> => {
  return httpService.post('access-token', { refresh_token, auth_id, type });
};

export const getProfileApi = async (): Promise<
  HttpSuccessResponse<Pick<AuthSuccess, 'auth' | 'business' | 'profile'>>
> => {
  return httpService.get('user/me');
};

export const forgotPasswordApi = async (
  email: Auth['email']
): Promise<HttpSuccessResponse<string>> => {
  return httpService.post('user/forgot-password', { email });
};

export const updatePasswordApi = async (
  payload: Omit<UpdatePassword, 'confirmNewPassword'>
): Promise<HttpSuccessResponse<Auth>> => {
  return httpService.patch('user/change-password', payload);
};
