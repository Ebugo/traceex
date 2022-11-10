import { useRouter } from 'next/router';
import { useState, useEffect, ComponentType } from 'react';
import { clearAuthDataLocalStorage } from '../../utils/jwt';
import PageLoading from '../UI/PageLoading';

const withoutAuth = <T,>(Component: ComponentType<T>) => {
  const AuthenticatedComponent = (props: T) => {
    const router = useRouter();
    const pathname = router.pathname;
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      const runGuard = async () => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
          await router.push('/dashboard');

          setChecking(true);
          return;
        }

        clearAuthDataLocalStorage();

        setChecking(false);
      };

      runGuard();
    }, [router, pathname]);

    return checking ? <PageLoading /> : <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withoutAuth;
