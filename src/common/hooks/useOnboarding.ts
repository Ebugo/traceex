import { useState, useEffect } from 'react';
import { dispatch } from '../redux/store';
import { useAuth } from '../contexts/auth-context';
import { getBusinessMetrics } from '../redux/actions/businessActions';
// import { useRouter } from 'next/router';

const useOnboarding = () => {
  const { business } = useAuth();
  const businessId = business?.id as string;
  const [fetchingBusinessMetrics, setFetchingBusinessMetrics] = useState(true);
  // const router = useRouter();
  // const { onboardingComplete } = useSelector(
  //   (state: RootState) => state.businessSlice
  // );

  useEffect(() => {
    if (!businessId) {
      return;
    }

    const fetchBusinessMetrics = async () => {
      setFetchingBusinessMetrics(true);
      await dispatch(getBusinessMetrics(businessId as string));
      setFetchingBusinessMetrics(false);
    };

    const timeOut = setTimeout(fetchBusinessMetrics, 200);

    return () => timeOut && clearTimeout(timeOut);
  }, [businessId]);

  // useEffect(() => {
  //   if (router.asPath.includes('getting-started') && onboardingComplete) {
  //     router.push('/dashboard');
  //   }
  // }, [onboardingComplete, router]);

  return { fetchingBusinessMetrics };
};

export default useOnboarding;
