import {
  Grid,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { OrderForm } from '../../../../../_types';
import DeliveryFeeGrid from './DeliveryFeeGrid';

interface DeliveryGridProps {
  orderFormik: FormikProps<OrderForm>;
  showDeliveryDialogHandler: () => void;
  fromInvoice?: boolean;
}

const DeliveryGrid: FC<DeliveryGridProps> = ({
  orderFormik,
  showDeliveryDialogHandler,
  fromInvoice = false,
}) => {
  const { values, getFieldProps } = orderFormik;

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <FormControlLabel
          sx={{ marginBlock: 'none' }}
          control={
            <Checkbox
              {...getFieldProps('is_delivery')}
              checked={values.is_delivery}
              sx={{
                '& .MuiSvgIcon-root': { fontSize: 30 },
                paddingBlock: 'unset',
              }}
            />
          }
          label={
            <Typography variant="details">
              Does this order require delivery?
            </Typography>
          }
        />
      </FormControl>

      {values.is_delivery && (
        <DeliveryFeeGrid
          orderFormik={orderFormik}
          showDeliveryDialogHandler={showDeliveryDialogHandler}
          fromInvoice={fromInvoice}
        />
      )}
    </Grid>
  );
};

export default DeliveryGrid;
