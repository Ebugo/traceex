import { Grid, Typography } from '@mui/material';
import ActionBar from '../../UI/ActionBar';
import EmailUs from './components/EmailUs';
import FAQs from './components/FAQs';

const Support = () => {
  return (
    <>
      <ActionBar title="Support" hideSearch hideButton />

      <Grid container px={4} mt={4} sx={{ width: '100%', maxWidth: '463px' }}>
        <Grid item xs={12} mb={4}>
          <Typography
            variant="details"
            fontSize={'	0.75rem'}
            fontWeight={500}
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            SUPPORT
          </Typography>

          <Typography variant="body2" fontWeight={500} mb={1}>
            Need to contact support?
          </Typography>

          <Typography variant="details">
            Our team of professionals are always ready to answer any questions
            you may have.
          </Typography>
        </Grid>

        <EmailUs />

        {/* <FAQs /> */}
      </Grid>
    </>
  );
};

export default Support;
