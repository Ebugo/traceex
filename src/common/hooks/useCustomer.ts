import { useRouter } from 'next/router';
import { useMemo, useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from '../redux/store';
import { toast } from 'react-toastify';
import { HttpErrorResponse } from '../../_types/ApiResponse';
import { getCustomers } from '../redux/actions/customerActions';
import { joinStrings } from '../utils';
import { deleteCustomerApi } from '../../_apis_/customer';

const useCustomer = () => {
  const router = useRouter();
  const { query } = router;

  const search = (query?.search || '') as string;

  const noDataText = search
    ? 'No customer found, please add a customer or clear the search query'
    : 'No customer found, please add a customer';

  const [loadingData, setLoadingData] = useState(true);
  const [deletingCustomer, setDeletingCustomer] = useState(false);
  const [selectedCustomerToBeDeletedId, setSelectedCustomerToBeDeletedId] =
    useState<string | null>(null);

  const { customers } = useSelector((state: RootState) => state.customerSlice);
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  const showDialog = useMemo(() => {
    return query?.showModal === 'true';
  }, [query]);

  const addCustomerHandler = () => {
    router.push({
      query: {
        ...query,
        showModal: true,
      },
    });
  };

  const closeCustomerDialogHandler = () => {
    delete query.showModal;
    delete query.selectedCustomerId;

    router.push({
      query: {
        ...query,
      },
    });
  };

  const editCustomerHandler = (selectedCustomerId: string) => {
    delete query.search;

    router.push({
      query: {
        ...query,
        showModal: true,
        selectedCustomerId,
      },
    });
  };

  const viewCustomerHandler = (selectedCustomerId: string) => {
    router.push(`/dashboard/customers/${selectedCustomerId}`);
  };

  const deleteCustomerHandler = async (customerId: string) => {
    setDeletingCustomer(true);
    try {
      const response = await deleteCustomerApi(customerId);

      toast.success(response.message || 'Customer deleted successfully');

      setSelectedCustomerToBeDeletedId(null);

      dispatch(getCustomers());
    } catch (error: unknown) {
      toast.error(
        (error as HttpErrorResponse)?.message ||
          `Failed to delete customer, please try again or contact an administrator`
      );
    }

    setDeletingCustomer(false);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoadingData(true);
      await dispatch(getCustomers());
      setLoadingData(false);
    };

    const timeOut = setTimeout(fetchCustomers, 200);

    return () => timeOut && clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    setFilteredCustomers(() => {
      const trimmedSearch = search?.trim();

      if (trimmedSearch) {
        return customers.filter(
          (customer) =>
            joinStrings(customer.first_name, customer?.last_name as string)
              .toLowerCase()
              .includes(trimmedSearch.toLowerCase()) ||
            customer.phone
              .toLowerCase()
              .includes(trimmedSearch.toLowerCase()) ||
            customer?.email?.toLowerCase().includes(trimmedSearch.toLowerCase())
        );
      }

      return customers;
    });
  }, [search, customers]);

  return {
    addCustomerHandler,
    showDialog,
    closeCustomerDialogHandler,
    loadingData,
    editCustomerHandler,
    viewCustomerHandler,
    deleteCustomerHandler,
    deletingCustomer,
    selectedCustomerToBeDeletedId,
    setSelectedCustomerToBeDeletedId,
    filteredCustomers,
    noDataText,
  };
};

export default useCustomer;
