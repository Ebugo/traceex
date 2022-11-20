import { NextPage } from 'next';
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';
import { CreateProfile, HttpSuccessResponse } from '../../_types';
import {
  forgotPasswordApi,
  getProfileApi,
  signInApi,
  signUpApi,
} from '../../_apis_/authentication';
import {
  AuthSuccess,
  Auth,
  Business,
  Profile,
} from '../../_types/Authentication';

import {
  isValidToken,
  refreshToken,
  refreshTokenTimout,
  setRefreshTimeout,
  setRefreshToken,
  setSession,
} from '../utils/jwt';

export type AuthContextState = {
  isLoggedIn: boolean;
  auth: Auth | null
  login: (
    email: string,
    password: string,
    successCallback: (authResponse: HttpSuccessResponse<AuthSuccess>) => void
  ) => void;
  logout: () => void;
  forgotPassword: (
    email: string,
    successCallback: (authResponse: HttpSuccessResponse<string>) => void
  ) => void;
  signup: (payload: CreateProfile) => void;
  business?: any;
  profile?: any;
};

const AuthContext = React.createContext<AuthContextState>({
  isLoggedIn: false,
  auth: null,
  login: () => undefined,
  logout: () => undefined,
  signup: () => undefined,
  forgotPassword: () => undefined,
  business: {},
  profile: {},
});

export const AuthContextProvider: NextPage<{ children: ReactNode }> = ({
  children,
}) => {
  const [authDetails, setAuthDetails] = useState<AuthSuccess['auth'] | null>(null);

  const isLoggedIn = !!authDetails;

  const router = useRouter();

  const loginHandler = async (
    email: string,
    password: string,
    successCallBack: (authSuccess: HttpSuccessResponse<AuthSuccess>) => void
  ) => {
    const response = await signInApi(email, password);

    const { token } = response.data;

    setSession(token);
    // setRefreshToken(refresh_token);
    // localStorage.setItem('authId', profile.auth_id);

    // setRefreshTimeout();
    setAuthDetails(response.data);

    successCallBack && successCallBack(response);
  };

  const signupHandler = async (signupPayload: CreateProfile) => {
    await signUpApi(signupPayload);
  };

  const forgotPasswordHandler = async (
    email: string,
    successCallBack: (authSuccess: HttpSuccessResponse<string>) => void
  ) => {
    const response = await forgotPasswordApi(email);

    successCallBack && successCallBack(response);
  };

  const doLogoutActions = useCallback(() => {
    setSession(null);
    // setRefreshToken(null);

    // refreshTokenTimout && clearTimeout(refreshTokenTimout);

    setAuthDetails(null);

    localStorage.removeItem('tokenExpiresAt');

    // don't uncomment so router as the dependency is not called everytime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoutHandler = async () => {
    doLogoutActions();

    router.replace('/auth/login');
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          throw new Error();
        }

        const isTokenValid = isValidToken(accessToken);
// console.log({isTokenValid})
        if (!isTokenValid) {
          throw new Error();
        }

        setSession(accessToken);

        const { data } = await getProfileApi();
// console.log({data})
        // const { auth } = data;

        setAuthDetails(data);

        // await refreshToken();
      } catch (err) {
        doLogoutActions();
      }
    };

    const timeout = setTimeout(() => {
      initialize();
    }, 10);

    return () => timeout && clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = {
    isLoggedIn,
    auth: authDetails || null,
    login: loginHandler,
    logout: logoutHandler,
    signup: signupHandler,
    forgotPassword: forgotPasswordHandler,
    business: {}
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
