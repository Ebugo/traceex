import axios from 'axios';

export const baseApiUrl = process.env.NEXT_PUBLIC_DEV_URL;

const httpService = axios.create({ baseURL: baseApiUrl });

httpService.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    if (error?.response?.status === 401) {
      //TODO: redirect on logout
    }

    throw error?.response?.data;
  }
);

export default httpService;
