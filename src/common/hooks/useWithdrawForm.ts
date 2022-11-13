import { useMemo, useEffect, ChangeEvent, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Bank, Withdraw, HttpErrorResponse } from '../../_types';
import { dispatch } from '../redux/store';
import { getAddress, getWallet } from '../redux/actions/walletActions';
import { getAccountNameApi, withdrawFundsApi } from '../../_apis_/wallet';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { WithdrawApi } from '../../_types/Wallet';

const ACCOUNT_NUMBER_REGEX = /^[0-9]{10}$/;

const useWithdrawForm = (currentBalance: number) => {
  const router = useRouter();
  const [fetchingAddress, setFetchingAddress] = useState(true);
  const [fetchingBanks, setFetchingBanks] = useState(true);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const [fetchingAccountName, setFetchingAccountName] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        // account_name: Yup.string().required('Account name is required'),
        amount: Yup.number()
          .required('Amount is required')
          .max(currentBalance, `You can't withdraw more than ${currentBalance}`)
          .test(
            'greaterThanZero',
            'Amount must be great than zero',
            (value) => (value as number) > 0
          ),

        network: Yup.string().required('Network is required'),
        token: Yup.string().required('Coin is required'),
        to: Yup.string().required('Wallet ddress is required'),


        // account_number: Yup.string()
        //   .required('Account number is required')
        //   .matches(
        //     ACCOUNT_NUMBER_REGEX,
        //     'Please enter a valid Nigerian account number'
        //   ),
        // bank_code: Yup.string().required('Bank code is required'),
        // account_name: Yup.string().required('Account name is required'),

        // ...(currentStep === 2 && {
        //   pin: Yup.string().required('Transaction pin is required'),
        // }),
      }),
    [currentBalance, currentStep]
  );

  const initialValues = useMemo(() => {
    return {
      network: '',
      amount: '',
      to: '',
      token: '',
      blockchain: 'ethereum'
    };
  }, []);

  const withdrawFormik = useFormik<WithdrawApi>({
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
        const response = await withdrawFundsApi(values);

        toast.success(response.message || `Withdrawal was successful`);

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

  const { values, handleChange, setFieldValue } = withdrawFormik;

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
    if (values.token && values.network) {
      const fetchAddress = async () => {
        setFetchingAddress(true);
        await dispatch(getWallet(values.token, values.network));
        setFetchingAddress(false);
      };

      const timeOut = setTimeout(fetchAddress, 200);

      return () => timeOut && clearTimeout(timeOut);
    }
  }, [values.token, values.network]);

  // useEffect(() => {
  //   const fetchBanks = async () => {
  //     setFetchingBanks(true);
  //     await dispatch(getAddress());
  //     setFetchingBanks(false);
  //   };

  //   const timeOut = setTimeout(fetchBanks, 200);

  //   return () => timeOut && clearTimeout(timeOut);
  // }, []);

  // useEffect(() => {
  //   if (
  //     !values.bank_code ||
  //     !values.account_number ||
  //     !values.account_number.match(ACCOUNT_NUMBER_REGEX)
  //   ) {
  //     setFieldValue('account_name', '');
  //     return;
  //   }

  //   const fetchAccountName = async () => {
  //     setFetchingAccountName(true);

  //     try {
  //       const { data } = await getAccountNameApi(
  //         values.bank_code,
  //         values.account_number
  //       );

  //       setFieldValue('account_name', data.account_name);
  //     } catch (error: unknown) {
  //       toast.error(`Failed to fetch account name`);
  //     }

  //     setFetchingAccountName(false);
  //   };

  //   const timeOut = setTimeout(fetchAccountName, 500);

  //   return () => timeOut && clearTimeout(timeOut);
  // }, [setFieldValue, values.account_number, values.bank_code]);

  return {
    withdrawFormik,
    amountChangeHandler,
    fetchingBanks,
    selectedBank,
    setSelectedBank,
    accountNumberChangeHandler,
    fetchingAccountName,
    currentStep,
  };
};

export default useWithdrawForm;
