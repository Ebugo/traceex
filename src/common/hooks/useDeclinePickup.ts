import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { dispatch } from '../redux/store';
import { getOrders } from '../redux/actions/orderActions';
import { useFormik } from 'formik';
import { HttpErrorResponse, Order } from '../../_types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { declineOrderApi } from '../../_apis_/order';

const useDeclinePickup = (
  setLoadingOrders: Dispatch<SetStateAction<boolean>>
) => {
  const router = useRouter();
  const { query } = router;

  const selectedOrderId = query?.selectedOrderId || null;
  const showDeclinePickupModal =
    query?.showDeclinePickupModal === 'true' && !!selectedOrderId;

  const closeDeclinePickupModalHandler = () => {
    delete query.showDeclinePickupModal;
    delete query.selectedOrderId;

    router.push({
      query: {
        ...query,
      },
    });
  };

  const declinePickupFormik = useFormik<Pick<Order, 'reason'>>({
    enableReinitialize: true,
    initialValues: {
      reason: '',
    },
    validationSchema: Yup.object().shape({
      reason: Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        const payload = {
          ...values,
          order_id: selectedOrderId as string,
        };

        const response = await declineOrderApi(payload);

        toast.success(response.message || `Order successfully declined`);

        setLoadingOrders(true);
        await dispatch(getOrders());
        setLoadingOrders(false);

        resetForm();

        closeDeclinePickupModalHandler();
      } catch (error: unknown) {
        toast.error(
          (error as HttpErrorResponse)?.message ||
            `Failed to decline order, please try again or contact an administrator`
        );
      }

      setSubmitting(false);
    },
  });

  const showDeclinePickupModalHandler = (selectedOrderId: string) => {
    router.push({
      query: {
        ...query,
        showDeclinePickupModal: true,
        selectedOrderId,
      },
    });
  };

  return {
    showDeclinePickupModalHandler,
    closeDeclinePickupModalHandler,
    showDeclinePickupModal,
    declinePickupFormik,
  };
};

export default useDeclinePickup;
