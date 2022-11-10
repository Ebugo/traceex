import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Typography } from '@mui/material';
import { FormikProvider, Form } from 'formik';

import CustomLink from '../../elements/CustomLink';
import ErrorHelperText from '../UI/ErrorHelperText';
import useCustomMediaQuery from '../../hooks/useCustomMediaQuery';
import useForgotPassword from '../../hooks/useForgotPassword';

const ForgotPasswordForm = () => {
  const { forgotPasswordFormik } = useForgotPassword();
  const { medium, small } = useCustomMediaQuery();

  const {
    errors,
    touched,
    isValid,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = forgotPasswordFormik;

  return (
    <FormikProvider value={forgotPasswordFormik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container rowSpacing={2} mt={8}>
          <Grid item xs={12} sx={{ mb: 3 }}>
            {medium && (
              <Typography
                variant="h4"
                component="div"
                gutterBottom
                align="center"
              >
                Forgot your password?
              </Typography>
            )}

            <Typography
              variant="body2"
              component="div"
              align={!small ? 'left' : 'center'}
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              Ensure your email address is typed in correctly and we’ll send you
              an email with instructions to reset it.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              autoComplete="off"
              fullWidth
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={
                <ErrorHelperText
                  touched={touched.email}
                  errorMessage={errors.email}
                />
              }
            />
          </Grid>

          <Grid item xs={12} mt={4}>
            <LoadingButton
              disableElevation
              disabled={!isValid}
              loading={isSubmitting}
              variant="contained"
              fullWidth
              type="submit"
            >
              Reset Password
            </LoadingButton>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="caption" align="center" component="div">
              Already have an account?{' '}
              <CustomLink href="/auth/login" variant="caption" color="primary">
                Sign in
              </CustomLink>
            </Typography>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default ForgotPasswordForm;
