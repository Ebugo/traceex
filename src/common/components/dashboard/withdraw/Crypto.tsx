import { CircularProgress, FormControl, FormLabel, Grid, ListItemText, MenuItem, Stack, TextField, Typography } from '@mui/material';
import ActionBar from '../../UI/ActionBar';

import ProductDialog from './components/ProductDialog';
import useProduct from '../../../hooks/useProduct';
import { RootState, useSelector } from '../../../redux/store';
import { Form, FormikProvider } from 'formik';
import useDepositForm from '../../../hooks/useDepositForm';
import ErrorHelperText from '../../UI/ErrorHelperText';
import { COINS, NETWORKS } from '../../../constants';

const Crypto = () => {
  const {
    showDialog,
    closeProductDialogHandler,
  } = useProduct();

  const { depositFormik, fetchingAddress } = useDepositForm();
  const { touched, errors, values, getFieldProps } = depositFormik;

  const { products } = useSelector((state: RootState) => state.productSlice);

  const networkItems = [
    { title: "BTC balance", subtitle: "0 BTC" },
    { title: "Minimum withdrawal", subtitle: "0.00001 BTC" },
    { title: "Network fee", subtitle: "0.000005 ~ 0.0002 BTC" },
    { title: "24h remaining limit", subtitle: "8,000,000.00 BUSD/8,000,000.00 BUSD" },
  ]

  return (
    <>
      {showDialog && (
        <ProductDialog
          showDialog={showDialog}
          onCloseDialog={closeProductDialogHandler}
        />
      )}

      <Stack>
        <ActionBar
          title="Withdraw Crypto"
          // buttonText="Add Product"
          // onButtonClick={addProductHandler}
          hideSearch
        />

        <Grid container xs={12} md={8} pl={4}>
          <Grid item xs={12}>
            <FormikProvider value={depositFormik}>
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
                        error={Boolean(touched.coin && errors.coin)}
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
                        {...getFieldProps('coin')}
                        value={values.coin ?? ''}
                        SelectProps={{
                          displayEmpty: true,
                        }}
                        error={Boolean(touched.coin && errors.coin)}
                        helperText={
                          <ErrorHelperText
                            touched={touched.coin}
                            errorMessage={errors.coin}
                          />
                        }
                      >
                        <MenuItem value="">Select coin</MenuItem>
                        {COINS.map((option) => (
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
                        error={Boolean(touched.address && errors.address)}
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
                        {...getFieldProps('address')}
                        value={values.address ?? ''}
                        error={Boolean(touched.address && errors.address)}
                        helperText={
                          <ErrorHelperText
                            touched={touched.address}
                            errorMessage={errors.address}
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
                        {NETWORKS.map((option) => (
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
                </Grid>
              </Form>
            </FormikProvider>
          </Grid>

          <Grid container xs={12} py={4} md={8} ml="auto">
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
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default Crypto;
