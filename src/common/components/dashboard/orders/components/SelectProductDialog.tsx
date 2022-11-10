import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Grid, Skeleton } from '@mui/material';
import CustomDialog from '../../../../elements/CustomDialog';
import { FC, MouseEvent } from 'react';
import { formatAsMoney, sentenceCase } from '../../../../utils';
import useProduct from '../../../../hooks/useProduct';
import { DispatchSetProducts, Product } from '../../../../../_types';
import SearchField from '../../../UI/SearchField';

interface SelectProductDialogProps {
  showDialog: boolean;
  onCloseDialog: () => void;
  products: Array<Product & { quantity: number }>;
  setProducts: DispatchSetProducts;
  subtitle?: string;
}

const SelectProductDialog: FC<SelectProductDialogProps> = ({
  showDialog = false,
  onCloseDialog,
  products,
  setProducts,
  subtitle = '',
}) => {
  const { filteredProducts, loadingData } = useProduct();

  const isChecked = useCallback(
    (productId: Product['id']) => {
      return !!products.find((product) => product?.id === productId);
    },

    [products]
  );

  const productSelectHandler = async (
    e: MouseEvent<HTMLDivElement>,
    product: Product
  ) => {
    const exist = products.find(({ id }) => id === product.id);

    if (exist) {
      // set a new array with the product filtered out
      setProducts((products) => products.filter(({ id }) => id !== product.id));
      return;
    }

    setProducts((products) => [...products, { ...product, quantity: 1 }]);
  };

  return (
    <CustomDialog open={showDialog} rootpaddingblock={4} rootpaddinginline={2}>
      <DialogTitle component="div">
        <IconButton
          aria-label="close"
          onClick={onCloseDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" fontWeight={600} sx={{ px: 4 }}>
          Select Products
        </Typography>

        {subtitle && (
          <Typography variant="details" sx={{ px: 4 }}>
            {subtitle}
          </Typography>
        )}
      </DialogTitle>

      <DialogContent>
        <Grid container px={4}>
          <Grid item xs={12} mb={2}>
            <SearchField fullWidth />
          </Grid>

          {!loadingData &&
            filteredProducts.length > 0 &&
            filteredProducts.map((product) => (
              <Grid
                item
                xs={12}
                key={product.id}
                sx={{
                  borderColor: (theme) => theme.palette.primary.main,
                  borderStyle: 'solid',
                  borderWidth: '1px',
                  borderRadius: '8px',
                  paddingInline: '16px',
                  cursor: 'pointer',
                  marginBottom: '12px',
                  height: '58px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onClick={(e) => {
                  productSelectHandler(e, product);
                }}
              >
                <FormControlLabel
                  control={<Checkbox checked={isChecked(product.id)} />}
                  label={
                    <Typography
                      component="button"
                      variant="details"
                      sx={{
                        background: 'none',
                        border: 'unset',
                        cursor: 'pointer',
                      }}
                    >
                      {sentenceCase(product.name)}
                    </Typography>
                  }
                />

                <Typography
                  variant="details"
                  component="button"
                  sx={{
                    background: 'none',
                    border: 'unset',
                    cursor: 'pointer',
                  }}
                >
                  {formatAsMoney(parseFloat(product.price))}
                </Typography>
              </Grid>
            ))}

          {loadingData &&
            [...Array(6)].map((e, index) => (
              <Skeleton key={index} sx={{ width: '100%', height: '70px' }} />
            ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Grid container px={4} justifyContent="flex-end">
          <Button
            disableElevation
            variant="contained"
            sx={{
              minWidth: '252px',
              fontSize: '1rem',
              fontWeight: 500,
              height: '54px',
              padding: '12px 32px',
            }}
            onClick={onCloseDialog}
          >
            Done
          </Button>
        </Grid>
      </DialogActions>
    </CustomDialog>
  );
};

export default SelectProductDialog;
