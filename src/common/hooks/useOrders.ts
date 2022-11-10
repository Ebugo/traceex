import { useRouter } from 'next/router';
import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch, RootState } from '../redux/store';
import { getOrders } from '../redux/actions/orderActions';
import { OrderTypeEnum } from '../enums';

const useOrders = () => {
  const router = useRouter();
  const { query } = router;

  const search = (query?.search || '') as string;

  const currentTab = +(query?.currentTab || OrderTypeEnum.NEW);

  const noDataText = search
    ? 'No orders found, please add an order or clear the search query'
    : 'No orders found, please add an order';

  const [loadingOrders, setLoadingOrders] = useState(true);

  const { orders } = useSelector((state: RootState) => state.orderSlice);

  const [filteredOrders, setFilteredOrders] = useState(orders);

  const newOrders = useMemo(
    () => filteredOrders.filter((order) => !order.is_accepted),
    [filteredOrders]
  );

  const upcomingOrders = useMemo(
    () =>
      filteredOrders.filter(
        (order) => order.is_accepted && order.status === 'SCHEDULED'
      ),
    [filteredOrders]
  );

  const ongoingOrders = useMemo(
    () =>
      filteredOrders.filter((order) =>
        ['IN STORE', 'PROCESSING', 'DELIVERY'].includes(order.status)
      ),
    [filteredOrders]
  );

  const completedOrders = useMemo(
    () => filteredOrders.filter((order) => order.is_complete),
    [filteredOrders]
  );

  const addOrderHandler = () => {
    router.push('/dashboard/orders/new');
  };

  const viewOrderHandler = (orderId: string) => {
    router.push(`/dashboard/orders/${orderId}`);
  };

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      delete query.currentTab;

      router.replace({
        query: {
          ...query,
        },
      });

      return;
    }

    router.replace({
      query: {
        ...query,
        currentTab: newValue,
      },
    });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true);
      await dispatch(getOrders());
      setLoadingOrders(false);
    };

    const timeOut = setTimeout(fetchOrders, 200);

    return () => timeOut && clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    setFilteredOrders(() => {
      const trimmedSearch = search?.trim();

      if (trimmedSearch) {
        return orders.filter(
          (order) =>
            order.customer_name
              .toLowerCase()
              .includes(trimmedSearch.toLowerCase()) ||
            order.id.toLowerCase().includes(trimmedSearch.toLowerCase())
        );
      }

      return orders;
    });
  }, [search, orders]);

  return {
    addOrderHandler,
    loadingOrders,
    setLoadingOrders,
    filteredOrders,
    noDataText,
    newOrders,
    upcomingOrders,
    ongoingOrders,
    completedOrders,
    viewOrderHandler,
    currentTab,
    handleTabChange,
  };
};

export default useOrders;
