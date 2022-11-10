import { Grid, Typography, Skeleton } from '@mui/material';
import { sentenceCase, titleCase } from '../../../../utils';
import { FC } from 'react';
import { Order } from '../../../../../_types';

interface ViewOrderSummaryProps {
  order: Order | null;
  loadingOrder: boolean;
}

const ViewOrderSummary: FC<ViewOrderSummaryProps> = ({
  order,
  loadingOrder,
}) => {
  return (
    <Grid
      item
      xs={12}
      sx={{ backgroundColor: '#F7F7F7' }}
      py={2}
      p={3}
      container
      mb={4}
    >
      <Grid item xs={12} container justifyContent="space-between" mb={1}>
        <Typography variant="details">Order status</Typography>

        <Typography
          variant="details"
          sx={{ color: (theme) => theme.palette.success.main }}
        >
          {loadingOrder ? (
            <Skeleton width="10ch" />
          ) : (
            sentenceCase(order?.status as string) ?? ''
          )}
        </Typography>
      </Grid>

      <Grid item xs={12} container justifyContent="space-between" mb={1}>
        <Typography variant="details">Customer</Typography>

        <Typography variant="details">
          {loadingOrder ? (
            <Skeleton width="10ch" />
          ) : (
            titleCase(order?.customer_name as string) ?? ''
          )}
        </Typography>
      </Grid>

      <Grid item xs={12} container justifyContent="space-between">
        <Typography variant="details">Phone number</Typography>

        <Typography variant="details">
          {loadingOrder ? <Skeleton width="10ch" /> : order?.phone ?? ''}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ViewOrderSummary;
