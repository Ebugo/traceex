import { HttpSuccessResponse, Currencies } from '../_types';
import httpService from './httpService';

export const getCurrenciesApi = async (): Promise<
  HttpSuccessResponse<Currencies[]>
> => {
  return httpService.get(`currency`);
};
