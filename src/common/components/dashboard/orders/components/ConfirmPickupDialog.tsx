import {
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  MenuItem,
  Typography,
} from '@mui/material';
import React from 'react';
import { Grid, TextField } from '@mui/material';
import CustomDialog from '../../../../elements/CustomDialog';
import { FC } from 'react';
import { Order } from '../../../../../_types';
import { FormikProvider, Form, FormikProps } from 'formik';
import ErrorHelperText from '../../../UI/ErrorHelperText';
import {
  DesktopDatePicker,
  LoadingButton,
  LocalizationProvider,
} from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { PICKUP_TIME_OPTIONS } from '../../../../constants';
import { isValid, format } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface ConfirmPickupDialogProps {
  showDialog: boolean;
  onCloseDialog: () => void;
  confirmPickupFormik: FormikProps<Pick<Order, 'pickup_date' | 'pickup_time'>>;
}

const ConfirmPickupDialog: FC<ConfirmPickupDialogProps> = ({
  showDialog = false,
  onCloseDialog,
  confirmPickupFormik,
}) => {
  const handleClose = () => {
    resetForm();
    onCloseDialog();
  };

  const {
    errors,
    touched,
    isSubmitting,
    values,
    handleSubmit,
    getFieldProps,
    resetForm,
    setFieldValue,
  } = confirmPickupFormik;

  return (
    <CustomDialog
      open={showDialog}
      titlemarginbottom={2}
      rootpaddingblock={4}
      rootpaddinginline={6}
    >
      <FormikProvider value={confirmPickupFormik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <DialogTitle component="div">
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h5" fontWeight={600} mt={2}>
              Confirm Pickup Schedule
            </Typography>
          </DialogTitle>

          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel
                      error={Boolean(touched.pickup_time && errors.pickup_time)}
                    >
                      Schedule pickup time
                    </FormLabel>
                    <TextField
                      select
                      autoComplete="off"
                      InputProps={{
                        style: {
                          borderRadius: '8px',
                        },
                      }}
                      {...getFieldProps('pickup_time')}
                      value={values.pickup_time ?? ''}
                      SelectProps={{
                        displayEmpty: true,
                      }}
                      error={Boolean(touched.pickup_time && errors.pickup_time)}
                      helperText={
                        <ErrorHelperText
                          touched={touched.pickup_time}
                          errorMessage={errors.pickup_time}
                        />
                      }
                    >
                      <MenuItem value="">Enter pickup time</MenuItem>
                      {PICKUP_TIME_OPTIONS.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          sx={{ fontSize: '0.875rem' }}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel
                      error={Boolean(touched.pickup_date && errors.pickup_date)}
                    >
                      Schedule pickup date
                    </FormLabel>
                    <DesktopDatePicker
                      inputFormat="dd/MM/yyyy"
                      value={values.pickup_date}
                      minDate={new Date()}
                      onChange={(date) => {
                        setFieldValue(
                          'pickup_date',
                          isValid(date)
                            ? format(date as Date, 'MM/dd/yyyy')
                            : null
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          autoComplete="off"
                          {...getFieldProps('pickup_date')}
                          error={Boolean(
                            touched.pickup_date && errors.pickup_date
                          )}
                          helperText={
                            <ErrorHelperText
                              touched={touched.pickup_date}
                              errorMessage={errors.pickup_date}
                            />
                          }
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </DialogContent>

          <DialogActions>
            <LoadingButton
              disableElevation
              // disabled={!isValid}
              loading={isSubmitting}
              variant="contained"
              type="submit"
            >
              Accept Order
            </LoadingButton>
          </DialogActions>
        </Form>
      </FormikProvider>
    </CustomDialog>
  );
};

export default ConfirmPickupDialog;
