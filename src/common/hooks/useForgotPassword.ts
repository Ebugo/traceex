import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { HttpErrorResponse, Auth } from '../../_types';

import { useRouter } from 'next/router';
import { useAuth } from '../contexts/auth-context';

const useForgotPassword = () => {
  const router = useRouter();
  const { forgotPassword } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Please provide a valid email address')
      .email('Please provide a valid email address'),
  });

  const initialValues = {
    email: '',
  };

  const forgotPasswordFormik = useFormik<{ email: Auth['email'] }>({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        const { email } = values;

        await forgotPassword(email, (response) => {
          toast.success(response.message);

          router.push('/auth/login');
        });
      } catch (error: unknown) {
        toast.error(
          (error as HttpErrorResponse)?.message ||
            'Failed to reset password, please try again or contact an administrator'
        );
      }

      setSubmitting(false);
    },
  });

  return { forgotPasswordFormik };
};

export default useForgotPassword;
