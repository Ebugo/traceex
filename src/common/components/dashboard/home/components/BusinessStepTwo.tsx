import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { UpdateBusiness } from '../../../../../_types';
import ErrorHelperText from '../../../UI/ErrorHelperText';
import Important from '../../../UI/Important';

import { RootState, useSelector } from '../../../../redux/store';

const inputPropsStyle = {
  style: {
    fontSize: '0.875rem',
    color: 'text.secondary',
    borderRadius: '8px',
    border: '1px solid #D9DBE1',
    outline: 'none',
    fontWeight: 400,
  },
};

interface BusinessStepTwoProps {
  businessFormik: FormikProps<UpdateBusiness>;
}

const BusinessStepTwo: FC<BusinessStepTwoProps> = ({ businessFormik }) => {
  const { currencies } = useSelector((state: RootState) => state.dropDownSlice);

  const { errors, touched, getFieldProps } = businessFormik;

  return (
    <Grid container mt={4} rowSpacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FormLabel
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
            error={Boolean(touched.business_name && errors.business_name)}
          >
            Business name <Important />
          </FormLabel>

          <TextField
            id="business_name"
            fullWidth
            {...getFieldProps('business_name')}
            inputProps={{
              ...inputPropsStyle,
            }}
            error={Boolean(touched.business_name && errors.business_name)}
            helperText={
              <ErrorHelperText
                touched={touched.business_name}
                errorMessage={errors.business_name}
              />
            }
          ></TextField>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <FormLabel
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
            error={Boolean(touched.address && errors.address)}
          >
            Business address <Important />
          </FormLabel>

          <TextField
            id="address"
            fullWidth
            {...getFieldProps('address')}
            inputProps={{
              ...inputPropsStyle,
            }}
            error={Boolean(touched.address && errors.address)}
            helperText={
              <ErrorHelperText
                touched={touched.address}
                errorMessage={errors.address}
              />
            }
          ></TextField>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <FormLabel
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
            error={Boolean(touched.phone && errors.phone)}
          >
            Business phone number <Important />
          </FormLabel>

          <TextField
            id="phone"
            fullWidth
            {...getFieldProps('phone')}
            inputProps={{
              ...inputPropsStyle,
            }}
            error={Boolean(touched.phone && errors.phone)}
            helperText={
              <ErrorHelperText
                touched={touched.phone}
                errorMessage={errors.phone}
              />
            }
          ></TextField>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <FormLabel
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
            error={Boolean(touched.currency && errors.currency)}
          >
            How would you like to bill your customers? <Important />
          </FormLabel>

          <Select
            id="currency"
            fullWidth
            {...getFieldProps('currency')}
            SelectDisplayProps={{
              ...inputPropsStyle,
            }}
            displayEmpty
            error={Boolean(touched.currency && errors.currency)}
          >
            <MenuItem value="">Choose an option</MenuItem>
            {currencies.map((currency, index) => (
              <MenuItem value={currency.id} key={index}>
                {currency.name}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText error={Boolean(touched.currency && errors.currency)}>
            <ErrorHelperText
              touched={touched.currency}
              errorMessage={errors.currency}
            />
          </FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default BusinessStepTwo;
