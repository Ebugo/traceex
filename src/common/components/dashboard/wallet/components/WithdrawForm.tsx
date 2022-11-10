import { LoadingButton } from '@mui/lab';
import {
  Stack,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  InputAdornment,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import { isValid } from 'date-fns';
import { FormikProvider, Form } from 'formik';

import { useSelector } from 'react-redux';
import { Bank } from '../../../../../_types';
import ErrorHelperText from '../../../UI/ErrorHelperText';
import useWithdrawForm from '../../../../hooks/useWithdrawForm';
import { RootState } from '../../../../redux/store';
import NumberFormatCustom from '../../../UI/NumberFormatCustom';
import { Skeleton } from '@mui/material';
import { FC } from 'react';
import BalanceCard from './BalanceCard';
import { formatAsMoney } from '../../../../utils';
import CustomLink from '../../../../elements/CustomLink';
import { SUPPORT_EMAIL } from '../../../../constants';

interface WithdrawFormProps {
  currentBalance: string;
  fetchingWallet: boolean;
}

const WithdrawForm: FC<WithdrawFormProps> = ({
  currentBalance,
  fetchingWallet,
}) => {
  const {
    withdrawFormik,
    amountChangeHandler,
    fetchingBanks,
    selectedBank,
    setSelectedBank,
    accountNumberChangeHandler,
    fetchingAccountName,
    currentStep,
  } = useWithdrawForm(+currentBalance);

  const { banks } = useSelector((state: RootState) => state.walletSlice);

  const {
    touched,
    errors,
    isSubmitting,
    values,
    setFieldValue,
    getFieldProps,
    handleSubmit,
  } = withdrawFormik;

  return (
    <Stack>
      <FormikProvider value={withdrawFormik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid
            container
            rowSpacing={2}
            sx={{ width: '100%', maxWidth: '598px' }}
            mt={4}
          >
            {currentStep === 1 && (
              <>
                <Grid item xs={12} mb={2}>
                  <BalanceCard
                    fetchingWallet={fetchingWallet}
                    currentBalance={currentBalance as string}
                    hideWithdrawButton
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel error={Boolean(touched.amount && errors.amount)}>
                      Amount
                    </FormLabel>

                    <TextField
                      id="amount"
                      fullWidth
                      autoComplete="off"
                      placeholder="Enter Amount"
                      InputProps={{
                        inputProps: {
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                          min: 0,
                        },
                        startAdornment: (
                          <InputAdornment position="start" component="div">
                            <Typography variant="details" component="div">
                              NGN
                            </Typography>
                          </InputAdornment>
                        ),
                        inputComponent: NumberFormatCustom,
                      }}
                      {...getFieldProps('amount')}
                      onChange={amountChangeHandler}
                      error={Boolean(touched.amount && errors.amount)}
                      helperText={
                        <ErrorHelperText
                          touched={touched.amount}
                          errorMessage={errors.amount}
                        />
                      }
                    ></TextField>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel
                      error={Boolean(touched.bank_code && errors.bank_code)}
                    >
                      Select bank
                    </FormLabel>

                    <Autocomplete
                      id="bank_code"
                      options={banks}
                      autoHighlight
                      getOptionLabel={(option) => option.name}
                      isOptionEqualToValue={(option: Bank) =>
                        option.code === selectedBank?.code
                      }
                      value={selectedBank}
                      onChange={(event, newValue) => {
                        setSelectedBank(newValue);
                        setFieldValue('bank_code', newValue?.code);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          autoComplete="off"
                          placeholder="Select bank"
                          {...getFieldProps('bank_code')}
                          error={Boolean(touched.bank_code && errors.bank_code)}
                          helperText={
                            <ErrorHelperText
                              touched={touched.bank_code}
                              errorMessage={errors.bank_code}
                            />
                          }
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {fetchingBanks ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel
                      error={Boolean(
                        touched.account_number && errors.account_number
                      )}
                    >
                      Account number
                    </FormLabel>

                    <TextField
                      id="account_number"
                      fullWidth
                      autoComplete="off"
                      InputProps={{
                        inputProps: {
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                          maxLength: 10,
                        },
                      }}
                      placeholder="A/c no"
                      {...getFieldProps('account_number')}
                      onChange={accountNumberChangeHandler}
                      error={Boolean(
                        touched.account_number && errors.account_number
                      )}
                      helperText={
                        <ErrorHelperText
                          touched={touched.account_number}
                          errorMessage={errors.account_number}
                        />
                      }
                    ></TextField>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="details"
                    component="div"
                    textTransform="uppercase"
                    sx={{ color: '#631111' }}
                  >
                    {fetchingAccountName && (
                      <Skeleton sx={{ width: '30ch' }}></Skeleton>
                    )}
                    {!fetchingAccountName && (values.account_name || '')}
                  </Typography>
                </Grid>
              </>
            )}

            {currentStep === 2 && (
              <>
                <Grid item xs={12} container>
                  <Typography
                    variant="details"
                    component="div"
                    sx={{ color: '#631111', mb: 4 }}
                  >
                    You are about to withdraw a sum of{' '}
                    {formatAsMoney(+values.amount)} to account number{' '}
                    {values.account_number}
                  </Typography>

                  <Grid item xs={12} mb={1}>
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

                  <Typography
                    variant="details"
                    component="div"
                    sx={{ color: '#908F8F', mb: 4 }}
                  >
                    Any issues with fund withdrawal? Please contact support on{' '}
                    <CustomLink href={`mailto:${SUPPORT_EMAIL}`}>
                      <Typography variant="details" sx={{ color: '#FAAC30' }}>
                        {SUPPORT_EMAIL}
                      </Typography>
                    </CustomLink>
                  </Typography>
                </Grid>
              </>
            )}

            <Grid item xs={12} container justifyContent="center" mt={10}>
              <LoadingButton
                disableElevation
                disabled={!isValid || fetchingWallet}
                loading={isSubmitting}
                variant="contained"
                type="submit"
                sx={{ width: '350px' }}
              >
                {currentStep === 1 ? 'Confirm' : 'Withdraw'}
              </LoadingButton>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Stack>
  );
};

export default WithdrawForm;
