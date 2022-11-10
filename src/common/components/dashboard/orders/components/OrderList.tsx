import { Grid, Skeleton } from '@mui/material';
import { FC } from 'react';
import { Order } from '../../../../../_types';
import OrderItem from './OrderItem';

interface OrderListProps {
  orders: Array<Order>;
  showConfirmPickupModalHandler?: (orderId: string) => void;
  showDeclinePickupModalHandler?: (orderId: string) => void;
  viewOrderHandler?: (orderId: string) => void;
  loadingOrders: boolean;
}

const OrderList: FC<OrderListProps> = ({
  orders = [],
  showConfirmPickupModalHandler,
  showDeclinePickupModalHandler,
  viewOrderHandler,
  loadingOrders,
}) => {
  if (loadingOrders) {
    return (
      <Grid container>
        {[...Array(5)].map((e, index) => (
          <Grid item xs={12} key={index}>
            <Skeleton sx={{ width: '100%', height: '150px' }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container>
      {orders.map((order) => (
        <OrderItem
          order={order}
          key={order.id}
          showConfirmPickupModalHandler={showConfirmPickupModalHandler}
          showDeclinePickupModalHandler={showDeclinePickupModalHandler}
          viewOrderHandler={viewOrderHandler}
        />
      ))}
    </Grid>
  );
};

export default OrderList;
