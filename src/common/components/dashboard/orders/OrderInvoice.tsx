import { Grid, Stack } from '@mui/material';

import SelectProductDialog from './components/SelectProductDialog';

import useOrderForm from '../../../hooks/useOrderForm';
import DeliveryDialog from './components/DeliveryDialog';
import useInvoiceForm from '../../../hooks/useInvoiceForm';
import CreateInvoice from '../invoices/components/CreateInvoice';
import InvoiceSummary from './components/InvoiceSummary';
import useViewOrder from '../../../hooks/useViewOrder';
import { LoadingButton } from '@mui/lab';
import { useEffect } from 'react';

const OrderInvoice = () => {
  const { loadingOrder, order } = useViewOrder();

  const {
    products,
    setProducts,
    showSelectProductModal,
    showSelectProductDialogHandler,
    closeSelectProductDialogHandler,
    decrementProduct,
    incrementProduct,
    deleteProduct,
    orderFormik,
    showDeliveryDialogHandler,
    showDeliveryModal,
    closeDeliveryDialogHandler,
    totalAmount,
  } = useOrderForm({
    fromInvoice: true,
    orderIdFromInvoice: order?.id as string,
  });

  const { isSubmitting, isValid, handleSubmit, setFieldValue } = orderFormik;

  const { currentStep, setCurrentStep } = useInvoiceForm();

  useEffect(() => {
    if (!order?.customer) {
      return;
    }

    setFieldValue('customer', order?.customer ?? '');
  }, [order?.customer, setFieldValue]);

  const createInvoiceHandler = async () => {
    if (!isValid) {
      return;
    }

    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    handleSubmit();
  };

  return (
    <>
      {showSelectProductModal && (
        <SelectProductDialog
          showDialog={showSelectProductModal}
          onCloseDialog={closeSelectProductDialogHandler}
          products={products}
          setProducts={setProducts}
          subtitle={`Add products to customer’s invoice.`}
        />
      )}

      {showDeliveryModal && (
        <DeliveryDialog
          showDialog={showDeliveryModal}
          onCloseDialog={closeDeliveryDialogHandler}
          orderFormik={orderFormik}
        />
      )}

      <Stack alignItems="center" mt={4}>
        {currentStep === 1 && (
          <CreateInvoice
            products={products}
            decrementProduct={decrementProduct}
            incrementProduct={incrementProduct}
            deleteProduct={deleteProduct}
            showSelectProductDialogHandler={showSelectProductDialogHandler}
            orderFormik={orderFormik}
            showDeliveryDialogHandler={showDeliveryDialogHandler}
            totalAmount={totalAmount}
          />
        )}

        {currentStep === 2 && (
          <InvoiceSummary
            products={products}
            deliveryType={orderFormik.values.delivery_type}
            deliveryFee={orderFormik.values.delivery_fee}
            totalAmount={totalAmount}
          />
        )}

        <Grid container justifyContent="center" mt={8}>
          <LoadingButton
            variant="contained"
            disableElevation
            disableFocusRipple
            disabled={!isValid}
            loading={isSubmitting || loadingOrder}
            sx={{ minWidth: '270px' }}
            onClick={createInvoiceHandler}
          >
            {currentStep === 1 ? 'Next' : 'Create Invoice'}
          </LoadingButton>
        </Grid>
      </Stack>
    </>
  );
};

export default OrderInvoice;
