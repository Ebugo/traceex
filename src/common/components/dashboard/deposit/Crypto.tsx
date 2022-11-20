import { CircularProgress, FormControl, FormLabel, Grid, List, ListItem, ListItemIcon, ListItemText, MenuItem, Stack, TextField, Typography } from '@mui/material';
import ActionBar from '../../UI/ActionBar';

import { RootState, useSelector } from '../../../redux/store';
import { Form, FormikProvider } from 'formik';
import useDepositForm from '../../../hooks/useDepositForm';
import ErrorHelperText from '../../UI/ErrorHelperText';
import { COINS, NETWORKS } from '../../../constants';
import DynamicHeroIcon from '../../../elements/icons/DynamicHeroIcon';
import useCoins from '../../../hooks/useCoins';
import QRCode from 'react-qr-code';

const Crypto = () => {
  const { coins, wallet } = useSelector(
    (state: RootState) => state.walletSlice
  );
  // console.log({ coins })
  const { fetchingCoins } = useCoins();
  const { depositFormik, fetchingAddress } = useDepositForm();
  const { touched, errors, values, getFieldProps } = depositFormik;

  const networkItems = [
    // { title: "Expected arrival", subtitle: "1 network confirmations" },
    // { title: "Expected unlock", subtitle: "2 network confirmations" },
    // { title: "Minimum deposit", subtitle: "0.00000001 BTC" },
    { title: "Selected wallet", subtitle: "Spot Wallet" },
  ]

  return (
    <>
      <Stack>
        <ActionBar
          title="Deposit Crypto"
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
                        {coins.map((option) => (
                          <MenuItem
                            key={option.symbol}
                            value={option.symbol}
                            sx={{ fontSize: '0.875rem' }}
                          >
                            {option?.name}
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
                      Deposit to
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={8}>
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
                        <MenuItem value="">{fetchingCoins ? "Fetching networks" : "Select network"}</MenuItem>
                        {coins.filter(coin => coin.symbol === values.coin).map(({ network }, i) => (
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
                  </Grid>
                </Grid>
              </Form>
            </FormikProvider>
          </Grid>

          {(values.network && coins.filter(coin => coin.symbol === values.coin && coin.network === values?.network).length > 0) && values.coin && (<Grid container xs={12} py={4} md={8} ml="auto">
            {fetchingAddress
              ? (
                <Grid item xs={12}>
                  <CircularProgress color="inherit" size={20} />
                </Grid>
              )
              : (wallet
                ? (<>
                  <Grid item xs={12}>
                    <ListItemText
                      primary="Address"
                      secondary={wallet.address}
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
                  <Grid item xs={12}>
                    <ListItemText
                      // primary="Address"
                      secondary="Copy the address above or scan the QR code below"
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
                    <QRCode
                      size={176}
                      style={{ height: "176px", maxWidth: "176px", width: "100%" }}
                      value={wallet.address}
                      viewBox={`0 0 176 176`}
                    />
                  </Grid>
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

                    <List>
                      <ListItem disablePadding>
                        <ListItemIcon>
                          <DynamicHeroIcon icon="XCircleIcon" />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{
                          fontSize: '0.875rem',
                          lineHeight: '24px',
                          fontWeight: 400,
                        }}
                          primary={`Send only ${values?.coin?.toUpperCase()} to this deposit address.`} />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemIcon>
                          <DynamicHeroIcon icon="XCircleIcon" />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{
                          fontSize: '0.875rem',
                          lineHeight: '24px',
                          fontWeight: 400,
                        }}
                          primary={`Ensure the network is ${values?.network}.`} />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemIcon>
                          <DynamicHeroIcon icon="XCircleIcon" />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{
                          fontSize: '0.875rem',
                          lineHeight: '24px',
                          fontWeight: 400,
                        }}
                          primary="Do not send NFTs to this address." />
                      </ListItem>
                    </List>

                  </Grid>
                </>)
                : (
                  <Grid item xs={12}>
                    <ListItemText
                      primary="Address"
                      secondary="Address not found!"
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
                        color: "red"
                      }}
                    />
                  </Grid>
                )
              )}
          </Grid>)}
        </Grid>
      </Stack>
    </>
  );
};

export default Crypto;
