import {
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Typography,
} from '@mui/material';
import React from 'react';
import { Grid, TextField } from '@mui/material';
import CustomDialog from '../../../../elements/CustomDialog';
import { FC } from 'react';
import { Order } from '../../../../../_types';
import { FormikProvider, Form, FormikProps } from 'formik';
import ErrorHelperText from '../../../UI/ErrorHelperText';
import { LoadingButton, LocalizationProvider } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface DeclinePickupDialogProps {
  showDialog: boolean;
  onCloseDialog: () => void;
  declinePickupFormik: FormikProps<Pick<Order, 'reason'>>;
}

const DeclinePickupDialog: FC<DeclinePickupDialogProps> = ({
  showDialog = false,
  onCloseDialog,
  declinePickupFormik,
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
  } = declinePickupFormik;

  return (
    <CustomDialog
      open={showDialog}
      titlemarginbottom={2}
      rootpaddingblock={4}
      rootpaddinginline={6}
    >
      <FormikProvider value={declinePickupFormik}>
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
              Decline Pickup Schedule
            </Typography>
          </DialogTitle>

          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel error={Boolean(touched.reason && errors.reason)}>
                      Reason
                    </FormLabel>
                    <TextField
                      autoComplete="off"
                      InputProps={{
                        style: {
                          borderRadius: '8px',
                        },
                      }}
                      multiline
                      rows={3}
                      {...getFieldProps('reason')}
                      value={values.reason ?? ''}
                      error={Boolean(touched.reason && errors.reason)}
                      helperText={
                        <ErrorHelperText
                          touched={touched.reason}
                          errorMessage={errors.reason}
                        />
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </DialogContent>

          <DialogActions>
            <LoadingButton
              disableElevation
              loading={isSubmitting}
              variant="contained"
              type="submit"
            >
              Decline Order
            </LoadingButton>
          </DialogActions>
        </Form>
      </FormikProvider>
    </CustomDialog>
  );
};

export default DeclinePickupDialog;
