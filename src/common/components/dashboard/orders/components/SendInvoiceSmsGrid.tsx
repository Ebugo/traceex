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

interface SendInvoiceSmsGridProps {
  orderFormik: FormikProps<OrderForm>;
}

const SendInvoiceSmsGrid: FC<SendInvoiceSmsGridProps> = ({ orderFormik }) => {
  const { values, getFieldProps } = orderFormik;
  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <FormControlLabel
          sx={{ marginBlock: 'none' }}
          control={
            <Checkbox
              {...getFieldProps('sendSMS')}
              checked={values.sendSMS}
              sx={{
                '& .MuiSvgIcon-root': { fontSize: 30 },
                paddingBlock: 'unset',
              }}
            />
          }
          label={
            <Typography variant="details">
              Send invoice via SMS to customer?
            </Typography>
          }
        />
      </FormControl>
    </Grid>
  );
};

export default SendInvoiceSmsGrid;
