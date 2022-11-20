import {
  Grid,
  Typography,
  IconButton,
  Stack,
  Box,
  Skeleton,
} from '@mui/material';
import DynamicHeroIcon from '../../../../elements/icons/DynamicHeroIcon';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useSelector, RootState } from '../../../../redux/store';
import { useAuth } from '../../../../contexts/auth-context';

interface GettingStartedCardProps {
  showActionButton?: boolean;
  fetchingBusinessMetrics?: boolean;
}

const GettingStartedCard: FC<GettingStartedCardProps> = ({
  showActionButton = false,
  fetchingBusinessMetrics = false,
}) => {
  const router = useRouter();

  const { onboardingPercentage } = useSelector(
    (state: RootState) => state.businessSlice
  );

  const { business } = useAuth();
  // console.log({ business })

  return (
    <Grid
      container
      sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
      justifyContent="space-between"
      alignItems="center"
      p={3}
    >
      <Grid item xs={12}>
        <Stack display="flex" direction="row" alignItems="center">
          <Box mr={showActionButton ? 8 : 0}>
            <Typography
              variant="body2"
              fontWeight={500}
              component="div"
              gutterBottom
            >
              Setup Guide
            </Typography>

            <Typography
              variant="caption"
              fontSize="0.875rem"
              lineHeight="24px"
              component="div"
              gutterBottom
            >
              Get {business?.business_name ? business.business_name : "your business"} up and running on Ricive in a few steps.
            </Typography>

            {fetchingBusinessMetrics ? (
              <Skeleton sx={{ width: '10ch' }}></Skeleton>
            ) : (
              <Typography
                variant="caption"
                fontSize="0.75rem"
                lineHeight="24px"
                component="div"
                gutterBottom
                sx={{ color: (theme) => theme.palette.success.main }}
              >
                {onboardingPercentage}% complete
              </Typography>
            )}
          </Box>

          {showActionButton && (
            <Box>
              <IconButton
                onClick={() => router.push('/dashboard/getting-started')}
              >
                <DynamicHeroIcon icon="ArrowRightIcon" />
              </IconButton>
            </Box>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default GettingStartedCard;
