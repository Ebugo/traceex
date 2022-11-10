import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { dispatch } from '../redux/store';
import { getOrders } from '../redux/actions/orderActions';
import { useFormik } from 'formik';
import { HttpErrorResponse, Order } from '../../_types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { acceptOrderApi } from '../../_apis_/order';

const useConfirmPickup = (
  setLoadingOrders: Dispatch<SetStateAction<boolean>>
) => {
  const router = useRouter();
  const { query } = router;

  const selectedOrderId = query?.selectedOrderId || null;
  const showConfirmPickupModal =
    query?.showConfirmPickupModal === 'true' && !!selectedOrderId;

  const closeConfirmPickupModalHandler = () => {
    delete query.showConfirmPickupModal;
    delete query.selectedOrderId;

    router.push({
      query: {
        ...query,
      },
    });
  };

  const confirmPickupFormik = useFormik<
    Pick<Order, 'pickup_date' | 'pickup_time'>
  >({
    enableReinitialize: true,
    initialValues: {
      pickup_date: '',
      pickup_time: '',
    },
    validationSchema: Yup.object().shape({
      pickup_date: Yup.string().required('Pickup date is required'),
      pickup_time: Yup.string().required('Pickup time is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        const payload = {
          ...values,
          pickup_date: new Date(values.pickup_date as string).toISOString(),
          order_id: selectedOrderId as string,
          is_pickup: true,
        };

        const response = await acceptOrderApi(payload);

        toast.success(response.message || `Order successfully accepted`);

        setLoadingOrders(true);
        await dispatch(getOrders());
        setLoadingOrders(false);

        resetForm();

        closeConfirmPickupModalHandler();
      } catch (error: unknown) {
        toast.error(
          (error as HttpErrorResponse)?.message ||
            `Failed to accept order, please try again or contact an administrator`
        );
      }

      setSubmitting(false);
    },
  });

  const showConfirmPickupModalHandler = (selectedOrderId: string) => {
    router.push({
      query: {
        ...query,
        showConfirmPickupModal: true,
        selectedOrderId,
      },
    });
  };

  return {
    showConfirmPickupModalHandler,
    closeConfirmPickupModalHandler,
    showConfirmPickupModal,
    confirmPickupFormik,
  };
};

export default useConfirmPickup;
