import { Box, Chip, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { OrderForm, Product } from '../../../../../_types';
import { formatAsMoney, sentenceCase } from '../../../../utils';
import CustomAccordion from '../../../UI/CustomAccordion';

interface InvoiceSummaryProps {
  products: Array<Product & { quantity: number }>;
  deliveryType: OrderForm['delivery_type'];
  deliveryFee: OrderForm['delivery_fee'];
  totalAmount: number;
}
const InvoiceSummary: FC<InvoiceSummaryProps> = ({
  products,
  deliveryType,
  deliveryFee,
  totalAmount,
}) => {
  return (
    <Grid container sx={{ width: '100%', maxWidth: '796px' }}>
      <Grid
        item
        xs={12}
        container
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="details">Date created: 19 Mar, 2022</Typography>

        <Box>
          <Typography variant="details" mr={1}>
            Status:
          </Typography>

          <Chip
            label="UNPAID"
            size="small"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: (theme) => theme.palette.error.main,
              backgroundColor: (theme) => theme.palette.error.light,
              px: 1,
            }}
          />
        </Box>
      </Grid>

      <CustomAccordion
        title="Order details"
        noBorderRadius
        noInlineBorder
        noBlockBorder
        isExpanded
        padding={0}
      >
        <Grid
          container
          mt={2}
          py={3}
          px={4}
          sx={{
            backgroundColor: '#FEF6E9',
          }}
        >
          <Grid item xs={12} container justifyContent="space-between" mb={2}>
            <Typography variant="details" fontWeight={500}>
              Items
            </Typography>
            <Typography
              variant="details"
              fontWeight={500}
              sx={{
                color: '#12362A',
              }}
            >
              Price
            </Typography>
          </Grid>

          {products.map((product) => (
            <Grid
              item
              xs={12}
              container
              justifyContent="space-between"
              key={product.id}
              mb={2}
            >
              <Typography variant="details">
                {sentenceCase(product.name)}
              </Typography>

              <Typography
                variant="details"
                fontWeight={500}
                sx={{
                  color: '#12362A',
                }}
              >
                {formatAsMoney(+product.price * product.quantity, true)}
              </Typography>
            </Grid>
          ))}

          {deliveryType && deliveryFee && (
            <Grid item xs={12} container justifyContent="space-between" mb={2}>
              <Typography variant="details">Fees ({deliveryType})</Typography>

              <Typography
                variant="details"
                fontWeight={500}
                sx={{
                  color: '#12362A',
                }}
              >
                {formatAsMoney(+deliveryFee ?? 0, true)}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12} container justifyContent="space-between" mt={1}>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ color: '#12362A' }}
            >
              Total
            </Typography>

            <Typography
              variant="body2"
              fontWeight={600}
              sx={{
                color: '#12362A',
              }}
            >
              {formatAsMoney(totalAmount)}
            </Typography>
          </Grid>
        </Grid>
      </CustomAccordion>
    </Grid>
  );
};

export default InvoiceSummary;
