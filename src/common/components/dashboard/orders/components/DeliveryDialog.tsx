import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  Typography,
} from '@mui/material';
import React from 'react';
import { Grid, TextField } from '@mui/material';
import CustomDialog from '../../../../elements/CustomDialog';
import { FC, useEffect } from 'react';
import { Invoice, OrderForm } from '../../../../../_types';
import { FormikProps } from 'formik';
import ErrorHelperText from '../../../UI/ErrorHelperText';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import NumberFormatCustom from '../../../UI/NumberFormatCustom';
import DeliveryTypeControl from './DeliveryTypeControl';

interface DeliveryDialogProps {
  showDialog: boolean;
  onCloseDialog: () => void;
  orderFormik: FormikProps<OrderForm>;
}

const DeliveryDialog: FC<DeliveryDialogProps> = ({
  showDialog = false,
  onCloseDialog,
  orderFormik,
}) => {
  const {
    errors,
    touched,
    values,
    getFieldProps,
    setFieldValue,

    setTouched,
  } = orderFormik;

  const { is_delivery } = values;

  const hasErrors =
    Boolean(errors?.delivery_fee) || Boolean(errors?.delivery_type);

  const saveDeliveryHandler = () => {
    if (hasErrors) {
      setTouched({
        ...touched,
        delivery_fee: true,
        delivery_type: true,
      });

      return;
    }

    onCloseDialog();
  };

  useEffect(() => {
    if (is_delivery) {
      return;
    }

    setFieldValue('is_delivery', true);
  }, [is_delivery, setFieldValue]);

  return (
    <CustomDialog open={showDialog} rootpaddingblock={8} rootpaddinginline={8}>
      <DialogTitle component="div">
        <IconButton
          aria-label="close"
          onClick={onCloseDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box>
          <Typography variant="h5" fontWeight={600}>
            Add delivery fee
          </Typography>
          <Typography variant="details" mt={2}>
            Enter a custom delivery fee you would want to charge this customer.
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              id="amount"
              variant="outlined"
              autoComplete="off"
              placeholder="Enter Amount"
              fullWidth
              InputProps={{
                inputProps: {
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  min: 0,
                },
                inputComponent: NumberFormatCustom,
              }}
              {...getFieldProps('delivery_fee')}
              error={Boolean(touched?.delivery_fee && errors?.delivery_fee)}
              helperText={
                <ErrorHelperText
                  touched={touched?.delivery_fee as boolean}
                  errorMessage={errors?.delivery_fee as string}
                />
              }
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel
                error={Boolean(touched?.delivery_type && errors?.delivery_type)}
              >
                Select fee option
              </FormLabel>

              {['Pickup', 'Delivery', 'Pickup & Delivery'].map(
                (deliveryType, index) => (
                  <DeliveryTypeControl
                    key={index}
                    deliveryType={deliveryType as Invoice['delivery_type']}
                    orderFormik={orderFormik}
                  />
                )
              )}

              <FormHelperText
                error={Boolean(touched.delivery_type && errors.delivery_type)}
              >
                <ErrorHelperText
                  touched={touched.delivery_type as boolean}
                  errorMessage={errors.delivery_type as string}
                ></ErrorHelperText>
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          disableElevation
          variant="contained"
          type="button"
          sx={{ minWidth: '252px' }}
          onClick={saveDeliveryHandler}
        >
          Save
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};

export default DeliveryDialog;
