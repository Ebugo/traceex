import { LoadingButton } from '@mui/lab';
import {
  Box,
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
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import useLoginForm from '../../hooks/useLoginForm';
import { SocialButton } from '../../elements/SocialLogin';
import GoogleIcon from '../../elements/icons/GoogleIcon';
import FbIcon from '../../elements/icons/FbIcon';

const LoginForm = () => {
  const { loginFormik, showPassword, setShowPassword, handleSocialLogin, handleSocialLoginFailure } = useLoginForm();
  const { medium, small } = useCustomMediaQuery();

  const {
    errors,
    touched,
    isValid,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = loginFormik;

  return (
    <FormikProvider value={loginFormik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid
          p={4}
          mt={10}
          pb={12}
          container
          rowSpacing={2}
          sx={{ backgroundColor: (theme) => theme.palette.background.paper }}>
          <Grid item xs={12}>
            {/* {medium && ( */}
              <Typography
                variant="h4"
                component="div"
                gutterBottom
                align="left"
                sx={{ mb: 3 }}
              >
                Sign In
              </Typography>
            {/* )} */}

            <Typography
              variant="caption"
              component="div"
              align={'left'}
            >
              {`New to Epay? `}
              <CustomLink href="/auth" variant="caption" color="primary">
                Create an account
              </CustomLink>
            </Typography>
          </Grid>

          {/* <Grid item xs={12}>
            <Grid
              container
              mt={3}
              spacing={1}
            >
              <Grid item xs={12} md={6}>
                <SocialButton
                  onLoginSuccess={handleSocialLogin}
                  onLoginFailure={handleSocialLoginFailure}
                  appId="844845104372-h8htjngp1os1tb79nksc54dq7tko4r8n.apps.googleusercontent.com"
                  provider='google'>
                  <Box display="flex" sx={{ alignItems: "center" }} gap={1}>
                    <GoogleIcon />
                    <Typography variant='inherit'>Sign in with Google</Typography>
                  </Box>
                </SocialButton>
              </Grid>
              <Grid item xs={12} md={6}>
                <SocialButton
                  onLoginSuccess={handleSocialLogin}
                  onLoginFailure={handleSocialLoginFailure}
                  appId='657319568198782'
                  provider='facebook'>
                  <Box display="flex" sx={{ alignItems: "center" }} gap={1}>
                    <FbIcon />
                    <Typography variant='inherit'>Sign in with Facebook</Typography>
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

            {/* <Grid container justifyContent="flex-end">
              <CustomLink
                href="/auth/forgot-password"
                variant="details"
                color="primary"
              >
                Forgot Password?
              </CustomLink>
            </Grid> */}
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
              Login
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default LoginForm;
