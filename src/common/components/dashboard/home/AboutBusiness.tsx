import { Stack, Box, Typography, Grid } from '@mui/material';
import { Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import useBusinessForm from '../../../hooks/useBusinessForm';

import BusinessStepOne from './components/BusinessStepOne';
import { useMemo } from 'react';
import BusinessStepTwo from './components/BusinessStepTwo';
import BackButton from '../../../elements/BackButton';

const AboutBusiness = () => {
  const { businessFormik, currentStep, setCurrentStep } = useBusinessForm();

  const lastStep = currentStep === 2;

  const { isValid, isSubmitting, touched, errors, handleSubmit } =
    businessFormik;

  const submitClickHandler = () => {
    if (!lastStep) {
      setCurrentStep(currentStep + 1);
      return;
    }

    handleSubmit();
  };

  const formDisabled = useMemo(() => {
    const stepOneKey = ['type', 'country', 'state', 'city'];

    if (currentStep === 1) {
      return !stepOneKey.every(
        (key) => touched.hasOwnProperty(key) && !errors.hasOwnProperty(key)
      );
    }

    return !isValid;
  }, [currentStep, errors, isValid, touched]);

  return (
    <Stack alignItems="center">
      <Box sx={{ width: '100%', maxWidth: '598px' }}>
        <Box display="flex" mb={4} alignItems="center">
          <BackButton />

          <Typography
            variant="caption"
            component="div"
            fontWeight={400}
            textTransform="uppercase"
            gutterBottom
            ml="auto"
          >
            Step {currentStep} of 2
          </Typography>
        </Box>

        <Typography
          variant="body1"
          component="div"
          fontWeight={500}
          gutterBottom
        >
          Tell us a bit about your business.
        </Typography>
        <Typography
          variant="caption"
          component="div"
          fontWeight={400}
          gutterBottom
        >
          Please provide correct information about your business.
        </Typography>

        <FormikProvider value={businessFormik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <BusinessStepOne businessFormik={businessFormik} />
            )}

            {currentStep === 2 && (
              <BusinessStepTwo businessFormik={businessFormik} />
            )}

            <Grid container>
              <Grid item xs={12} container justifyContent="flex-end" mt={5}>
                <LoadingButton
                  disableElevation
                  disabled={formDisabled}
                  loading={isSubmitting}
                  variant="contained"
                  type={lastStep ? 'submit' : 'button'}
                  sx={{
                    minWidth: '350px',
                    height: '54px',
                    padding: '12px 32px 12px 32px',
                  }}
                  onClick={submitClickHandler}
                >
                  Continue
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Box>
    </Stack>
  );
};

export default AboutBusiness;
