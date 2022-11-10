import {
  Grid,
  FormLabel,
  Box,
  IconButton,
  Typography,
  FormHelperText,
} from '@mui/material';
import { FormikProps } from 'formik';
import { FC } from 'react';
import {
  Customer,
  DispatchSetCustomer,
  DispatchSetOrder,
  OrderForm,
} from '../../../../../_types';
import { joinStrings } from '../../../../utils';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ErrorHelperText from '../../../UI/ErrorHelperText';

interface CustomerGridProps {
  orderFormik: FormikProps<OrderForm>;
  showSelectCustomerDialogHandler: () => void;
  selectedCustomer: Customer | null;
  setSelectedCustomer: DispatchSetCustomer;
  setSelectedOrder?: DispatchSetOrder;
}

const CustomerGrid: FC<CustomerGridProps> = ({
  orderFormik,
  selectedCustomer,
  showSelectCustomerDialogHandler,
  setSelectedCustomer,
  setSelectedOrder,
}) => {
  const { touched, errors, setFieldValue } = orderFormik;

  return (
    <Grid item xs={12}>
      <FormLabel
        sx={{ color: (theme) => theme.palette.text.primary }}
        error={Boolean(touched.customer && errors.customer)}
      >
        Customer
      </FormLabel>
      {!selectedCustomer && (
        <Box
          sx={{
            border: '1px dashed #D9DBE1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '82px',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={showSelectCustomerDialogHandler}
        >
          <IconButton
            size="small"
            disableRipple
            sx={{
              backgroundColor: (theme) => theme.palette.primary.light,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            <AddOutlinedIcon sx={{ fontSize: '1.5rem' }} />
          </IconButton>
        </Box>
      )}

      {selectedCustomer && (
        <Box
          sx={{
            border: '1px solid #D9DBE1',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '82px',
            borderRadius: '8px',
            cursor: 'pointer',
            paddingInline: 2,
          }}
        >
          <Box>
            <Typography variant="details" component="div" fontWeight={500}>
              {joinStrings(
                selectedCustomer?.first_name,
                selectedCustomer?.last_name ?? ''
              )}
            </Typography>
            <Typography variant="details" component="div">
              {selectedCustomer?.phone}
            </Typography>
          </Box>

          <IconButton
            size="small"
            disableRipple
            sx={{
              backgroundColor: (theme) => theme.palette.error.light,
              color: (theme) => theme.palette.error.main,
            }}
            onClick={() => {
              setFieldValue('customer', '');
              setSelectedCustomer(null);

              setSelectedOrder && setSelectedOrder(null);
            }}
          >
            <ClearOutlinedIcon sx={{ fontSize: '1.5rem' }} />
          </IconButton>
        </Box>
      )}

      <FormHelperText error={Boolean(touched.customer && errors.customer)}>
        <ErrorHelperText
          touched={touched.customer}
          errorMessage={errors.customer}
        ></ErrorHelperText>
      </FormHelperText>
    </Grid>
  );
};

export default CustomerGrid;
