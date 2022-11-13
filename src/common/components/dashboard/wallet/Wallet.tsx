import { Grid, Stack } from '@mui/material';
import useWallet from '../../../hooks/useWallet';
import ActionBar from '../../UI/ActionBar';

import BalanceCard from './components/BalanceCard';

import { RootState, useSelector } from '../../../redux/store';
import RecentTransactions from './components/RecentTransactions';
import { useRouter } from 'next/router';
import BigNumber from 'bignumber.js';
import useTransactions from '../../../hooks/useTransactions';

const Wallet = ({ showHeader = true, showTransactions = true }: { showHeader: boolean, showTransactions: boolean }) => {
  const router = useRouter();

  const { fetchingWallet } = useWallet();
  const { fetchingTransactions } = useTransactions();

  const { wallet, wallets, transactions } = useSelector(
    (state: RootState) => state.walletSlice
  );
  // console.log({ wallet, wallets, transactions })

  // const withdrawButtonHandler = () => {
  //   if (wallet?.hasPin) {
  //     router.push('/dashboard/wallet/withdraw');
  //     return;
  //   }

  //   router.push('/dashboard/wallet/set-transaction-pin');
  // };

  return (
    <>
      {showHeader && <ActionBar title="Wallet" hideButton hideSearch />}

      <Stack>
        <Grid
          container
          rowSpacing={6}
          px={4}
          mt={0.5}
          sx={{ width: '100%', maxWidth: '740px' }}
        >
          {wallets.map((wallet, i) => (
            <BalanceCard
              key={i}
              fetchingWallet={fetchingWallet}
              currentBalance={new BigNumber(!isNaN(Number(wallet?.platformBalance)) ? Number(wallet?.platformBalance) : 0).div(10 ** wallet?.token?.decimals).toFixed() as string}
              // onWithdraw={withdrawButtonHandler}
              tokenSymbol={wallet?.token?.symbol}
            />
          ))}

          {showTransactions && <RecentTransactions
            fetchingTransactions={fetchingTransactions}
            transactions={transactions}
          />}
        </Grid>
      </Stack>
    </>
  );
};

export default Wallet;
