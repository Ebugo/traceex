import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch, RootState } from '../redux/store';
import { getInvoices } from '../redux/actions/invoiceActions';
import { HttpErrorResponse, Invoice } from '../../_types';
import { joinStrings } from '../utils';
import { toast } from 'react-toastify';
import { sendInvoiceReminderApi, updateInvoiceApi } from '../../_apis_/invoice';

const useInvoices = () => {
  const router = useRouter();
  const { query } = router;

  const search = (query?.search || '') as string;

  const selectedInvoiceId = (query?.id as string) ?? '';

  const showMarkAsPaidModal = query?.showMarkAsPaidModal === 'true';

  const noDataText = search
    ? 'No invoices found, please add an invoice or clear the search query'
    : 'No invoices found, please add an invoice';

  const [loadingInvoices, setLoadingInvoices] = useState(true);
  const [sendReminder, setSendingReminder] = useState(false);
  const [markingAsPaid, setMarkingAsPaid] = useState(false);

  const { unpaidInvoices } = useSelector(
    (state: RootState) => state.invoiceSlice
  );

  const selectedInvoice = useMemo(
    () => unpaidInvoices.find((item) => item.id === selectedInvoiceId),
    [selectedInvoiceId, unpaidInvoices]
  );

  const [filteredUnpaidInvoices, setFilteredUnpaidInvoices] =
    useState(unpaidInvoices);

  const viewInvoiceHandler = (invoiceId: Invoice['id']) => {
    router.push(`/dashboard/invoices/${invoiceId}`);
  };

  const sendReminderHandler = async (invoiceId: Invoice['id']) => {
    setSendingReminder(true);

    try {
      const response = await sendInvoiceReminderApi(invoiceId);

      toast.success(response.message ?? 'Invoice reminder sent successfully');
    } catch (error) {
      toast.error(
        (error as HttpErrorResponse).message ??
          'Failed to send reminder, please contact admin or try again later'
      );
    }

    setSendingReminder(false);
  };

  const showMarkAsPaidDialogHandler = () => {
    router.replace({
      query: {
        ...query,
        showMarkAsPaidModal: true,
      },
    });
  };

  const closeMarkAsPaidDialogHandler = () => {
    delete query.showMarkAsPaidModal;

    router.replace({
      query: {
        ...query,
      },
    });
  };

  const markAsPaidHandler = async (
    invoiceId: Invoice['id'],
    amount: string
  ) => {
    setMarkingAsPaid(true);

    try {
      const response = await updateInvoiceApi(invoiceId, {
        amount_collected: amount,
        is_paid: true,
        is_cash: selectedInvoice?.is_cash ?? false,
        customer: selectedInvoice?.customer as string,
        total: selectedInvoice?.total as string,
      });

      toast.success(response.message ?? 'Invoice updated successfully');

      router.replace('/dashboard/invoices');

      closeMarkAsPaidDialogHandler();
    } catch (error) {
      toast.error(
        (error as HttpErrorResponse).message ??
          'Failed to update invoice, please contact admin or try again later'
      );
    }

    setMarkingAsPaid(false);
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoadingInvoices(true);
      await dispatch(getInvoices());
      setLoadingInvoices(false);
    };

    const timeOut = setTimeout(fetchInvoices, 200);

    return () => timeOut && clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    setFilteredUnpaidInvoices(() => {
      const trimmedSearch = search?.trim();

      if (trimmedSearch) {
        return unpaidInvoices.filter(
          (invoice) =>
            joinStrings(
              invoice.customer_customerToinvoice.first_name,
              invoice.customer_customerToinvoice.last_name ?? ''
            )
              .toLowerCase()
              .includes(trimmedSearch.toLowerCase()) ||
            invoice.id
              .slice(0, 6)
              .toLowerCase()
              .includes(trimmedSearch.toLowerCase())
        );
      }

      return unpaidInvoices;
    });
  }, [search, unpaidInvoices]);

  return {
    loadingInvoices,
    setLoadingInvoices,
    filteredUnpaidInvoices,
    noDataText,
    viewInvoiceHandler,
    unpaidInvoices,
    selectedInvoice,
    sendReminderHandler,
    sendReminder,
    showMarkAsPaidDialogHandler,
    closeMarkAsPaidDialogHandler,
    showMarkAsPaidModal,
    markingAsPaid,
    markAsPaidHandler,
  };
};

export default useInvoices;
