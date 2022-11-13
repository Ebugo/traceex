import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { CreateProfile, HttpErrorResponse } from '../../_types';
import { signUpApi } from '../../_apis_/authentication';
import { RolesEnum } from '../enums';
import { useRouter } from 'next/router';
import { isValidPhoneNumber } from 'libphonenumber-js';

const useSignupForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First enter your first name only'),
    lastName: Yup.string().required('Please enter your last name only'),
    email: Yup.string()
      .required('Please provide a valid email address')
      .email('Please provide a valid email address'),
    phone: Yup.string()
      .required('Please provide a phone number')
      .test(
        'isValidPhoneNumber',
        'Please provided a valid phone number',
        (value) => isValidPhoneNumber(value || '')
      ),
    password: Yup.string()
      .required('Please enter a password')
      .min(5, 'Password should be atleast 5 characters long'),
    confirm_password: Yup.string()
      .required('Confirmation of password is mandatory')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    acceptTerms: Yup.boolean(),
  });

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    acceptTerms: false,
  };

  const signupFormik = useFormik<
    CreateProfile & { confirm_password?: string; acceptTerms?: boolean }
  >({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!values.acceptTerms) {
        toast.error('Please accept the terms and conditions');
        return;
      }

      setSubmitting(true);

      try {
        const payloadToSend = { ...values };
        delete payloadToSend.confirm_password;
        delete payloadToSend.acceptTerms;

        // payloadToSend.role = RolesEnum.SUPERADMIN;

        const response = await signUpApi(payloadToSend);

        toast.success(response.message);

        router.push('/auth/login');
      } catch (error: unknown) {
        toast.error(
          (error as HttpErrorResponse)?.message ||
          'Failed to signup, please try again or contact an administrator'
        );
      }

      setSubmitting(false);
    },
  });

  const handleSocialSignup = (user: CreateProfile & { confirm_password?: string; acceptTerms?: boolean }) => {
    console.log(user);
  };

  const handleSocialSignupFailure = (err: unknown) => {
    console.error(err);
  };


  return { signupFormik, showPassword, setShowPassword, handleSocialSignup, handleSocialSignupFailure };
};

export default useSignupForm;
