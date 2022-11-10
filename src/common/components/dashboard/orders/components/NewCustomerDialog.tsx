import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import CustomDialog from '../../../../elements/CustomDialog';
import { FC } from 'react';
import { Customer, OrderForm } from '../../../../../_types';
import { FormikProvider, Form, FormikErrors } from 'formik';
import useCustomerDialog from '../../../../hooks/useCustomerDialog';
import ErrorHelperText from '../../../UI/ErrorHelperText';
import { LoadingButton } from '@mui/lab';
import BackButton from '../../../../elements/BackButton';

interface NewCustomerDialogProps {
  showDialog: boolean;
  onCloseDialog: () => void;
  setSelectedCustomer: Dispatch<SetStateAction<Customer | null>>;
  showSelectCustomerDialogHandler: () => void;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<OrderForm>>;
  values: OrderForm;
}

const NewCustomerDialog: FC<NewCustomerDialogProps> = ({
  showDialog = false,
  onCloseDialog,
  setSelectedCustomer,
  showSelectCustomerDialogHandler,
  setFieldValue,
  values,
}) => {
  const handleClose = () => {
    resetForm();
    onCloseDialog();
  };

  const saveAndCloseCustomer = (customer?: Customer) => {
    if (customer) {
      setFieldValue('customer', customer.id);

      if (!values.pickup_address && values.is_pickup && customer?.address) {
        setFieldValue('pickup_address', customer?.address);
      }

      setSelectedCustomer(customer);
    }

    handleClose();
  };

  const { customerFormik } = useCustomerDialog(saveAndCloseCustomer);

  const {
    errors,
    touched,
    isValid,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    resetForm,
  } = customerFormik;

  return (
    <CustomDialog
      open={showDialog}
      titlemarginbottom={2}
      rootpaddingblock={8}
      rootpaddinginline={8}
    >
      <FormikProvider value={customerFormik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <DialogTitle component="div">
            <BackButton
              iconMarginRight={1}
              onClick={() => {
                handleClose();
                showSelectCustomerDialogHandler();
              }}
            />

            <Typography variant="h5" fontWeight={600} mt={2}>
              New customer
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Grid container rowSpacing={2}>
              <Grid item xs={12} pt={4} mt={2}>
                <TextField
                  id="phone"
                  label="Customer phone number"
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  {...getFieldProps('phone')}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={
                    <ErrorHelperText
                      touched={touched.phone}
                      errorMessage={errors.phone}
                    />
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="first_name"
                  label="First name"
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  {...getFieldProps('first_name')}
                  error={Boolean(touched.first_name && errors.first_name)}
                  helperText={
                    <ErrorHelperText
                      touched={touched.first_name}
                      errorMessage={errors.first_name}
                    />
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="last_name"
                  label="Last name"
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  {...getFieldProps('last_name')}
                  error={Boolean(touched.last_name && errors.last_name)}
                  helperText={
                    <ErrorHelperText
                      touched={touched.last_name}
                      errorMessage={errors.last_name}
                    />
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="address"
                  label="Customer address"
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  {...getFieldProps('address')}
                  error={Boolean(touched.address && errors.address)}
                  helperText={
                    <ErrorHelperText
                      touched={touched.address}
                      errorMessage={errors.address}
                    />
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <LoadingButton
              disableElevation
              disabled={!isValid}
              loading={isSubmitting}
              variant="contained"
              type="submit"
            >
              Add Customer
            </LoadingButton>
          </DialogActions>
        </Form>
      </FormikProvider>
    </CustomDialog>
  );
};

export default NewCustomerDialog;
