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

interface PaymentCollectedGridProps {
  orderFormik: FormikProps<OrderForm>;
}

const PaymentCollectedGrid: FC<PaymentCollectedGridProps> = ({
  orderFormik,
}) => {
  const { values, getFieldProps } = orderFormik;
  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <FormControlLabel
          sx={{ marginBlock: 'none' }}
          control={
            <Checkbox
              {...getFieldProps('is_paid')}
              checked={values.is_paid}
              sx={{
                '& .MuiSvgIcon-root': { fontSize: 30 },
                paddingBlock: 'unset',
              }}
            />
          }
          label={
            <Typography variant="details">
              Has payment been collected?
            </Typography>
          }
        />
      </FormControl>
    </Grid>
  );
};

export default PaymentCollectedGrid;
