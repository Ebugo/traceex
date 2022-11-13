import { Stack, Box } from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode, FC, useEffect, useState } from 'react';
import withAuth from '../../HOC/withAuth';
import SideDrawer from './SideDrawer';
import TopBar from '../../UI/TopBar';
import { useRouter } from 'next/router';
import PageLoading from '../../UI/PageLoading';

const DashboardLayout: FC<{
  children: ReactNode;
  lightBackground?: boolean;
}> = ({ children, lightBackground = false }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      const handleStart = () => setLoading(true);
      const handleComplete = () => setLoading(false);

      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleComplete);
      router.events.on('routeChangeError', handleComplete);

      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    }, 500);

    return () => timeOut && clearTimeout(timeOut);
  });

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: (theme) => theme.palette.background.paper,
        overflowX: 'auto',
      }}
    >
      <CssBaseline />

      <SideDrawer />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Stack
            sx={{
              minWidth: '100%',
              minHeight: '100vh',
              backgroundColor: (theme) =>
                lightBackground
                  ? theme.palette.background.paper
                  : theme.palette.primary.light,
            }}
          >
            <TopBar />

            {/* {loading && <PageLoading />} */}

            <Box
            sx={{
              flexGrow: 1,
            //   display: loading ? 'none' : 'block',
            }}
            >
              {children}
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default withAuth(DashboardLayout);
