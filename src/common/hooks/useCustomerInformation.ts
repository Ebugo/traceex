import { dispatch } from '../redux/store';
import { useRouter } from 'next/router';
import { getCustomerById } from '../redux/actions/customerActions';
import { useEffect, useState } from 'react';
import { clearCustomer } from '../redux/actions/customerActions';

const useCustomerInformation = () => {
  const { query } = useRouter();

  const selectedCustomerId = (query?.id as string) ?? '';

  const [fetchingCustomer, setFetchingCustomer] = useState(true);

  useEffect(() => {
    if (!selectedCustomerId) {
      return;
    }

    const fetchCustomerById = async () => {
      setFetchingCustomer(true);
      await dispatch(getCustomerById(selectedCustomerId as string));
      setFetchingCustomer(false);
    };

    const timeOut = setTimeout(fetchCustomerById, 200);

    return () => timeOut && clearTimeout(timeOut);
  }, [selectedCustomerId]);

  useEffect(() => {
    return () => {
      dispatch(clearCustomer());
    };
  }, []);

  return { fetchingCustomer };
};

export default useCustomerInformation;
