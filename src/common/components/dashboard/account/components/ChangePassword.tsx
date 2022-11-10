import { LoadingButton } from '@mui/lab';
import {
  Stack,
  Grid,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Form, FormikProps, FormikProvider } from 'formik';
import { FC, useState } from 'react';
import { UpdatePassword } from '../../../../../_types';
import ErrorHelperText from '../../../UI/ErrorHelperText';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const ChangePassword: FC<{
  updatePasswordFormik: FormikProps<UpdatePassword>;
}> = ({ updatePasswordFormik }) => {
  const {
    handleSubmit,
    isValid,
    isSubmitting,
    touched,
    errors,
    getFieldProps,
  } = updatePasswordFormik;

  const [showPassword, setShowPassword] = useState(false);

  const inputProps = {
    endAdornment: (
      <InputAdornment position="end">
        {showPassword ? (
          <IconButton
            aria-label="hide password"
            onClick={() => setShowPassword(false)}
          >
            <VisibilityOffOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="show password"
            onClick={() => setShowPassword(true)}
          >
            <VisibilityOutlinedIcon />
          </IconButton>
        )}
      </InputAdornment>
    ),
  };

  return (
    <Stack alignItems="center">
      <FormikProvider value={updatePasswordFormik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container sx={{ maxWidth: '537px', width: '100%' }}>
            <Grid item container mb={4}>
              <Typography variant="body1" fontWeight={500}>
                Change password
              </Typography>
            </Grid>

            <Grid item container>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel
                      error={Boolean(touched.oldPassword && errors.oldPassword)}
                    >
                      Existing password
                    </FormLabel>
                    <TextField
                      id="oldPassword"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter existing password"
                      {...getFieldProps('oldPassword')}
                      error={Boolean(touched.oldPassword && errors.oldPassword)}
                      helperText={
                        <ErrorHelperText
                          touched={touched.oldPassword}
                          errorMessage={errors.oldPassword}
                        />
                      }
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        ...inputProps,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel
                      error={Boolean(touched.newPassword && errors.newPassword)}
                    >
                      New Password
                    </FormLabel>
                    <TextField
                      id="newPassword"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter new password"
                      {...getFieldProps('newPassword')}
                      error={Boolean(touched.newPassword && errors.newPassword)}
                      helperText={
                        <ErrorHelperText
                          touched={touched.newPassword}
                          errorMessage={errors.newPassword}
                        />
                      }
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        ...inputProps,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel
                      error={Boolean(
                        touched.confirmNewPassword && errors.confirmNewPassword
                      )}
                    >
                      Confirm new password
                    </FormLabel>
                    <TextField
                      id="confirmNewPassword"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter new password"
                      {...getFieldProps('confirmNewPassword')}
                      error={Boolean(
                        touched.confirmNewPassword && errors.confirmNewPassword
                      )}
                      helperText={
                        <ErrorHelperText
                          touched={touched.confirmNewPassword}
                          errorMessage={errors.confirmNewPassword}
                        />
                      }
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        ...inputProps,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} container justifyContent="flex-end" mt={8}>
                  <LoadingButton
                    disableElevation
                    disabled={!isValid}
                    loading={isSubmitting}
                    variant="contained"
                    type="submit"
                  >
                    Change password
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Stack>
  );
};

export default ChangePassword;
