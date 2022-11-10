import { Button, Grid, Skeleton, Typography } from '@mui/material';
import { OrderStatus } from '../../../../_types';

import useViewOrder from '../../../hooks/useViewOrder';
import InvoiceAccordion from './components/InvoiceAccordion';
import PickupInformationAccordion from './components/PickupInformationAccordion';
import SelectOrderStatusDialog from './components/SelectOrderStatusDialog';
import ViewOrderSummary from './components/ViewOrderSummary';

const ViewOrder = () => {
  const {
    order,
    loadingOrder,
    showOrderStatusModal,
    openOrderStatusModalHandler,
    closeOrderStatusModalHandler,
    currentOrderStatus,
    updateOrderStatusHandler,
    updatingOrderStatus,
    createInvoiceHandler,
  } = useViewOrder();

  return (
    <>
      {showOrderStatusModal && (
        <SelectOrderStatusDialog
          showDialog={showOrderStatusModal}
          onCloseDialog={closeOrderStatusModalHandler}
          currentStatus={currentOrderStatus}
          updateOrderStatusHandler={updateOrderStatusHandler}
          updatingOrderStatus={updatingOrderStatus}
        />
      )}

      <Grid container px={4} mt={1} sx={{ width: '100%', maxWidth: '750px' }}>
        <Grid item xs={12} mb={4}>
          <Typography variant="body1" fontWeight={500}>
            Order #
            {loadingOrder ? <Skeleton width="6ch" /> : order?.id.slice(0, 6)}
          </Typography>
        </Grid>

        <ViewOrderSummary order={order} loadingOrder={loadingOrder} />

        <PickupInformationAccordion order={order} loadingOrder={loadingOrder} />

        <Typography
          variant="body2"
          mb={1}
          mt={4}
          component="div"
          fontWeight={500}
          sx={{ px: 2 }}
        >
          Invoice
        </Typography>

        {order?.invoice.map((invoice) => (
          <InvoiceAccordion invoice={invoice} key={invoice.id} />
        ))}

        <Grid item xs={12} container justifyContent="center" mt={8}>
          <Button
            variant="outlined"
            disableElevation
            disableFocusRipple
            sx={{ mr: 2, minWidth: '270px' }}
            onClick={openOrderStatusModalHandler.bind(
              null,
              order?.status as OrderStatus
            )}
          >
            Update Order Status
          </Button>

          <Button
            variant="contained"
            disableElevation
            disableFocusRipple
            sx={{ minWidth: '270px' }}
            onClick={createInvoiceHandler}
          >
            Create invoice
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ViewOrder;
