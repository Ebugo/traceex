import Grid from '@mui/material/Grid';
import LoadingImage from '../../elements/LoadingImage';

const PageLoading = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: 'calc(100vh - 56px)' }}
      id="page-loading"
    >
      <LoadingImage />
    </Grid>
  );
};

export default PageLoading;
