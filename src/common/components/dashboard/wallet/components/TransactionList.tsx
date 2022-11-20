import { Box, Grid, Icon, Typography } from '@mui/material';
import { FC } from 'react';
import { Transaction } from '../../../../../_types';
import DynamicHeroIcon from '../../../../elements/icons/DynamicHeroIcon';
import { format } from 'date-fns';
import { formatAsMoney } from '../../../../utils';
import BigNumber from 'bignumber.js';

const TransactionList: FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  return (
    <Grid item container>
      {transactions.map((transaction) => (
        <Grid
          item
          xs={12}
          key={transaction.id}
          container
          justifyContent="space-between"
          sx={{
            mb: 3,
            borderBottom: '1px solid rgba(196, 196, 196, 0.5)',
            pb: 1,
          }}
        >
          <Box display="flex">
            <Icon
              sx={{
                borderRadius: '50%',
                backgroundColor:
                  transaction.type === 'debit' ? '#FEF6E9' : '#F3FAF2',
                transform:
                  transaction.type === 'debit'
                    ? 'rotate(45deg)'
                    : 'rotate(135deg)',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mr: 2,
              }}
            >
              <DynamicHeroIcon icon="ArrowUpIcon" />
            </Icon>

            <Box display="flex" flexDirection="column">
              <Typography variant="details" fontSize="0.75rem" fontWeight={500}>
                {transaction.type}
              </Typography>
              <Typography variant="details" fontSize="0.75rem">
                {transaction.type === 'debit'
                  ? 'Withdrawal'
                  : 'Deposit'}
              </Typography>
              <Typography
                variant="details"
                fontSize="0.75rem"
                sx={{ color: (theme) => theme.palette.secondary.main }}
              >
                {format(
                  new Date(transaction?.createdAt ?? ''),
                  'EEE LLL, yyyy hh:mm aaaa'
                )}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="flex-end" flexDirection="column">
            <Typography
              variant="details"
              fontWeight={500}
              sx={{ color: (theme) => theme.palette.text.primary }}
              align="right"
            >
              {formatAsMoney(Number(new BigNumber(!isNaN(Number(+transaction.amount)) ? Number(+transaction.amount) : 0).div(10 ** transaction?.wallet?.token?.decimals).toFixed()), true)} {(transaction?.wallet?.token?.symbol || "")?.toUpperCase()}
            </Typography>

            {/* <Typography
              variant="details"
              fontWeight={500}
              sx={{ color: (theme) => theme.palette.secondary.main }}
              align="right"
            ></Typography> */}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TransactionList;
