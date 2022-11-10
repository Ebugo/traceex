import { Grid, Typography, Button } from '@mui/material';
import { FC, useState } from 'react';
import { Transaction } from '../../../../../_types';
import NoTransactionsCard from './NoTransactionsCard';
import TransactionList from './TransactionList';

interface RecentTransactionsProps {
  fetchingTransactions: boolean;
  transactions: Transaction[];
}

const RecentTransactions: FC<RecentTransactionsProps> = ({
  fetchingTransactions = false,
  transactions = [],
}) => {
  const [showHistory, setShowHistory] = useState(false);
  return (
    <>
      <Grid
        item
        xs={12}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="body2" fontWeight={500} component="div">
            Recent Transactions
          </Typography>

          <Typography
            variant="title"
            component="span"
            fontWeight={700}
          ></Typography>
        </Grid>

        <Grid item>
          <Button
            disableElevation
            disableRipple
            disableFocusRipple
            size="small"
            onClick={() => setShowHistory(true)}
          >
            View History
          </Button>
        </Grid>
      </Grid>

      {!fetchingTransactions && !transactions.length && <NoTransactionsCard />}

      {!fetchingTransactions && !!transactions.length && showHistory && (
        <TransactionList transactions={transactions} />
      )}
    </>
  );
};

export default RecentTransactions;
