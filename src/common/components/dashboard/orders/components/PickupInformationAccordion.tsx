import { Typography, Skeleton } from '@mui/material';
import { format } from 'date-fns';
import React, { FC } from 'react';
import { Order } from '../../../../../_types';
import CustomAccordion from '../../../UI/CustomAccordion';

const PickupInformationAccordion: FC<{
  order: Order | null;
  loadingOrder: boolean;
}> = ({ order, loadingOrder }) => {
  const pickupDate = order?.pickup_date
    ? format(new Date(order?.pickup_date as string), 'EEE, d MMM')
    : '';

  return (
    <CustomAccordion
      isExpanded={false}
      title={
        <Typography variant="body2" fontWeight={500}>
          Pickup information
        </Typography>
      }
      noBorderRadius={true}
      noInlineBorder={true}
    >
      <Typography variant="details" mt={2} mb={1} component="div">
        Pick up scheduled at:
      </Typography>

      <Typography variant="body2" component="div" mb={3}>
        {loadingOrder ? (
          <Skeleton width="20ch" />
        ) : (
          `${pickupDate}  |  ${order?.pickup_time}`
        )}
      </Typography>

      <Typography variant="details" mb={1} component="div">
        Pickup address
      </Typography>

      <Typography variant="body2" component="div">
        {loadingOrder ? <Skeleton width="20ch" /> : order?.pickup_address ?? ''}
      </Typography>
    </CustomAccordion>
  );
};

export default PickupInformationAccordion;
