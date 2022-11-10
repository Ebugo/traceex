import { Grid } from '@mui/material';
import useWallet from '../../../hooks/useWallet';
import ActionBar from '../../UI/ActionBar';

import { RootState, useSelector } from '../../../redux/store';
import WithdrawForm from './components/WithdrawForm';

const Withdraw = () => {
  const { fetchingWallet } = useWallet();

  const { wallet } = useSelector((state: RootState) => state.walletSlice);

  return (
    <>
      <ActionBar title="Withdraw funds" hideButton hideSearch />

      <Grid
        container
        rowSpacing={6}
        px={4}
        mt={0.5}
        sx={{ width: '100%', maxWidth: '740px' }}
      >
        <WithdrawForm
          fetchingWallet={fetchingWallet}
          currentBalance={wallet?.balance as string}
        />
      </Grid>
    </>
  );
};

export default Withdraw;
