import { Grid, Stack } from '@mui/material';
import useWallet from '../../../hooks/useWallet';
import ActionBar from '../../UI/ActionBar';

import BalanceCard from './components/BalanceCard';

import { RootState, useSelector } from '../../../redux/store';
import RecentTransactions from './components/RecentTransactions';
import { useRouter } from 'next/router';

const Wallet = () => {
  const router = useRouter();

  const { fetchingWallet } = useWallet();

  const { wallet, transactions } = useSelector(
    (state: RootState) => state.walletSlice
  );

  const withdrawButtonHandler = () => {
    if (wallet?.hasPin) {
      router.push('/dashboard/wallet/withdraw');
      return;
    }

    router.push('/dashboard/wallet/set-transaction-pin');
  };

  return (
    <>
      <ActionBar title="Wallet" hideButton hideSearch />

      <Stack>
        <Grid
          container
          rowSpacing={6}
          px={4}
          mt={0.5}
          sx={{ width: '100%', maxWidth: '740px' }}
        >
          <BalanceCard
            fetchingWallet={fetchingWallet}
            currentBalance={wallet?.balance as string}
            onWithdraw={withdrawButtonHandler}
          />

          <RecentTransactions
            fetchingTransactions={fetchingWallet}
            transactions={transactions}
          />
        </Grid>
      </Stack>
    </>
  );
};

export default Wallet;
