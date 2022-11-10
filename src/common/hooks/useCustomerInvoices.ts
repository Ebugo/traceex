import { dispatch, useSelector, RootState } from '../redux/store';
import { useRouter } from 'next/router';
import { getCustomerInvoices } from '../redux/actions/customerActions';
import { useEffect, useMemo, useState } from 'react';
import { clearCustomer } from '../redux/actions/customerActions';

const useCustomerInvoices = () => {
  const { query } = useRouter();

  const selectedCustomerId = (query?.id as string) ?? '';

  const [fetchingInvoices, setFetchingInvoices] = useState(true);
  const [isPaidInvoices, setIsPaidInvoices] = useState(true);

  const { invoices } = useSelector((state: RootState) => state.customerSlice);

  const unpaidInvoices = useMemo(
    () => invoices.filter((invoice) => !invoice.is_paid),
    [invoices]
  );

  const paidInvoices = useMemo(
    () => invoices.filter((invoice) => invoice.is_paid),
    [invoices]
  );

  useEffect(() => {
    if (!selectedCustomerId) {
      return;
    }

    const fetchCustomerInvoices = async () => {
      setFetchingInvoices(true);
      await dispatch(getCustomerInvoices(selectedCustomerId as string));
      setFetchingInvoices(false);
    };

    const timeOut = setTimeout(fetchCustomerInvoices, 200);

    return () => timeOut && clearTimeout(timeOut);
  }, [selectedCustomerId]);

  useEffect(() => {
    return () => {
      dispatch(clearCustomer());
    };
  }, []);

  return {
    fetchingInvoices,
    isPaidInvoices,
    setIsPaidInvoices,
    unpaidInvoices,
    paidInvoices,
  };
};

export default useCustomerInvoices;
