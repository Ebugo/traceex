import type { NextPage } from 'next';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import PageLoading from '../common/components/UI/PageLoading';

const HomePage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('dashboard');
  }, [router]);

  return <PageLoading />;
};

export default HomePage;
