import { Grid, Box, Avatar, Typography, IconButton } from '@mui/material';
import { FC } from 'react';
import { Product } from '../../../../../_types';
import TrashOutlinedIcon from '../../../../elements/icons/TrashOutlinedIcon';
import { sentenceCase, formatAsMoney } from '../../../../utils';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

interface CommonProductItemProps {
  product: Product & { quantity: number };
  decrementProduct: (productId: Product['id']) => void;
  incrementProduct: (productId: Product['id']) => void;
  lastProduct: boolean;
}

interface InvoiceProductItemProps extends CommonProductItemProps {
  fromInvoice: true;
  deleteProduct: (productId: Product['id']) => void;
}

interface OrderProductItemProps extends CommonProductItemProps {
  fromInvoice?: false;
  deleteProduct?: undefined;
}

type ProductItemProps = InvoiceProductItemProps | OrderProductItemProps;

const ProductItem: FC<ProductItemProps> = ({
  product,
  decrementProduct,
  incrementProduct,
  deleteProduct,
  lastProduct,
  fromInvoice = false,
}) => {
  return (
    <Grid
      item
      xs={12}
      container
      justifyContent="space-between"
      alignItems="center"
      mb={2}
      sx={{
        ...(lastProduct && {
          borderBottom: '1px solid #EAECF0',
          pb: 2,
        }),
      }}
    >
      <Box display="flex" alignItems="center">
        {!fromInvoice && (
          <Avatar
            alt={product.name}
            src={
              (product.image as string) ||
              'https://ricive-web-app.s3.amazonaws.com/assets/images/no-image-icon.svg'
            }
            sx={{ mr: 2 }}
          />
        )}

        <Box display="flex" flexDirection="column">
          <Typography
            variant="details"
            fontSize={fromInvoice ? '1rem' : '0.75rem'}
          >
            {sentenceCase(product.name)}
          </Typography>
          <Typography
            variant="details"
            fontWeight={500}
            fontSize={fromInvoice ? '0.875rem' : '0.75rem'}
            sx={{
              ...(fromInvoice
                ? { color: (theme) => theme.palette.text.primary }
                : {}),
            }}
          >
            {formatAsMoney(+product.price * +product.quantity)}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" alignItems="center">
        <IconButton
          sx={{
            width: fromInvoice ? '32px' : '24px',
            height: fromInvoice ? '32px' : '24px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#D9DBE1',
          }}
          onClick={decrementProduct.bind(null, product.id)}
        >
          {product.quantity > 1 ? (
            <RemoveOutlinedIcon sx={{ fontSize: '1rem' }} />
          ) : (
            <TrashOutlinedIcon sx={{ fontSize: '1rem' }} />
          )}
        </IconButton>

        <Typography
          variant="body1"
          mr={1}
          ml={1}
          sx={{ width: '2ch', fontSize: fromInvoice ? '1rem' : '0.875rem' }}
          textAlign="center"
        >
          {product.quantity}
        </Typography>

        <IconButton
          sx={{
            borderWidth: '1px',
            width: fromInvoice ? '32px' : '24px',
            height: fromInvoice ? '32px' : '24px',
            borderStyle: 'solid',
            borderColor: fromInvoice
              ? '#D9DBE1'
              : (theme) => theme.palette.primary.main,
          }}
          onClick={incrementProduct.bind(null, product.id)}
        >
          <AddOutlinedIcon
            sx={{
              fontSize: '1rem',
              color: (theme) =>
                theme.palette[fromInvoice ? 'secondary' : 'primary'].main,
            }}
          />
        </IconButton>
      </Box>

      {fromInvoice && (
        <Box display="flex" alignItems="center">
          <IconButton
            sx={{
              width: '32px',
              height: '32px',
              backgroundColor: (theme) => theme.palette.error.light,
              color: (theme) => theme.palette.error.main,
            }}
            onClick={deleteProduct?.bind(null, product.id)}
          >
            <ClearOutlinedIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Box>
      )}
    </Grid>
  );
};

export default ProductItem;
