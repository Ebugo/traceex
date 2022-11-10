import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import {
  Grid,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
  FormLabel,
  TextField,
  MenuItem,
} from '@mui/material';
import { isValid, format } from 'date-fns';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { OrderForm } from '../../../../../_types';
import CustomAccordion from '../../../UI/CustomAccordion';
import ErrorHelperText from '../../../UI/ErrorHelperText';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PICKUP_TIME_OPTIONS } from '../../../../constants';

interface PickupGridProps {
  orderFormik: FormikProps<OrderForm>;
}
const PickupGrid: FC<PickupGridProps> = ({ orderFormik }) => {
  const { touched, errors, values, setFieldValue, getFieldProps } = orderFormik;

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <FormControlLabel
          sx={{ marginBlock: 'none' }}
          control={
            <Checkbox
              {...getFieldProps('is_pickup')}
              checked={values.is_pickup}
              sx={{
                '& .MuiSvgIcon-root': { fontSize: 30 },
                paddingBlock: 'unset',
              }}
            />
          }
          label={
            <Typography variant="details">
              Does this order require pickup?
            </Typography>
          }
        />
      </FormControl>

      {values.is_pickup && (
        <CustomAccordion title="Pick up details">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid item container mt={2} columnSpacing={1} rowSpacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel
                    error={Boolean(touched.pickup_date && errors.pickup_date)}
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    Pick up date
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

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel
                    error={Boolean(touched.pickup_time && errors.pickup_time)}
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    Pick up time
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
                    error={Boolean(
                      touched.pickup_address && errors.pickup_address
                    )}
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    Pick up address
                  </FormLabel>

                  <TextField
                    id="pickup_address"
                    variant="outlined"
                    autoComplete="off"
                    {...getFieldProps('pickup_address')}
                    error={Boolean(
                      touched.pickup_address && errors.pickup_address
                    )}
                    helperText={
                      <ErrorHelperText
                        touched={touched.pickup_address}
                        errorMessage={errors.pickup_address}
                      />
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </CustomAccordion>
      )}
    </Grid>
  );
};

export default PickupGrid;
