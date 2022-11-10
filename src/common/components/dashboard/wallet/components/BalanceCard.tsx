import { Grid, Skeleton, Typography } from '@mui/material';
import { FC } from 'react';
import LightButton from '../../../../elements/LightButton';

interface CommonBalanceCardProps {
  currentBalance: string;
  fetchingWallet: boolean;
}

interface ShowWithdrawProps extends CommonBalanceCardProps {
  hideWithdrawButton?: false | undefined;
  onWithdraw: () => void;
}

interface HideWithdrawProps extends CommonBalanceCardProps {
  hideWithdrawButton?: true;
  onWithdraw?: undefined;
}

type BalanceCardProps = ShowWithdrawProps | HideWithdrawProps;

const BalanceCard: FC<BalanceCardProps> = ({
  currentBalance = '0',
  fetchingWallet = false,
  onWithdraw,
  hideWithdrawButton,
}) => {
  return (
    <Grid
      item
      xs={12}
      container
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="details" component="div">
          Current Balance
        </Typography>

        {fetchingWallet && <Skeleton sx={{ width: '9ch', height: '29px' }} />}

        {!fetchingWallet && (
          <Typography variant="title" component="span" fontWeight={700}>
            {currentBalance}{' '}
            <Typography
              variant="details"
              fontSize={'0.75rem'}
              sx={{ color: (theme) => theme.palette.text.primary }}
            >
              (NGN)
            </Typography>
          </Typography>
        )}
      </Grid>

      {!hideWithdrawButton && (
        <Grid item>
          <LightButton
            disableElevation
            color="secondary"
            sx={{
              fontSize: '1rem',
              minWidth: '163px',
              height: '46px',
              padding: '12px 32px',
              borderRadius: '8px',
            }}
            onClick={onWithdraw}
            disabled={fetchingWallet || currentBalance === '0'}
          >
            Withdraw
          </LightButton>
        </Grid>
      )}
    </Grid>
  );
};

export default BalanceCard;
