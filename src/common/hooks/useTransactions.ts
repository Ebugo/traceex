import { useEffect, useState } from 'react';
import { getTransactions } from '../redux/actions/walletActions';
import { dispatch } from '../redux/store';

const useTransactions = () => {
  const [fetchingTransactions, setFetchingTransactions] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setFetchingTransactions(true);
      await dispatch(getTransactions());
      setFetchingTransactions(false);
    };

    const timeOut = setTimeout(fetchTransactions, 200);

    return () => timeOut && clearTimeout(timeOut);
  }, []);

  return {
    fetchingTransactions,
  };
};

export default useTransactions;
