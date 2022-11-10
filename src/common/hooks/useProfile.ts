import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { updatePasswordApi } from '../../_apis_/authentication';
import { HttpErrorResponse, UpdatePassword, UpdateProfile } from '../../_types';
import { useAuth } from '../contexts/auth-context';

const useProfile = () => {
  const router = useRouter();
  const { query } = router;
  const currentTab = +(query?.currentTab || 0);

  const { profile } = useAuth();

  const updateUserFormik = useFormik<UpdateProfile>({
    enableReinitialize: true,
    initialValues: {
      first_name: profile?.first_name ?? '',
      last_name: profile?.last_name ?? '',
      email: profile?.email ?? '',
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      email: Yup.string()
        .required('Email is required')
        .email('Please provide a valid email address'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        // const response = await signUpApi(payloadToSend);
        // toast.success(response.message);
        // router.push('/auth/login');
      } catch (error: unknown) {
        toast.error(
          (error as HttpErrorResponse)?.message ||
            'Failed to update profile information, please try again or contact an administrator'
        );
      }

      setSubmitting(false);
    },
  });

  const updatePasswordFormik = useFormik<UpdatePassword>({
    enableReinitialize: true,
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string()
        .required('Old password is required')
        .min(5, 'Password should be at least 5 characters long'),
      newPassword: Yup.string()
        .required('New password is required')
        .min(5, 'Password should be at least 5 characters long'),
      confirmNewPassword: Yup.string()
        .required('Confirmation of password is mandatory')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        const payloadToSend = {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        };
        const { message } = await updatePasswordApi(payloadToSend);

        resetForm();

        toast.success(message);
      } catch (error: unknown) {
        toast.error(
          (error as HttpErrorResponse)?.message ||
            'Failed to update password, please try again or contact an administrator'
        );
      }

      setSubmitting(false);
    },
  });

  const handleChange = (tab: number) => {
    if (tab === 0) {
      delete query.currentTab;

      router.replace({
        query: {
          ...query,
        },
      });

      return;
    }

    router.replace({
      query: {
        ...query,
        currentTab: tab,
      },
    });
  };

  return {
    currentTab,
    handleChange,
    updateUserFormik,
    updatePasswordFormik,
  };
};

export default useProfile;
