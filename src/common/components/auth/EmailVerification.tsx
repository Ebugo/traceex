import { Grid, Typography, Button } from '@mui/material';
import EmailVerificationIcon from '../../elements/icons/EmailVerificationIcon';
import useEmailVerification from '../../hooks/useEmailVerification';
import useWindowSize from '../../hooks/useWindowSize';

const EmailVerification = () => {
  const { resendVerificationEmail } = useEmailVerification();
  const { height } = useWindowSize();

  return (
    <Grid
      container
      sx={{ height }}
      direction="column"
      justifyContent="center"
      alignItems="center"
      rowSpacing={1}
    >
      <Grid item container justifyContent="center">
        <EmailVerificationIcon sx={{ fontSize: '129px' }} />
      </Grid>

      <Grid item sx={{ width: '350px', mb: 3 }}>
        <Typography variant="h4" component="div" align="center" gutterBottom>
          Verify your email
        </Typography>
        <Typography variant="caption" component="div" align="center">
          We’ve sent a verification link to your email address.
        </Typography>
      </Grid>

      <Grid item sx={{ width: '350px' }} container justifyContent="center">
        <Typography variant="details" component="div" align="center">
          Haven’t received any email?
        </Typography>

        <Button
          disableElevation
          size="small"
          sx={{ padding: 'unset' }}
          onClick={resendVerificationEmail}
        >
          Resend
        </Button>
      </Grid>
    </Grid>
  );
};

export default EmailVerification;
