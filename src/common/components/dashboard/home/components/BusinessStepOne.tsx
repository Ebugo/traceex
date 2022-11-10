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

interface BusinessStepOneProps {
  businessFormik: FormikProps<UpdateBusiness>;
}

const BusinessStepOne: FC<BusinessStepOneProps> = ({ businessFormik }) => {
  const { businessTypes, countries, states } = useSelector(
    (state: RootState) => state.dropDownSlice
  );

  const { errors, touched, getFieldProps } = businessFormik;

  return (
    <Grid container mt={4} rowSpacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FormLabel
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
            error={Boolean(touched.type && errors.type)}
          >
            What type of business do you own? <Important />
          </FormLabel>

          <Select
            id="type"
            fullWidth
            {...getFieldProps('type')}
            SelectDisplayProps={{
              ...inputPropsStyle,
            }}
            displayEmpty
            error={Boolean(touched.type && errors.type)}
          >
            {businessTypes.map((type, index) => (
              <MenuItem value={type.value} key={index}>
                {type.label}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText error={Boolean(touched.type && errors.type)}>
            <ErrorHelperText
              touched={touched.type}
              errorMessage={errors.type}
            />
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <FormLabel
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
            error={Boolean(touched.country && errors.country)}
          >
            What country is your business based? <Important />
          </FormLabel>

          <Select
            id="country"
            fullWidth
            {...getFieldProps('country')}
            SelectDisplayProps={{
              ...inputPropsStyle,
            }}
            displayEmpty
            error={Boolean(touched.country && errors.country)}
          >
            {countries.map((country, index) => (
              <MenuItem value={country.value} key={index}>
                {country.label}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText error={Boolean(touched.country && errors.country)}>
            <ErrorHelperText
              touched={touched.country}
              errorMessage={errors.country}
            />
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <FormLabel
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
            error={Boolean(touched.state && errors.state)}
          >
            State/district (optional)
          </FormLabel>

          <Select
            id="state"
            fullWidth
            {...getFieldProps('state')}
            SelectDisplayProps={{
              ...inputPropsStyle,
            }}
            displayEmpty
            error={Boolean(touched.state && errors.state)}
          >
            {states.map((state, index) => (
              <MenuItem value={state.value} key={index}>
                {state.label}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText error={Boolean(touched.state && errors.state)}>
            <ErrorHelperText
              touched={touched.state}
              errorMessage={errors.state}
            />
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <FormLabel
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
            error={Boolean(touched.city && errors.city)}
          >
            City <Important />
          </FormLabel>

          <TextField
            id="city"
            fullWidth
            {...getFieldProps('city')}
            inputProps={{
              ...inputPropsStyle,
            }}
            error={Boolean(touched.city && errors.city)}
            helperText={
              <ErrorHelperText
                touched={touched.city}
                errorMessage={errors.city}
              />
            }
          ></TextField>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default BusinessStepOne;
