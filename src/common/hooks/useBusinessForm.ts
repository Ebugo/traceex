import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { HttpErrorResponse, UpdateBusiness } from '../../_types';

import { dispatch, RootState, useSelector } from '../redux/store';
import { useState, useEffect, useMemo } from 'react';
import { getBusiness } from '../redux/actions/businessActions';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { getCurrencies } from '../redux/actions/dropDownActions';
import { getInternationalPhoneNumber } from '../utils';
import { updateBusinessApi } from '../../_apis_/business';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/auth-context';

const useBusinessForm = () => {
  const router = useRouter();

  const { business } = useAuth();

  const businessId = business?.id as string;

  const [loadingData, setLoadingData] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  const { businessProfile } = useSelector(
    (state: RootState) => state.businessSlice
  );

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        type: Yup.string().required('Please select a business type'),
        country: Yup.string().required('Please select a country'),
        state: Yup.string(),
        city: Yup.string().required('Please select a city'),
        business_name: Yup.string().required('Please enter a business name'),
        address: Yup.string().required('Please enter a business address'),
        phone: Yup.string()
          .required('Please provide a phone number')
          .test(
            'isValidPhoneNumber',
            'Please provided a valid Nigerian phone number',
            (value) => isValidPhoneNumber(value || '', 'NG')
          ),
        currency: Yup.string().required('Please select a currency'),
      }),
    []
  );

  const initialValues = useMemo(
    () => ({
      type: businessProfile?.type ?? '',
      country: businessProfile?.country ?? '',
      state: businessProfile?.state ?? '',
      city: businessProfile?.city ?? '',
      business_name: businessProfile?.business_name ?? '',
      address: businessProfile?.address ?? '',
      phone: businessProfile?.phone ?? '',
      currency: businessProfile?.currency ?? '',
    }),
    [
      businessProfile?.address,
      businessProfile?.business_name,
      businessProfile?.city,
      businessProfile?.country,
      businessProfile?.currency,
      businessProfile?.phone,
      businessProfile?.state,
      businessProfile?.type,
    ]
  );

  const businessFormik = useFormik<UpdateBusiness>({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!businessId) {
        toast.error('Business ID is required');
        return;
      }
      setSubmitting(true);

      try {
        const payload = {
          ...values,
          ...(values?.phone && {
            phone: getInternationalPhoneNumber(values.phone),
          }),
          id: businessId,
        };

        const response = await updateBusinessApi(payload);

        toast.success(
          response.message || `Business profile updated successfully`
        );

        router.back();
      } catch (error: unknown) {
        toast.error(
          (error as HttpErrorResponse)?.message ||
            `Failed to update business prile, please try again or contact an administrator`
        );
      }

      setSubmitting(false);
    },
  });

  const showDialog = useMemo(() => {
    return router.query.showModal === 'update-business';
  }, [router.query]);

  const closeBusinessDialogHandler = () => {
    router.back();
  };

  useEffect(() => {
    const fetchBusinessProfile = async () => {
      setLoadingData(true);

      await dispatch(getCurrencies());

      await dispatch(getBusiness());

      setLoadingData(false);
    };

    const timeOut = setTimeout(fetchBusinessProfile, 200);

    return () => timeOut && clearTimeout(timeOut);
  }, []);

  return {
    businessFormik,
    loadingData,
    currentStep,
    setCurrentStep,
    showDialog,
    closeBusinessDialogHandler
  };
};

export default useBusinessForm;
