import { Typography, Stack, Button, Box } from '@mui/material';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { OrderForm } from '../../../../../_types';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { formatAsMoney } from '../../../../utils';

interface DeliveryFeeGridProps {
  orderFormik: FormikProps<OrderForm>;
  showDeliveryDialogHandler: () => void;
  fromInvoice?: boolean;
}

const DeliveryFeeGrid: FC<DeliveryFeeGridProps> = ({
  orderFormik,
  showDeliveryDialogHandler,
  fromInvoice = false,
}) => {
  const { values, setFieldValue } = orderFormik;

  return (
    <Stack
      display="flex"
      mt={2}
      sx={{
        ...(fromInvoice && {
          backgroundColor: (theme) => theme.palette.common.white,
          p: 2,
        }),
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="details"
          fontWeight={500}
          sx={{ color: (theme) => theme.palette.text.primary, mb: 1 }}
          component="div"
        >
          Delivery fees (optional)
        </Typography>

        {values.delivery_fee && values.delivery_type && (
          <Stack direction="row" justifyContent="flex-end">
            <Button
              size="small"
              sx={{
                px: 0,
                mr: 1,
                '&:hover': {
                  backgroundColor: 'unset',
                },
              }}
              color={fromInvoice ? 'warning' : 'primary'}
              onClick={showDeliveryDialogHandler}
            >
              {fromInvoice ? 'Edit' : 'Change'}
            </Button>

            {!fromInvoice && (
              <Button
                size="small"
                color="error"
                sx={{
                  px: 0,
                  '&:hover': {
                    backgroundColor: 'unset',
                  },
                }}
                onClick={() => {
                  setFieldValue('delivery_fee', null);
                  setFieldValue('delivery_type', null);
                }}
              >
                Cancel
              </Button>
            )}
          </Stack>
        )}
      </Box>

      {!(values.delivery_fee && values.delivery_type) && (
        <Box>
          <Typography
            variant="details"
            sx={{ color: (theme) => theme.palette.secondary.main, mb: 1 }}
            component="div"
          >
            Enter a custom delivery fee you would want to charge this customer
          </Typography>

          <Button
            startIcon={<AddOutlinedIcon />}
            size="small"
            color="warning"
            sx={{
              px: 0,
              '&:hover': {
                backgroundColor: 'unset',
              },
            }}
            onClick={showDeliveryDialogHandler}
          >
            Add delivery fee
          </Button>
        </Box>
      )}

      {values.delivery_fee && values.delivery_type && (
        <Box
          display="flex"
          justifyContent={fromInvoice ? 'flex-start' : 'space-between'}
        >
          <Typography
            variant="details"
            sx={{
              color: (theme) => theme.palette.secondary.main,
              ...(fromInvoice && {
                pr: 3,
              }),
            }}
            component="div"
          >
            Fees ({values.delivery_type})
          </Typography>

          <Typography variant="details" component="div" fontWeight={500}>
            {formatAsMoney(+values.delivery_fee)}
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

export default DeliveryFeeGrid;
