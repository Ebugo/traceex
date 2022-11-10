import jwtDecode from 'jwt-decode';
import { refreshTokenApi } from '../../_apis_/authentication';
import httpService from '../../_apis_/httpService';

let refreshTokenTimout: ReturnType<typeof setTimeout> | null = null;

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;

  const isStillValid = decoded.exp > currentTime;

  return isStillValid;
};

const setSession = (accessToken: string | null) => {
  if (!accessToken) {
    localStorage.removeItem('accessToken');
    delete httpService.defaults.headers.common.Authorization;
    return;
  }

  localStorage.setItem('accessToken', accessToken);
  httpService.defaults.headers.common['x-access-token'] = accessToken;
};

const setRefreshTimeout = (interval = 60 * 60 * 1000) => {
  // interval is in milliseconds
  // currently set to 1 hour

  const tokenExpiresAt = interval + new Date().getTime();
  localStorage.setItem('tokenExpiresAt', tokenExpiresAt.toString());
  interval = interval - 120 * 1000; // 120 seconds before timeout

  refreshTokenTimout = setTimeout(() => {
    refreshToken();
  }, interval);
};

const setRefreshToken = (refreshToken: string | null) => {
  if (!refreshToken) {
    localStorage.removeItem('refreshToken');
    return;
  }

  localStorage.setItem('refreshToken', refreshToken);
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken') as string;
  const authId = localStorage.getItem('authId') as string;
  const response = await refreshTokenApi(refreshToken, authId, 'USER');

  const { access_token, refresh_token } = response.data;

  setSession(access_token);
  setRefreshToken(refresh_token);
  setRefreshTimeout();
};

const clearAuthDataLocalStorage = () => {
  localStorage.removeItem('tokenExpiresAt');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('authId');
  localStorage.removeItem('tokenExpiresAt');

  refreshTokenTimout && clearTimeout(refreshTokenTimout);
};

export {
  isValidToken,
  setSession,
  setRefreshTimeout,
  setRefreshToken,
  refreshToken,
  refreshTokenTimout,
  clearAuthDataLocalStorage,
};
