import { useRouter } from 'next/router';
import { useState, useEffect, ComponentType } from 'react';
import { clearAuthDataLocalStorage } from '../../utils/jwt';
import PageLoading from '../UI/PageLoading';

const withAuth = <T,>(Component: ComponentType<T>) => {
  const AuthenticatedComponent = (props: T) => {
    const router = useRouter();
    const pathname = router.pathname;

    const [checking, setChecking] = useState(true);

    useEffect(() => {
      const runGuard = async () => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          clearAuthDataLocalStorage();

          await router.replace('/auth/login');

          setChecking(true);
          return;
        }

        setChecking(false);
      };

      runGuard();
    }, [router, pathname]);

    return checking ? <PageLoading /> : <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
