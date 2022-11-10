import { useRouter } from 'next/router';
import { useState } from 'react';
import { Order } from '../../_types';

const useInvoiceForm = () => {
  const router = useRouter();
  const { query } = router;

  const [currentStep, setCurrentStep] = useState(1);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [addProductToInvoice, setAddProductToInvoice] = useState(false);

  const [invoiceAmount, setInvoiceAmount] = useState('');

  const showSelectOrderModal = query?.showSelectOrderModal === 'true';

  const showSelectOrderDialogHandler = () => {
    router.replace({
      query: {
        ...query,
        showSelectOrderModal: true,
      },
    });
  };

  const closeSelectOrderDialogHandler = () => {
    delete query.showSelectOrderModal;
    delete query.search;

    router.replace({
      query: {
        ...query,
      },
    });
  };

  return {
    currentStep,
    setCurrentStep,
    selectedOrder,
    setSelectedOrder,
    showSelectOrderModal,
    showSelectOrderDialogHandler,
    closeSelectOrderDialogHandler,
    addProductToInvoice,
    setAddProductToInvoice,
    invoiceAmount,
    setInvoiceAmount,
  };
};

export default useInvoiceForm;
