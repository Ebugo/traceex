import { Box, Grid, Stack } from '@mui/material';
import React from 'react';

import BusinessOverview from './components/BusinessOverview';
import GettingStartedCard from './components/GettingStartedCard';
import QuickTasks from './components/QuickTasks';
import useOnboarding from '../../../hooks/useOnboarding';
import GettingStarted from './GettingStarted';
import Wallet from '../wallet/Wallet';

const Home = () => {
  const { fetchingBusinessMetrics } = useOnboarding();

  return (
    <Grid container spacing={2} sx={{ height: "100%", backgroundColor: (theme) => theme.palette.background.paper }}>
      <Grid item md={8} sx={{ height: "100%", backgroundColor: (theme) => theme.palette.background.default }}>
        <Stack>
          {/* <BusinessOverview fetchingBusinessMetrics={fetchingBusinessMetrics} /> */}
          <Wallet showHeader={false} showTransactions={false} />
        </Stack>
      </Grid>
      <Grid item md={4} sx={{ height: "100%", backgroundColor: (theme) => theme.palette.background.paper }}>
        <QuickTasks />
      </Grid>
    </Grid>
  );
};

export default Home;
