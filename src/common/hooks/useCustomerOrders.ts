import { dispatch, useSelector, RootState } from '../redux/store';
import { useRouter } from 'next/router';
import { getCustomerOrders } from '../redux/actions/customerActions';
import { useEffect, useMemo, useState } from 'react';
import { clearCustomer } from '../redux/actions/customerActions';

const useCustomerOrders = () => {
  const { query } = useRouter();

  const selectedCustomerId = (query?.id as string) ?? '';

  const [fetchingOrders, setFetchingOrders] = useState(true);

  const [isCompletedOrders, setIsCompletedOrders] = useState(false);

  const { orders } = useSelector((state: RootState) => state.customerSlice);

  const ongoingOrders = useMemo(
    () => orders.filter((order) => !order.is_complete),
    [orders]
  );

  const completedOrders = useMemo(
    () => orders.filter((order) => order.is_complete),
    [orders]
  );

  useEffect(() => {
    if (!selectedCustomerId) {
      return;
    }

    const fetchCustomerOrders = async () => {
      setFetchingOrders(true);
      await dispatch(getCustomerOrders(selectedCustomerId as string));
      setFetchingOrders(false);
    };

    const timeOut = setTimeout(fetchCustomerOrders, 200);

    return () => timeOut && clearTimeout(timeOut);
  }, [selectedCustomerId]);

  useEffect(() => {
    return () => {
      dispatch(clearCustomer());
    };
  }, []);

  return {
    fetchingOrders,
    isCompletedOrders,
    setIsCompletedOrders,
    ongoingOrders,
    completedOrders,
  };
};

export default useCustomerOrders;
