import { HttpSuccessResponse } from '../_types';
import httpService from './httpService';

export const uploadFile = async (
  payload: Blob
): Promise<HttpSuccessResponse<{ url: string }>> => {
  const formData = new FormData();
  formData.append('file', payload);

  return httpService.post('/upload', formData);
};
