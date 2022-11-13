import axios from 'axios';

export const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

const httpService = axios.create({
  baseURL: baseApiUrl,
  headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY || "" }
});

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
