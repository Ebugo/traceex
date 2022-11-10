import { Grid, FormLabel, Box, Button } from '@mui/material';
import { FC } from 'react';

import AddCircleIcon from '../../../../elements/icons/AddCircleIcon';
import RightArrowCircleIcon from '../../../../elements/icons/RightArrowCircleIcon';

interface ProductsGridProps {
  showNewProductDialogHandler: () => void;
  showSelectProductDialogHandler: () => void;
}

const ProductsGrid: FC<ProductsGridProps> = ({
  showNewProductDialogHandler,
  showSelectProductDialogHandler,
}) => {
  return (
    <>
      <Grid
        item
        xs={12}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <FormLabel
          sx={{
            color: (theme) => theme.palette.text.primary,
            fontWeight: 500,
          }}
        >
          Products
        </FormLabel>

        <Box>
          <Button
            startIcon={<AddCircleIcon />}
            size="small"
            sx={{
              px: 0,
              mr: 2,
              '&:hover': {
                backgroundColor: 'unset',
              },
            }}
            onClick={showNewProductDialogHandler}
          >
            New product
          </Button>

          <Button
            startIcon={<RightArrowCircleIcon />}
            size="small"
            sx={{
              px: 0,
              '&:hover': {
                backgroundColor: 'unset',
              },
            }}
            onClick={showSelectProductDialogHandler}
          >
            Select products
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default ProductsGrid;
