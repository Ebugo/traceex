import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Grid, Skeleton } from '@mui/material';
import CustomDialog from '../../../../elements/CustomDialog';
import { FC } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import useCustomer from '../../../../hooks/useCustomer';
import { joinStrings } from '../../../../utils';
import { DispatchSetCustomer, OrderForm } from '../../../../../_types';
import { FormikErrors } from 'formik';
import SearchField from '../../../UI/SearchField';

interface SelectCustomerDialogProps {
  showDialog: boolean;
  onCloseDialog: () => void;
  setSelectedCustomer: DispatchSetCustomer;
  showNewCustomerDialog: () => void;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<OrderForm>>;
  values: OrderForm;
}

const SelectCustomerDialog: FC<SelectCustomerDialogProps> = ({
  showDialog = false,
  onCloseDialog,
  setSelectedCustomer,
  showNewCustomerDialog,
  setFieldValue,
  values,
}) => {
  const { filteredCustomers, loadingData } = useCustomer();

  return (
    <CustomDialog open={showDialog} rootpaddingblock={8} rootpaddinginline={4}>
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

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
          px={4}
        >
          <Typography variant="h5" fontWeight={600}>
            Select Customer
          </Typography>

          <Button
            startIcon={<AddOutlinedIcon />}
            size="medium"
            sx={{
              mx: 0,
              px: 0,
              '&:hover': {
                backgroundColor: 'unset',
              },
            }}
            onClick={() => {
              onCloseDialog();

              showNewCustomerDialog();
            }}
          >
            New Customer
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container px={4}>
          <Grid item xs={12} mb={2}>
            <SearchField
              placeholder="Search by phone number or name"
              fullWidth
            />
          </Grid>

          {!loadingData &&
            filteredCustomers.length > 0 &&
            filteredCustomers.map((customer) => (
              <Grid item xs={12} key={customer.id}>
                <Typography
                  variant="body1"
                  color="primary"
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
                  }}
                  onClick={() => {
                    setFieldValue('customer', customer.id);

                    if (
                      values.is_pickup &&
                      !values.pickup_address &&
                      customer?.address
                    ) {
                      setFieldValue('pickup_address', customer?.address);
                    }

                    setSelectedCustomer(customer);

                    onCloseDialog();
                  }}
                >
                  {joinStrings(customer.first_name, customer?.last_name ?? '')}
                </Typography>
              </Grid>
            ))}

          {loadingData &&
            [...Array(6)].map((e, index) => (
              <Skeleton key={index} sx={{ width: '100%', height: '70px' }} />
            ))}
        </Grid>
      </DialogContent>
    </CustomDialog>
  );
};

export default SelectCustomerDialog;
