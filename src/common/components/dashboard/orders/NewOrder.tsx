import ActionBar from '../../UI/ActionBar';
import { Grid } from '@mui/material';
import useOrderForm from '../../../hooks/useOrderForm';
import { Form, FormikProvider } from 'formik';
import SelectCustomerDialog from './components/SelectCustomerDialog';
import NewCustomerDialog from './components/NewCustomerDialog';
import SelectProductDialog from './components/SelectProductDialog';
import NewProductDialog from './components/NewProductDialog';
import CustomerGrid from './components/CustomerGrid';
import ProductsGrid from './components/ProductsGrid';
import PickupGrid from './components/PickupGrid';
import DeliveryGrid from './components/DeliveryGrid';
import DeliveryDialog from './components/DeliveryDialog';
import OrderSummaryGrid from './components/OrderSummaryGrid';
import SendInvoiceSmsGrid from './components/SendInvoiceSmsGrid';
import PaymentCollectedGrid from './components/PaymentCollectedGrid';

const NewOrder = () => {
  const {
    orderFormik,
    showSelectCustomerDialogHandler,
    showSelectCustomerModal,
    closeSelectCustomerDialogHandler,
    selectedCustomer,
    setSelectedCustomer,
    showNewCustomerModal,
    closeNewCustomerDialogHandler,
    showNewCustomerDialog,
    showSelectProductDialogHandler,
    showSelectProductModal,
    products,
    setProducts,
    closeSelectProductDialogHandler,
    showNewProductDialogHandler,
    showNewProductModal,
    closeNewProductDialogHandler,
    decrementProduct,
    incrementProduct,
    showDeliveryDialogHandler,
    showDeliveryModal,
    closeDeliveryDialogHandler,
    subTotal,
    totalAmount,
  } = useOrderForm({});

  const { values, handleSubmit, setFieldValue } = orderFormik;

  return (
    <>
      {showSelectCustomerModal && (
        <SelectCustomerDialog
          showDialog={showSelectCustomerModal}
          onCloseDialog={closeSelectCustomerDialogHandler}
          setSelectedCustomer={setSelectedCustomer}
          showNewCustomerDialog={showNewCustomerDialog}
          setFieldValue={setFieldValue}
          values={values}
        />
      )}

      {showNewCustomerModal && (
        <NewCustomerDialog
          showDialog={showNewCustomerModal}
          onCloseDialog={closeNewCustomerDialogHandler}
          setSelectedCustomer={setSelectedCustomer}
          showSelectCustomerDialogHandler={showSelectCustomerDialogHandler}
          setFieldValue={setFieldValue}
          values={values}
        />
      )}

      {showSelectProductModal && (
        <SelectProductDialog
          showDialog={showSelectProductModal}
          onCloseDialog={closeSelectProductDialogHandler}
          products={products}
          setProducts={setProducts}
        />
      )}

      {showNewProductModal && (
        <NewProductDialog
          showDialog={showNewProductModal}
          onCloseDialog={closeNewProductDialogHandler}
          setProducts={setProducts}
        />
      )}

      {showDeliveryModal && (
        <DeliveryDialog
          showDialog={showDeliveryModal}
          onCloseDialog={closeDeliveryDialogHandler}
          orderFormik={orderFormik}
        />
      )}

      <ActionBar title="Create Order" hideButton hideSearch />

      <FormikProvider value={orderFormik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="flex-start"
            mt={4}
          >
            <Grid item lg={7} md={6} sm={12} rowSpacing={2} container ml={4}>
              <CustomerGrid
                orderFormik={orderFormik}
                showSelectCustomerDialogHandler={
                  showSelectCustomerDialogHandler
                }
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
              />

              <ProductsGrid
                showNewProductDialogHandler={showNewProductDialogHandler}
                showSelectProductDialogHandler={showSelectProductDialogHandler}
              />

              <PickupGrid orderFormik={orderFormik} />

              <DeliveryGrid
                orderFormik={orderFormik}
                showDeliveryDialogHandler={showDeliveryDialogHandler}
              />

              <SendInvoiceSmsGrid orderFormik={orderFormik} />

              <PaymentCollectedGrid orderFormik={orderFormik} />
            </Grid>

            <OrderSummaryGrid
              products={products}
              decrementProduct={decrementProduct}
              incrementProduct={incrementProduct}
              orderFormik={orderFormik}
              subTotal={subTotal}
              totalAmount={totalAmount}
            />
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
};

export default NewOrder;
