import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import {
  Customer,
  HttpErrorResponse,
  Order,
  OrderForm,
  OrderStatus,
  Product,
} from '../../_types';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/auth-context';
import { joinStrings } from '../utils/strings';
import { getInternationalPhoneNumber } from '../utils';
import { createInvoiceApi, createOrderApi } from '../../_apis_/order';

type useOrderFormProps =
  | {
      fromInvoice: true;
      orderIdFromInvoice?: Order['id'];
      invoiceAmount?: string;
    }
  | {
      fromInvoice?: false;
      orderIdFromInvoice?: undefined;
      invoiceAmount?: undefined;
    };

const useOrderForm = ({
  fromInvoice = false,
  orderIdFromInvoice = '',
  invoiceAmount = '',
}: useOrderFormProps) => {
  const router = useRouter();
  const { query } = router;

  const { business } = useAuth();
  const businessId = business?.id as string;

  const showSelectCustomerModal = query?.showSelectCustomerModal === 'true';
  const showNewCustomerModal = query?.showNewCustomerModal === 'true';
  const showSelectProductModal = query?.showSelectProductModal === 'true';
  const showNewProductModal = query?.showNewProductModal === 'true';
  const showDeliveryModal = query?.showDeliveryModal === 'true';

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const [products, setProducts] = useState<
    Array<Product & { quantity: number }>
  >([]);

  const subTotal = useMemo(
    () =>
      products.reduce(
        (previousValue, currentValue) =>
          previousValue +
          parseFloat(currentValue.price) * +currentValue.quantity,
        0
      ),
    [products]
  );

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        customer: Yup.string().required('Please select a customer'),
        is_pickup: Yup.boolean(),
        pickup_date: Yup.string()
          .nullable()
          .when('is_pickup', (is_pickup, field) =>
            is_pickup ? field.required('Pickup date is required') : field
          ),
        pickup_time: Yup.string()
          .nullable()
          .when('is_pickup', (is_pickup, field) =>
            is_pickup ? field.required('Pickup time is required') : field
          ),
        pickup_address: Yup.string().when('is_pickup', (is_pickup, field) =>
          is_pickup ? field.required('Pickup address is required') : field
        ),
        is_delivery: Yup.boolean(),
        delivery_fee: Yup.number()
          .nullable()
          .when('is_delivery', (is_delivery, field) =>
            is_delivery
              ? field
                  .required('Delivery fee is required')
                  .test(
                    'greaterThanZero',
                    'Amount must be great than zero',
                    (value: number) => (value as number) > 0
                  )
              : field
          ),
        delivery_type: Yup.string()
          .nullable()
          .when('is_delivery', (is_delivery, field) =>
            is_delivery ? field.required('Delivery type is required') : field
          ),
        sendSMS: Yup.boolean(),
        is_paid: Yup.boolean(),
      }),
    []
  );

  const initialValues = useMemo(() => {
    return {
      customer: '',
      is_pickup: false,
      pickup_date: null,
      pickup_time: null,
      pickup_address: '',
      is_delivery: false,
      delivery_fee: null,
      delivery_type: null,
      sendSMS: false,
      is_paid: false,
    };
  }, []);

  const saveInvoice = async (
    values: OrderForm,
    products: (Product & { quantity: number })[],
    orderId: Order['id']
  ) => {
    const totalAsString =
      +invoiceAmount && fromInvoice ? invoiceAmount : totalAmount.toString();

    const invoicePayload = {
      customer: values.customer,
      is_cash: false,
      ...(values.is_delivery && {
        delivery_fee: values.delivery_fee,
        delivery_type: values.delivery_type,
      }),
      ...(products.length && {
        amount_collected: subTotal.toString(),
        invoice_items: products.map(({ id: item_id, quantity, price }) => ({
          item_id,
          quantity: quantity.toString(),
          total: (+quantity * +price).toString(),
        })),
      }),
      ...(orderId && { order: orderId }),
      sendSMS: values.sendSMS,
      is_paid: values.is_paid,
      total: totalAsString,
    };

    const { message: invoiceSuccessMessage } = await createInvoiceApi(
      invoicePayload
    );

    toast.success(invoiceSuccessMessage || `Invoice created successfully`);
  };

  const saveOrder = async (values: OrderForm) => {
    const orderPayload = {
      is_accepted: true,
      is_delivery: values.is_delivery,
      business: businessId,
      customer: values.customer,
      status: (values.is_pickup ? 'SCHEDULED' : 'IN STORE') as OrderStatus,
      is_pickup: values.is_pickup,
      ...(values.is_pickup && {
        delivery_address: values.pickup_address,
        pickup_address: values.pickup_address,
        pickup_date: new Date(values.pickup_date as string).toISOString(),
        pickup_time: values.pickup_time,
      }),
      customer_name: joinStrings(
        selectedCustomer?.first_name as string,
        selectedCustomer?.last_name as string
      ),
      phone: getInternationalPhoneNumber(selectedCustomer?.phone as string),
    };

    const { data: order, message } = await createOrderApi(orderPayload);

    toast.success(message || `Order created successfully`);

    return order;
  };

  const orderFormik = useFormik<OrderForm>({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      let createdOrder = false;
      let orderId: Order['id'] = fromInvoice ? orderIdFromInvoice : '';

      try {
        if (!fromInvoice) {
          const order = await saveOrder(values);
          createdOrder = true;
          orderId = order.id;
        }

        await saveInvoice(values, products, orderId);

        resetForm();

        router.push('/dashboard/orders');
      } catch (error: unknown) {
        toast.error(
          (error as HttpErrorResponse)?.message ||
            `Failed to create ${
              createdOrder ? 'invoice' : 'order'
            }, please try again or contact an administrator`
        );
      }

      setSubmitting(false);
    },
  });

  const { values } = orderFormik;

  const totalAmount = useMemo(() => {
    const total = +subTotal + +(values?.delivery_fee ?? 0);

    return total;
  }, [subTotal, values?.delivery_fee]);

  const showSelectCustomerDialogHandler = () => {
    router.replace({
      query: {
        ...query,
        showSelectCustomerModal: true,
      },
    });
  };

  const closeSelectCustomerDialogHandler = () => {
    delete query.showSelectCustomerModal;
    delete query.search;

    router.replace({
      query: {
        ...query,
      },
    });
  };

  const closeNewCustomerDialogHandler = () => {
    delete query.showNewCustomerModal;
    delete query.search;

    router.replace({
      query: {
        ...query,
      },
    });
  };

  const showNewCustomerDialog = () => {
    router.replace({
      query: {
        ...query,
        showNewCustomerModal: true,
      },
    });
  };

  const showSelectProductDialogHandler = () => {
    router.replace({
      query: {
        ...query,
        showSelectProductModal: true,
      },
    });
  };

  const closeSelectProductDialogHandler = () => {
    delete query.showSelectProductModal;
    delete query.search;

    router.replace({
      query: {
        ...query,
      },
    });
  };

  const showNewProductDialogHandler = () => {
    router.replace({
      query: {
        ...query,
        showNewProductModal: true,
      },
    });
  };

  const closeNewProductDialogHandler = () => {
    delete query.showNewProductModal;
    delete query.search;

    router.replace({
      query: {
        ...query,
      },
    });
  };

  const decrementProduct = (productId: Product['id']) => {
    setProducts((products) => {
      const index = products.findIndex(({ id }) => id === productId);

      const productClone = [...products];

      if (productClone[index].quantity === 1) {
        productClone.splice(index, 1);
      } else {
        productClone[index].quantity--;
      }

      return [...productClone];
    });
  };

  const incrementProduct = (productId: Product['id']) => {
    setProducts((products) => {
      const index = products.findIndex(({ id }) => id === productId);

      const productClone = [...products];

      productClone[index].quantity++;

      return [...productClone];
    });
  };
  const deleteProduct = (productId: Product['id']) => {
    setProducts((products) => {
      const index = products.findIndex(({ id }) => id === productId);

      const productClone = [...products];

      productClone.splice(index, 1);

      return [...productClone];
    });
  };

  const showDeliveryDialogHandler = () => {
    router.replace({
      query: {
        ...query,
        showDeliveryModal: true,
      },
    });
  };

  const closeDeliveryDialogHandler = () => {
    delete query.showDeliveryModal;

    router.replace({
      query: {
        ...query,
      },
    });
  };

  return {
    orderFormik,
    showSelectCustomerDialogHandler,
    showSelectCustomerModal,
    closeSelectCustomerDialogHandler,
    selectedCustomer,
    setSelectedCustomer,
    showNewCustomerModal,
    closeNewCustomerDialogHandler,
    showNewCustomerDialog,
    showSelectProductDialogHandler,
    showSelectProductModal,
    products,
    setProducts,
    closeSelectProductDialogHandler,
    showNewProductDialogHandler,
    showNewProductModal,
    closeNewProductDialogHandler,
    decrementProduct,
    incrementProduct,
    deleteProduct,
    showDeliveryDialogHandler,
    showDeliveryModal,
    closeDeliveryDialogHandler,
    subTotal,
    totalAmount,
  };
};

export default useOrderForm;
