import { useEffect, useState } from 'react';
import { getWallet } from '../redux/actions/walletActions';
import { dispatch } from '../redux/store';

const useWallet = () => {
  const [fetchingWallet, setFetchingWallet] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      setFetchingWallet(true);
      await dispatch(getWallet());
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
