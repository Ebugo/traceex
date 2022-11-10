import { Button, Grid, IconButton, Typography } from '@mui/material';
import { format } from 'date-fns';
import { FC } from 'react';
import { Order } from '../../../../../_types';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { sentenceCase } from '../../../../utils';

interface OrderItemProps {
  order: Order;
  showConfirmPickupModalHandler?: (orderId: string) => void;
  showDeclinePickupModalHandler?: (orderId: string) => void;
  viewOrderHandler?: (orderId: string) => void;
}

const OrderItem: FC<OrderItemProps> = ({
  order,
  showConfirmPickupModalHandler,
  showDeclinePickupModalHandler,
  viewOrderHandler,
}) => {
  return (
    <>
      <Grid
        key={order.id}
        item
        xs={12}
        container
        sx={{
          backgroundColor: (theme) => theme.palette.common.white,
          borderRadius: '10px',
        }}
        px={3}
        py={2}
        mb={2}
      >
        <Grid item xs={6}>
          <Typography
            variant="details"
            component="div"
            fontWeight={500}
            sx={{ color: (theme) => theme.palette.text.primary }}
          >
            Order #{order.id.slice(0, 6)}
          </Typography>

          {order.is_accepted && order.status === 'SCHEDULED' && (
            <Typography variant="details" component="div" fontSize={'0.75rem'}>
              Status:{' '}
              <Typography
                fontSize={'0.75rem'}
                sx={{ color: (theme) => theme.palette.success.main }}
                component="span"
              >
                {sentenceCase(order?.status) ?? ''}
              </Typography>
            </Typography>
          )}

          <Typography variant="details" component="div" fontSize={'0.75rem'}>
            Customer:{' '}
            <Typography
              fontSize={'0.75rem'}
              sx={{ color: (theme) => theme.palette.text.primary }}
              component="span"
            >
              {order?.customer_name ?? ''}
            </Typography>
          </Typography>

          <Typography variant="details" component="div" fontSize={'0.75rem'}>
            Pick up at:{' '}
            <Typography
              fontSize={'0.75rem'}
              sx={{ color: (theme) => theme.palette.text.primary }}
              component="span"
            >
              {format(
                new Date((order?.pickup_date as string) || ''),
                'EEE, MMM d y'
              ) +
                ' | ' +
                order?.pickup_time}
            </Typography>
          </Typography>
        </Grid>

        <Grid
          item
          xs={6}
          container
          justifyContent="flex-end"
          alignItems="center"
        >
          {!order.is_accepted && (
            <>
              <Button
                disableElevation
                disableRipple
                color="secondary"
                sx={{ backgroundColor: '#F7F7F7', mr: 1, minWidth: '161px' }}
                onClick={showDeclinePickupModalHandler?.bind(null, order.id)}
              >
                Decline
              </Button>

              <Button
                disableElevation
                disableRipple
                variant="contained"
                sx={{ minWidth: '161px' }}
                onClick={showConfirmPickupModalHandler?.bind(null, order.id)}
              >
                Accept
              </Button>
            </>
          )}

          {order.is_accepted && (
            <IconButton onClick={viewOrderHandler?.bind(null, order.id)}>
              <ChevronRightOutlinedIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default OrderItem;
