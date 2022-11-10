import { Grid, Box, Typography, IconButton } from '@mui/material';
import { SUPPORT_EMAIL } from '../../../../constants';
import MailIcon from '../../../../elements/icons/MailIcon';

const EmailUs = () => {
  return (
    <Grid
      item
      sx={{
        backgroundColor: (theme) => theme.palette.common.white,
        borderRadius: (theme) => theme.custom.borderRadius,
        cursor: 'pointer',
      }}
      px={2}
      py={1}
      container
      justifyContent="space-between"
      alignItems="center"
      onClick={() => {
        window.open(`mailto:${SUPPORT_EMAIL}`, '_blank');
      }}
      mb={3}
    >
      <Box>
        <Typography
          variant="details"
          sx={{ color: (theme) => theme.palette.secondary.main }}
          fontSize="0.75rem"
          component="div"
        >
          Email
        </Typography>
        <Typography
          variant="details"
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          {SUPPORT_EMAIL}
        </Typography>
      </Box>

      <IconButton
        disableRipple
        sx={{
          backgroundColor: (theme) => theme.palette.primary.light,
          p: 1.5,
        }}
      >
        <MailIcon sx={{ fontSize: '18px' }} />
      </IconButton>
    </Grid>
  );
};

export default EmailUs;
