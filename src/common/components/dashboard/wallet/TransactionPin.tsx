import {
  FormControl,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Form, FormikProvider } from 'formik';
import useTransactionPinForm from '../../../hooks/useTransactionPinForm';
import ActionBar from '../../UI/ActionBar';
import ErrorHelperText from '../../UI/ErrorHelperText';
import { LoadingButton } from '@mui/lab';
import CreatePinSuccessDialog from './components/CreatePinSuccessDialog';

const TransactionPin = () => {
  const {
    transactionPinFormik,
    submitted,
    proceedToWithdrawHandler,
    closeDialogHandler,
  } = useTransactionPinForm();

  const {
    errors,
    touched,
    isValid,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = transactionPinFormik;

  return (
    <>
      <ActionBar title="Create your transaction pin" hideButton hideSearch />

      {submitted && (
        <CreatePinSuccessDialog
          showDialog={submitted}
          onConfirm={proceedToWithdrawHandler}
          onClose={closeDialogHandler}
        />
      )}

      <Stack>
        <FormikProvider value={transactionPinFormik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid
              container
              rowSpacing={2}
              px={4}
              mt={2}
              sx={{ width: '100%', maxWidth: '740px' }}
            >
              <Grid item mb={4}>
                <Typography variant="details" component="div">
                  Please create a 4-digit PIN that would be used to complete
                  your transactions.
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel error={Boolean(touched.pin && errors.pin)}>
                    Enter Transaction Pin
                  </FormLabel>

                  <TextField
                    id="pin"
                    fullWidth
                    {...getFieldProps('pin')}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: 'd*',
                      type: 'password',
                      maxLength: 4,
                    }}
                    error={Boolean(touched.pin && errors.pin)}
                    helperText={
                      <ErrorHelperText
                        touched={touched.pin}
                        errorMessage={errors.pin}
                      />
                    }
                  ></TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} mb={6}>
                <FormControl fullWidth>
                  <FormLabel
                    error={Boolean(touched.confirm_pin && errors.confirm_pin)}
                  >
                    Confirm Transaction Pin
                  </FormLabel>

                  <TextField
                    id="confirm_pin"
                    fullWidth
                    {...getFieldProps('confirm_pin')}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: 'd*',
                      type: 'password',
                      maxLength: 4,
                    }}
                    error={Boolean(touched.confirm_pin && errors.confirm_pin)}
                    helperText={
                      <ErrorHelperText
                        touched={touched.confirm_pin}
                        errorMessage={errors.confirm_pin}
                      />
                    }
                  ></TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} container justifyContent="center">
                <LoadingButton
                  disableElevation
                  disabled={!isValid}
                  loading={isSubmitting}
                  variant="contained"
                  type="submit"
                  sx={{ width: '350px' }}
                >
                  Create Pin
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Stack>
    </>
  );
};

export default TransactionPin;
