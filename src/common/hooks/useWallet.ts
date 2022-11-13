import { useEffect, useState } from 'react';
import { getWallet, getWallets } from '../redux/actions/walletActions';
import { dispatch } from '../redux/store';

const useWallet = () => {
  const [fetchingWallet, setFetchingWallet] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      setFetchingWallet(true);
      await dispatch(getWallets());
      setFetchingWallet(false);
    };

    const timeOut = setTimeout(fetchWallet, 200);

    return () => timeOut && clearTimeout(timeOut);
  }, []);

  return {
    fetchingWallet,
  };
};

export default useWallet;
