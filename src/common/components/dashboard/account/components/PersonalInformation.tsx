import { LoadingButton } from '@mui/lab';
import {
  Stack,
  Grid,
  Button,
  Avatar,
  FormControl,
  FormLabel,
  TextField,
} from '@mui/material';
import { Form, FormikProps, FormikProvider } from 'formik';
import { FC, useState } from 'react';
import { UpdateProfile } from '../../../../../_types';
import ErrorHelperText from '../../../UI/ErrorHelperText';

const PersonalInformation: FC<{
  updateUserFormik: FormikProps<UpdateProfile>;
}> = ({ updateUserFormik }) => {
  const {
    handleSubmit,
    isValid,
    isSubmitting,
    touched,
    errors,
    getFieldProps,
  } = updateUserFormik;

  const [isEdit, setIsEdit] = useState(false);

  return (
    <Stack alignItems="center">
      <FormikProvider value={updateUserFormik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container sx={{ maxWidth: '537px', width: '100%' }}>
            <Grid item container justifyContent="flex-end" mb={2}>
              <Button onClick={() => setIsEdit((edit) => !edit)}>
                {isEdit ? 'View' : 'Edit'}
              </Button>
            </Grid>

            <Grid item container justifyContent="center">
              <Avatar
                alt="User Avatar"
                src="../../../../../../assets/sample-avatar.png"
                sx={{ width: 122, height: 122 }}
              />
            </Grid>

            <Grid item container>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel
                      error={Boolean(touched.first_name && errors.first_name)}
                    >
                      First name
                    </FormLabel>
                    <TextField
                      disabled={!isEdit}
                      id="first_name"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="First name"
                      {...getFieldProps('first_name')}
                      error={Boolean(touched.first_name && errors.first_name)}
                      helperText={
                        <ErrorHelperText
                          touched={touched.first_name}
                          errorMessage={errors.first_name}
                        />
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel
                      error={Boolean(touched.last_name && errors.last_name)}
                    >
                      Last name
                    </FormLabel>
                    <TextField
                      disabled={!isEdit}
                      id="last_name"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Last name"
                      {...getFieldProps('last_name')}
                      error={Boolean(touched.last_name && errors.last_name)}
                      helperText={
                        <ErrorHelperText
                          touched={touched.last_name}
                          errorMessage={errors.last_name}
                        />
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel error={Boolean(touched.email && errors.email)}>
                      Email
                    </FormLabel>
                    <TextField
                      disabled={!isEdit}
                      id="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Email"
                      type="email"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={
                        <ErrorHelperText
                          touched={touched.email}
                          errorMessage={errors.email}
                        />
                      }
                    />
                  </FormControl>
                </Grid>

                {isEdit && (
                  <Grid item xs={12} container justifyContent="flex-end" mt={8}>
                    <LoadingButton
                      disableElevation
                      disabled={!isValid}
                      loading={isSubmitting}
                      variant="contained"
                      type="submit"
                    >
                      Save Changes
                    </LoadingButton>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Stack>
  );
};

export default PersonalInformation;
