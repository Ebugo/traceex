import { Stack, Typography, Button } from '@mui/material';
import { FC } from 'react';

const EmptyProducts: FC<{ onAddProduct: () => void }> = ({ onAddProduct }) => {
  return (
    <Stack direction="column" alignItems="center" mt={20}>
      <Typography variant="details" component="div" align="center" mb={4}>
        Get your business up and running by adding your products
      </Typography>

      <Button
        disableElevation
        variant="contained"
        sx={{ minWidth: '350px' }}
        onClick={onAddProduct}
      >
        Add product
      </Button>
    </Stack>
  );
};

export default EmptyProducts;
