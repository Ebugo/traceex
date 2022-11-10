import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import {
  CreateCustomer,
  Customer,
  HttpErrorResponse,
  UpdateCustomer,
} from '../../_types';

import { dispatch, RootState, useSelector } from '../redux/store';
import { useRouter } from 'next/router';
import {
  getCustomers,
  getCustomerById,
} from '../redux/actions/customerActions';
import { isValidPhoneNumber } from 'libphonenumber-js/mobile';
import { getInternationalPhoneNumber } from '../utils';
import { createCustomerApi, updateCustomerApi } from '../../_apis_/customer';
import { useEffect, useMemo } from 'react';
import { clearCustomer } from '../redux/actions/customerActions';

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string(),
  email: Yup.string().email('Please provide a valid email address'),
  phone: Yup.string()
    .required('Please provide a phone number')
    .test(
      'isValidPhoneNumber',
      'Please provided a valid Nigerian phone number',
      (value) => isValidPhoneNumber(value || '', 'NG') // For other countries, return the validatorSchema with useMemo and the countryCode should be a dependency
    ),
  address: Yup.string(),
});

const useCustomerDialog = (
  closeCustomerDialog: (createdCustomer?: Customer) => void
) => {
  const { query } = useRouter();

  const selectedCustomerId = (query?.selectedCustomerId || null) as
    | string
    | null;

  const showDialog = useMemo(() => {
    return query.showModal === 'true';
  }, [query]);

  const { customer } = useSelector((state: RootState) => state.customerSlice);

  const initialValues = useMemo(() => {
    if (!selectedCustomerId) {
      return {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
      };
    }

    return {
      first_name: customer?.first_name ?? '',
      last_name: customer?.last_name ?? '',
      email: customer?.email ?? '',
      phone: customer?.phone ?? '',
      address: customer?.address ?? '',
    };
  }, [
    customer?.email,
    customer?.first_name,
    customer?.last_name,
    customer?.phone,
    customer?.address,
    selectedCustomerId,
  ]);

  const customerFormik = useFormik<CreateCustomer>({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        const payload = {
          ...values,
          ...(values?.phone && {
            phone: getInternationalPhoneNumber(values.phone),
          }),
          ...(selectedCustomerId && { id: selectedCustomerId }),
        };

        // Remove out object keys with empty values i.e ''
        Object.keys(payload).forEach((key) => {
          if (payload[key as keyof (CreateCustomer | UpdateCustomer)] === '') {
            delete payload[key as keyof (CreateCustomer | UpdateCustomer)];
          }
        });

        const response = selectedCustomerId
          ? await updateCustomerApi(payload as UpdateCustomer)
          : await createCustomerApi(payload);

        toast.success(
          response.message ||
            `Customer ${
              selectedCustomerId ? 'updated' : 'created'
            } successfully`
        );

        dispatch(getCustomers());

        closeCustomerDialog(response.data);
      } catch (error: unknown) {
        toast.error(
          (error as HttpErrorResponse)?.message ||
            `Failed to ${
              selectedCustomerId ? 'update' : 'create'
            } customer, please try again or contact an administrator`
        );
      }

      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (!selectedCustomerId) {
      return;
    }

    const fetchCustomerById = async () => {
      await dispatch(getCustomerById(selectedCustomerId as string));
    };

    const timeOut = setTimeout(fetchCustomerById, 200);

    return () => timeOut && clearTimeout(timeOut);
  }, [selectedCustomerId]);

  useEffect(() => {
    if (!showDialog) {
      dispatch(clearCustomer());
    }

    return () => {
      dispatch(clearCustomer());
    };
  }, [showDialog]);

  return {
    customerFormik,
    selectedCustomerId,
  };
};

export default useCustomerDialog;
