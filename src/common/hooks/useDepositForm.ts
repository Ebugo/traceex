import { useMemo, useEffect, ChangeEvent, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Bank, Deposit, HttpErrorResponse } from '../../_types';
import { dispatch } from '../redux/store';
import { getAddress } from '../redux/actions/walletActions';
import { getAccountNameApi, withdrawFundsApi } from '../../_apis_/wallet';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const network_REGEX = /^[0-9]{10}$/;

const useDepositForm = () => {
  const router = useRouter();
  const [fetchingAddress, setFetchingAddress] = useState(true);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const [fetchingAccountName, setFetchingAccountName] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        // network: Yup.string()
        //   .required('Account number is required')
        //   .matches(
        //     network_REGEX,
        //     'Please enter a valid Nigerian account number'
        //   ),
        amount: Yup.number()
          .required('Amount is required')
          .test(
            'greaterThanZero',
            'Amount must be great than zero',
            (value) => (value as number) > 0
          ),
        coin: Yup.string().required('Coin is required'),
        network: Yup.string().required('Network is required'),
        address: Yup.string().required('Wallet address is required'),

        // ...(currentStep === 2 && {
        //   pin: Yup.string().required('Transaction pin is required'),
        // }),
      }),
    [currentStep]
  );

  const initialValues = useMemo(() => {
    return {
      network: '',
      amount: '',
      coin: '',
      address: '',
      pin: '',
    };
  }, []);

  const depositFormik = useFormik<Deposit>({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (currentStep === 1) {
        setCurrentStep(2);
        return;
      }

      setSubmitting(true);

      try {
        // const response = await withdrawFundsApi(values);

        // toast.success(response.message || `Withdrawal was successful`);

        router.push('/dashboard/wallet');
      } catch (error: unknown) {
        toast.error(
          (error as HttpErrorResponse)?.message ||
            `Failed to update transaction pin, please try again or contact an administrator`
        );
      }

      setSubmitting(false);
    },
  });

  const { values, handleChange, setFieldValue } = depositFormik;

  const amountChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (isNaN(+value)) {
      event.preventDefault();
      return;
    }

    handleChange(event);
  };

  const accountNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (isNaN(+value)) {
      event.preventDefault();
      return;
    }

    handleChange(event);
  };

  useEffect(() => {
    if(values.coin && values.network) {
      const fetchAddress = async () => {
        setFetchingAddress(true);
        await dispatch(getAddress());
        setFetchingAddress(false);
      };
  
      const timeOut = setTimeout(fetchAddress, 200);
  
      return () => timeOut && clearTimeout(timeOut);
    }
  }, [values.coin, values.network]);

  // useEffect(() => {
  //   if (
  //     !values.coin ||
  //     !values.network ||
  //     !values.network.match(network_REGEX)
  //   ) {
  //     setFieldValue('address', '');
  //     return;
  //   }

  //   const fetchAccountName = async () => {
  //     setFetchingAccountName(true);

  //     try {
  //       const { data } = await getAccountNameApi(
  //         values.coin,
  //         values.network
  //       );

  //       // setFieldValue('address', data.address);
  //     } catch (error: unknown) {
  //       toast.error(`Failed to fetch address`);
  //     }

  //     setFetchingAccountName(false);
  //   };

  //   const timeOut = setTimeout(fetchAccountName, 500);

  //   return () => timeOut && clearTimeout(timeOut);
  // }, [setFieldValue, values.network, values.coin]);

  return {
    depositFormik,
    amountChangeHandler,
    fetchingAddress,
    selectedBank,
    setSelectedBank,
    accountNumberChangeHandler,
    fetchingAccountName,
    currentStep,
  };
};

export default useDepositForm;
