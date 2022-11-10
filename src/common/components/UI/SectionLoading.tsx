import Grid from '@mui/material/Grid';
import LoadingImage from '../../elements/LoadingImage';

const SectionLoader = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: 400 }}
    >
      <LoadingImage />
    </Grid>
  );
};

export default SectionLoader;
