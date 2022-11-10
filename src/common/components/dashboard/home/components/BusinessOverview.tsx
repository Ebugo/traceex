import { Grid, Typography, TextField, MenuItem, Divider } from '@mui/material';
import BusinessOverviewItem from './BusinessOverviewItem';
import useCustomMediaQuery from '../../../../hooks/useCustomMediaQuery';
import { FC, useMemo } from 'react';
import { useSelector, RootState } from '../../../../redux/store';

const overviewFrequencies = [
  {
    value: 'alltime',
    label: 'All Time',
  },
];

interface BusinessOverviewProps {
  fetchingBusinessMetrics?: boolean;
}

const BusinessOverview: FC<BusinessOverviewProps> = ({
  fetchingBusinessMetrics = false,
}) => {
  const { large } = useCustomMediaQuery();

  const { metrics } = useSelector((state: RootState) => state.businessSlice);

  const statisticDetails = useMemo(
    () => [
      {
        title: 'Total Deposits',
        quantity: metrics?.total_revenue ?? 0,
        percentage: 2,
        currency: 'NGN',
        description: "Total deposits made"
      },
      {
        title: 'Total Withdrawals',
        quantity: metrics?.total_revenue ?? 0,
        description: "Total withdrawals made"
      },
    ],
    [
      metrics?.total_revenue,
    ]
  );

  return (
    <Grid
      container
      p={3}
      pb={12}
    >
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5" component="div" gutterBottom>
            Wallet Overview
          </Typography>
        </Grid>

        <Grid item>
          <TextField
            select
            value="alltime"
            size="small"
            variant="filled"
            InputProps={{
              disableUnderline: true,
              hiddenLabel: true,
              style: {
                fontSize: '0.875rem',
                backgroundColor: '#F7F7F7',
                fontWeight: 500,
                color: '#777777',
                borderRadius: '8px',
              },
            }}
          >
            {overviewFrequencies.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ fontSize: '0.875rem' }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Grid item xs={12} mt={2} mb={4}>
        <Divider />
      </Grid>

      <Grid item mb={4}>
        <Typography variant="body2" component="div" gutterBottom>
          Estimated Balance
        </Typography>
        <Typography variant="details" component="div" gutterBottom>
        0.00561593 BTC ≈ ₦55,308.56
        </Typography>
      </Grid>

      <Grid item container gap={2.986}>
        {statisticDetails.map((item, index) => (
          <Grid
            key={index}
            item
            sx={{
              border: '1px solid #D9DBE1',
              backgroundColor: (theme) => theme.palette.background.paper,
              minWidth: "200px"
            }}
            p={2}
            justifyContent="center"
          >
            <BusinessOverviewItem
              {...item}
              fetchingBusinessMetrics={fetchingBusinessMetrics}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default BusinessOverview;
