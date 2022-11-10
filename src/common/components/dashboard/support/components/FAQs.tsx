import { Grid, Box, Typography, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const FAQs = () => {
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
        window.open(`#faq`, '_blank');
      }}
    >
      <Box>
        <Typography
          variant="details"
          sx={{ color: (theme) => theme.palette.secondary.main }}
          fontSize="0.75rem"
          component="div"
        >
          FAQs
        </Typography>
        <Typography
          variant="details"
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          You might have question?
        </Typography>
      </Box>

      <IconButton
        disableRipple
        sx={{
          p: 1.5,
        }}
      >
        <ArrowForwardIcon sx={{ fontSize: '18px' }} />
      </IconButton>
    </Grid>
  );
};

export default FAQs;
