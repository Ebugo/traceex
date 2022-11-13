import { CircularProgress, FormControl, FormLabel, Grid, ListItemText, MenuItem, Stack, TextField, Typography } from '@mui/material';
import ActionBar from '../../UI/ActionBar';

import { Form, FormikProvider } from 'formik';
import ErrorHelperText from '../../UI/ErrorHelperText';
import { RootState, useSelector } from '../../../redux/store';
import BigNumber from 'bignumber.js';
import { LoadingButton } from '@mui/lab';
import useWithdrawForm from '../../../hooks/useWithdrawForm';
import useCoins from '../../../hooks/useCoins';

const Crypto = () => {
  const { coins, wallet } = useSelector(
    (state: RootState) => state.walletSlice
  );
  console.log({ coins, wallet })
  const { fetchingCoins } = useCoins();

  const balance = new BigNumber(!isNaN(Number(wallet?.platformBalance)) ? Number(wallet?.platformBalance) : 0).div(10 ** wallet?.token?.decimals).toFixed();
  const { withdrawFormik } = useWithdrawForm(Number(balance));
  const { touched, errors, values, getFieldProps, isValid, isSubmitting } = withdrawFormik;

  const networkItems = [
    { title: `${wallet?.token?.symbol} balance`, subtitle: `${balance} ${wallet?.token?.symbol}` },
    // { title: "Minimum withdrawal", subtitle: "0.00001 BTC" },
    // { title: "Network fee", subtitle: "0.000005 ~ 0.0002 BTC" },
    // { title: "24h remaining limit", subtitle: "8,000,000.00 BUSD/8,000,000.00 BUSD" },
  ]

  return (
    <>
      <Stack>
        <ActionBar
          title="Withdraw Crypto"
          // buttonText="Add Product"
          // onButtonClick={addProductHandler}
          hideSearch
        />

        <Grid container xs={12} md={8} pl={4}>
          <Grid item xs={12}>
            <FormikProvider value={withdrawFormik}>
              <Form noValidate autoComplete="off" >
                <Grid container rowSpacing={2} mt={3}>
                  <Grid item xs={12} md={4} sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      gutterBottom
                      align="left"
                    >
                      Select coin
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <FormControl fullWidth>
                      <FormLabel
                        error={Boolean(touched.token && errors.token)}
                      >
                        Coin
                      </FormLabel>
                      <TextField
                        select
                        autoComplete="off"
                        InputProps={{
                          style: {
                            borderRadius: '8px',
                          },
                        }}
                        {...getFieldProps('token')}
                        value={values.token ?? ''}
                        SelectProps={{
                          displayEmpty: true,
                        }}
                        error={Boolean(touched.token && errors.token)}
                        helperText={
                          <ErrorHelperText
                            touched={touched.token}
                            errorMessage={errors.token}
                          />
                        }
                      >
                        <MenuItem value="">Select coin</MenuItem>
                        {coins.map((option) => (
                          <MenuItem
                            key={option.symbol}
                            value={option.symbol}
                            sx={{ fontSize: '0.875rem' }}
                          >
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container rowSpacing={2} mt={3}>
                  <Grid item xs={12} md={4} sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      gutterBottom
                      align="left"
                    >
                      Send to
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <FormControl fullWidth>
                      <FormLabel
                        error={Boolean(touched.to && errors.to)}
                      >
                        Address
                      </FormLabel>
                      <TextField
                        placeholder='Enter Address'
                        autoComplete="off"
                        InputProps={{
                          style: {
                            borderRadius: '8px',
                          },
                        }}
                        {...getFieldProps('to')}
                        value={values.to ?? ''}
                        error={Boolean(touched.to && errors.to)}
                        helperText={
                          <ErrorHelperText
                            touched={touched.to}
                            errorMessage={errors.to}
                          />
                        }
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <FormLabel
                        error={Boolean(touched.network && errors.network)}
                      >
                        Network
                      </FormLabel>
                      <TextField
                        select
                        autoComplete="off"
                        InputProps={{
                          style: {
                            borderRadius: '8px',
                          },
                        }}
                        {...getFieldProps('network')}
                        value={values.network ?? ''}
                        SelectProps={{
                          displayEmpty: true,
                        }}
                        error={Boolean(touched.network && errors.network)}
                        helperText={
                          <ErrorHelperText
                            touched={touched.network}
                            errorMessage={errors.network}
                          />
                        }
                      >
                        <MenuItem value="">Select network</MenuItem>
                        {coins.filter(coin => coin?.symbol === values?.token).map(({ network }, i) => (
                          <MenuItem
                            key={i}
                            value={network}
                            sx={{ fontSize: '0.875rem' }}
                          >
                            {network}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl fullWidth>
                      <FormLabel
                        error={Boolean(touched.amount && errors.amount)}
                      >
                        Amount
                      </FormLabel>
                      <TextField
                        placeholder='Enter Amount of Token to send'
                        autoComplete="off"
                        InputProps={{
                          style: {
                            borderRadius: '8px',
                          },
                        }}
                        {...getFieldProps('amount')}
                        value={values.amount ?? ''}
                        error={Boolean(touched.amount && errors.amount)}
                        helperText={
                          <ErrorHelperText
                            touched={touched.amount}
                            errorMessage={errors.amount}
                          />
                        }
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{ paddingTop: "20px" }}>
                      <LoadingButton
                        disableElevation
                        disabled={!isValid}
                        loading={isSubmitting}
                        variant="contained"
                        fullWidth
                        type="submit"
                      >
                        Withdraw
                      </LoadingButton>
                    </FormControl>
                  </Grid>
                </Grid>
              </Form>
            </FormikProvider>
          </Grid>

          {wallet && wallet?.token && wallet?.platformBalance && <Grid container xs={12} py={4} md={8} ml="auto">
            <Grid item xs={12}>
              <Grid container xs={12}>
                {networkItems.map(({ title, subtitle }, i) => (
                  <Grid key={i} item xs={12} md={6}>
                    <ListItemText
                      key={i}
                      primary={title}
                      secondary={subtitle}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        lineHeight: '24px',
                        pb: 1,
                        color: (theme) => theme.palette.success.light
                      }}
                      secondaryTypographyProps={{
                        fontSize: '0.75rem',
                        lineHeight: '24px',
                        fontWeight: 400,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>}
        </Grid>
      </Stack>
    </>
  );
};

export default Crypto;
