import { LoadingButton } from '@mui/lab';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { FormikProvider, Form } from 'formik';

import CustomLink from '../../elements/CustomLink';
import ErrorHelperText from '../UI/ErrorHelperText';
import useCustomMediaQuery from '../../hooks/useCustomMediaQuery';
import useSignupForm from '../../hooks/useSignupForm';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { SocialButton } from '../../elements/SocialLogin';
import GoogleIcon from '../../elements/icons/GoogleIcon';
import FbIcon from '../../elements/icons/FbIcon';

const SignupForm = () => {
  const { signupFormik, showPassword, setShowPassword, handleSocialSignup, handleSocialSignupFailure } = useSignupForm();
  const { medium, small } = useCustomMediaQuery();

  const {
    errors,
    touched,
    isValid,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = signupFormik;

  return (
    <FormikProvider value={signupFormik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid
          p={4}
          mt={10}
          pb={12}
          container
          rowSpacing={2}
          sx={{ backgroundColor: (theme) => theme.palette.background.paper }}>
          <Grid item xs={12} sx={{ mb: 3 }}>
            {/* {medium && ( */}
              <Typography
                variant="h4"
                component="div"
                gutterBottom
                sx={{ mb: 1 }}
              >
                Create an account
              </Typography>
            {/* )} */}

            <Typography
              variant="caption"
              component="div"
              align={'left'}
            >
              {`Already have an account? `}
              <CustomLink href="/auth/login" variant="caption" color="primary">
                Sign In
              </CustomLink>
            </Typography>
          </Grid>

          {/* <Grid item xs={12}>
            <Grid
              container
              spacing={1}
            >
              <Grid item xs={12} md={6}>
                <SocialButton
                  onLoginSuccess={handleSocialSignup}
                  onLoginFailure={handleSocialSignupFailure}
                  appId="844845104372-h8htjngp1os1tb79nksc54dq7tko4r8n.apps.googleusercontent.com"
                  provider='google'>
                  <Box display="flex" sx={{ alignItems: "center" }} gap={1}>
                    <GoogleIcon />
                    <Typography variant='inherit'>Sign up with Google</Typography>
                  </Box>
                </SocialButton>
              </Grid>
              <Grid item xs={12} md={6}>
                <SocialButton
                  onLoginSuccess={handleSocialSignup}
                  onLoginFailure={handleSocialSignupFailure}
                  appId='657319568198782'
                  provider='facebook'>
                  <Box display="flex" sx={{ alignItems: "center" }} gap={1}>
                    <FbIcon />
                    <Typography variant='inherit'>Sign up with Facebook</Typography>
                  </Box>
                </SocialButton>
              </Grid>
            </Grid>
          </Grid> */}

          <Grid item xs={12} my={2}>
            <Typography
              variant="caption"
              component="div"
              align={'center'}
            >
              OR
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="firstName"
              label="First name"
              variant="outlined"
              autoComplete="off"
              fullWidth
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={
                <ErrorHelperText
                  touched={touched.firstName}
                  errorMessage={errors.firstName}
                />
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="lastName"
              label="Last name"
              variant="outlined"
              autoComplete="off"
              fullWidth
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={
                <ErrorHelperText
                  touched={touched.lastName}
                  errorMessage={errors.lastName}
                />
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email address"
              variant="outlined"
              autoComplete="off"
              type="email"
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

          <Grid item xs={12}>
            <TextField
              id="phone"
              label="Phone number"
              variant="outlined"
              autoComplete="off"
              type="phone"
              fullWidth
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={
                <ErrorHelperText
                  touched={touched.phone}
                  errorMessage={errors.phone}
                />
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              autoComplete="off"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              InputProps={{
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
              }}
              {...getFieldProps('password')}
              error={Boolean(touched.password && errors.password)}
              helperText={
                <ErrorHelperText
                  touched={touched.password}
                  errorMessage={errors.password}
                />
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="confirm_password"
              label="Confirm Password"
              variant="outlined"
              autoComplete="off"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              InputProps={{
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
              }}
              {...getFieldProps('confirm_password')}
              error={Boolean(
                touched.confirm_password && errors.confirm_password
              )}
              helperText={
                <ErrorHelperText
                  touched={touched.confirm_password}
                  errorMessage={errors.confirm_password}
                />
              }
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 6 }}>
            <FormControlLabel
              id="acceptTerms"
              control={<Checkbox size="medium" />}
              label={
                <Typography variant="caption" sx={{ fontSize: '0.875rem' }}>
                  I have read, understood and I agree to Ricive{' '}
                  <CustomLink href="#" variant="caption" color="primary">
                    Privacy Policy
                  </CustomLink>
                  , and{' '}
                  <CustomLink href="#" variant="caption" color="primary">
                    Terms and conditions
                  </CustomLink>
                </Typography>
              }
              {...getFieldProps('acceptTerms')}
            />
          </Grid>

          <Grid item xs={12}>
            <LoadingButton
              disableElevation
              disabled={!isValid}
              loading={isSubmitting}
              variant="contained"
              fullWidth
              type="submit"
            >
              Create Account
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default SignupForm;
