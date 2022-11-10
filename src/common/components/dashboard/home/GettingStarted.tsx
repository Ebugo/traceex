import { Stack, Box } from '@mui/material';
import useOnboarding from '../../../hooks/useOnboarding';
import GettingStartedCard from './components/GettingStartedCard';
import OnboardingSteps from './components/OnboardingSteps';

const GettingStarted = () => {
  const { fetchingBusinessMetrics } = useOnboarding();

  return (
    <Stack alignItems="center">
      <Box pt={4} px={3} sx={{ width: '100%', maxWidth: '758px' }}>
        <GettingStartedCard fetchingBusinessMetrics={fetchingBusinessMetrics} />

        <OnboardingSteps fetchingBusinessMetrics={fetchingBusinessMetrics} />
      </Box>
    </Stack>
  );
};

export default GettingStarted;
