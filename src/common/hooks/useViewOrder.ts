import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch, RootState } from '../redux/store';
import { clearOrder, getOrderById } from '../redux/actions/orderActions';
import { HttpErrorResponse, OrderStatus } from '../../_types';
import { updateOrderStatusApi } from '../../_apis_/order';
import { toast } from 'react-toastify';

const useViewOrder = () => {
  const router = useRouter();
  const { query } = router;

  const [loadingOrder, setLoadingOrder] = useState(true);
  const [updatingOrderStatus, setUpdatingOrderStatus] = useState(false);

  const orderId = (router.query.id || '') as string;

  const { order } = useSelector((state: RootState) => state.orderSlice);

  const showOrderStatusModal = query?.showOrderStatusModal === 'true';
  const currentOrderStatus = query?.currentOrderStatus as OrderStatus;

  const createInvoiceHandler = () => {
    const currentPath = router.pathname.replace('[id]', orderId);

    router.push(`${currentPath}/invoice`);
  };

  const openOrderStatusModalHandler = (currentOrderStatus: OrderStatus) => {
    router.replace({
      query: {
        ...query,
        showOrderStatusModal: true,
        currentOrderStatus,
      },
    });
  };

  const closeOrderStatusModalHandler = () => {
    delete query.showOrderStatusModal;
    delete query.currentOrderStatus;

    router.replace({
      query: {
        ...query,
      },
    });
  };

  const updateOrderStatusHandler = async (orderStatus: OrderStatus) => {
    setUpdatingOrderStatus(true);
    try {
      const response = await updateOrderStatusApi({
        id: orderId,
        status: orderStatus,
        is_complete: orderStatus === 'COMPLETED',
      });

      toast.success(response?.message || `Order status updated successfully`);
    } catch (error) {
      toast.error(
        (error as HttpErrorResponse)?.message ||
          `Failed to update order status, please try again or contact an administrator`
      );
    }
    setUpdatingOrderStatus(false);
  };

  useEffect(() => {
    if (!orderId) {
      return;
    }

    const fetchOrderById = async () => {
      setLoadingOrder(true);
      await dispatch(getOrderById(orderId));
      setLoadingOrder(false);
    };

    const timeOut = setTimeout(fetchOrderById, 200);

    return () => timeOut && clearTimeout(timeOut);
  }, [orderId]);

  useEffect(() => {
    return () => {
      dispatch(clearOrder());
    };
  }, []);

  return {
    loadingOrder,
    order,
    showOrderStatusModal,
    openOrderStatusModalHandler,
    createInvoiceHandler,
    closeOrderStatusModalHandler,
    currentOrderStatus,
    updateOrderStatusHandler,
    updatingOrderStatus,
    router,
  };
};

export default useViewOrder;
