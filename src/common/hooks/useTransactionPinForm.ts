import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { HttpErrorResponse } from '../../_types/ApiResponse';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { updateTransactionPinApi } from '../../_apis_/wallet';
import { useRouter } from 'next/router';

const useTransactionPinForm = () => {
  const router = useRouter();

  const [submitted, setSubmitted] = useState(false);

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        pin: Yup.string()
          .required('Please provide 4 digit a transaction pin')
          .matches(/^[0-9]{4}$/, 'Please provide 4 digit a transaction pin'),
        confirm_pin: Yup.string()
          .required('Confirmation pin is mandatory')
          .matches(
            /^[0-9]{4}$/,
            'Please provide 4 digit transaction confirmation pin'
          )
          .oneOf([Yup.ref('pin'), null], 'Transaction pin must match'),
      }),
    []
  );

  const initialValues = useMemo(() => {
    return {
      pin: '',
      confirm_pin: '',
    };
  }, []);

  const transactionPinFormik = useFormik<{ pin: string; confirm_pin: string }>({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        const response = await updateTransactionPinApi(values.pin);

        toast.success(
          response.message || `Transaction pin is updated successfully`
        );

        setSubmitted(true);
      } catch (error: unknown) {
        toast.error(
          (error as HttpErrorResponse)?.message ||
            `Failed to update transaction pin, please try again or contact an administrator`
        );
      }

      setSubmitting(false);
    },
  });

  const proceedToWithdrawHandler = () => {
    router.push('/dashboard/wallet/withdraw');
  };

  const closeDialogHandler = () => {
    router.back();
  };

  return {
    transactionPinFormik,
    submitted,
    proceedToWithdrawHandler,
    closeDialogHandler,
  };
};

export default useTransactionPinForm;
