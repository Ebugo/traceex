import { useEffect, useState } from 'react';
import { getCoins } from '../redux/actions/walletActions';
import { dispatch } from '../redux/store';

const useCoins = () => {
  const [fetchingCoins, setFetchingCoins] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      setFetchingCoins(true);
      await dispatch(getCoins());
      setFetchingCoins(false);
    };

    const timeOut = setTimeout(fetchCoins, 200);

    return () => timeOut && clearTimeout(timeOut);
  }, []);

  return {
    fetchingCoins,
  };
};

export default useCoins;
