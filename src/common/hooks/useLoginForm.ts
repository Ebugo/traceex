import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { HttpErrorResponse, Auth, Customer } from '../../_types';

import { useRouter } from 'next/router';
import { useAuth } from '../contexts/auth-context';

const useLoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Please provide a valid email address')
      .email('Please provide a valid email address'),
    password: Yup.string()
      .required('Please enter a password')
      .min(5, 'Password should be atleast 5 characters long'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const loginFormik = useFormik<{ email: Auth['email']; password: string }>({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        const { email, password } = values;

        // await login(email, password, (response) => {
        //   toast.success(response.message);

          router.push('/dashboard');
        // });
      } catch (error: unknown) {
        toast.error(
          (error as HttpErrorResponse)?.message ||
          'Failed to login, please try again or contact an administrator'
        );
      }

      setSubmitting(false);
    },
  });

  const handleSocialLogin = (user: Customer) => {
    console.log(user);
  };

  const handleSocialLoginFailure = (err: unknown) => {
    console.error(err);
  };


  return { loginFormik, showPassword, setShowPassword, handleSocialLogin, handleSocialLoginFailure };
};

export default useLoginForm;
