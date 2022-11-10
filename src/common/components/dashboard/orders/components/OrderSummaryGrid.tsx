import { LoadingButton } from '@mui/lab';
import { Grid, Typography, Chip } from '@mui/material';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { OrderForm, Product } from '../../../../../_types';
import { formatAsMoney } from '../../../../utils';
import ProductItem from './ProductItem';

interface OrderSummaryGridProps {
  products: Array<Product & { quantity: number }>;
  decrementProduct: (productId: Product['id']) => void;
  incrementProduct: (productId: Product['id']) => void;
  orderFormik: FormikProps<OrderForm>;
  subTotal: number;
  totalAmount: number;
}

const OrderSummaryGrid: FC<OrderSummaryGridProps> = ({
  products,
  decrementProduct,
  incrementProduct,
  orderFormik,
  subTotal,
  totalAmount,
}) => {
  const { values, isSubmitting, isValid } = orderFormik;

  return (
    <Grid
      item
      container
      p={2}
      sx={{
        maxWidth: '400px',
        borderLeft: '1px solid #EAECF0',
        boxShadow:
          '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
        border: '2px solid ggeen',
      }}
      mr={4}
    >
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{
          borderBottom: '1px solid #EAECF0',
          pb: 2,
          pt: 1,
          mb: 2,
        }}
      >
        <Typography variant="body2" fontWeight={500} component="div">
          Order summary
        </Typography>

        <Chip
          label={
            !products.length
              ? 'No items selected'
              : `${products.length} ${products.length === 1 ? 'item' : 'items'}`
          }
          sx={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: (theme) => theme.palette.primary.main,
            backgroundColor: (theme) => theme.palette.primary.light,
          }}
        />
      </Grid>

      {products.map((product, index) => (
        <ProductItem
          key={index}
          product={product}
          decrementProduct={decrementProduct}
          incrementProduct={incrementProduct}
          lastProduct={index === products.length - 1}
        />
      ))}

      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="flex-start"
        mb={1}
      >
        <Typography variant="details" component="div">
          Subtotal
        </Typography>

        <Typography variant="details" component="div">
          {formatAsMoney(subTotal, true)}
        </Typography>
      </Grid>

      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{
          borderBottom: '1px solid #EAECF0',
          pb: 1,
          mb: 1,
        }}
      >
        <Typography variant="details" component="div">
          Delivery fee
        </Typography>

        <Typography variant="details" component="div">
          {formatAsMoney(values?.delivery_fee ? +values.delivery_fee : 0, true)}
        </Typography>
      </Grid>

      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{
          borderBottom: '1px solid #EAECF0',
          pb: 2,
          mb: 4,
        }}
      >
        <Typography variant="body2" component="div" fontWeight={500}>
          Total amount
        </Typography>

        <Typography variant="body2" component="div" fontWeight={500}>
          {formatAsMoney(totalAmount)}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <LoadingButton
          fullWidth
          disableElevation
          disabled={!isValid}
          loading={isSubmitting}
          variant="contained"
          type="submit"
          sx={{ minWidth: '252px' }}
        >
          Create Order
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default OrderSummaryGrid;
