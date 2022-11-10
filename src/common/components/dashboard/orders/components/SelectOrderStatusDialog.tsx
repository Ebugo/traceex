import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material';
import CustomDialog from '../../../../elements/CustomDialog';
import { FC } from 'react';
import { OrderStatus } from '../../../../../_types';
import { LoadingButton } from '@mui/lab';

const orderStatusOptions = [
  {
    label: 'Created',
    value: 'CREATED',
  },
  {
    label: 'Accepted',
    value: 'ACCEPTED',
  },
  {
    label: 'Scheduled',
    value: 'SCHEDULED',
  },
  {
    label: 'In-store',
    value: 'IN STORE',
  },
  {
    label: 'Processing',
    value: 'PROCESSING',
  },
  {
    label: 'Delivery',
    value: 'DELIVERY',
  },
  {
    label: 'Completed',
    value: 'COMPLETED',
  },
];
interface SelectOrderStatusDialogProps {
  showDialog: boolean;
  onCloseDialog: () => void;
  currentStatus: OrderStatus;
  updateOrderStatusHandler: (orderStatus: OrderStatus) => void;
  updatingOrderStatus: boolean;
}

const SelectOrderStatusDialog: FC<SelectOrderStatusDialogProps> = ({
  showDialog = false,
  onCloseDialog,
  currentStatus,
  updateOrderStatusHandler,
  updatingOrderStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const statusLabel =
    orderStatusOptions.find(({ value }) => value === selectedStatus)?.label ??
    '';

  const changeOrderStatusHandler = (newStatus: OrderStatus) => {
    setSelectedStatus(newStatus);
  };

  const setOrderStatusHandler = async () => {
    await updateOrderStatusHandler(selectedStatus);
    onCloseDialog();
  };

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

        <Typography variant="h5" fontWeight={600} sx={{ px: 4 }}>
          Select Order Status
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Grid container px={4}>
          {orderStatusOptions.map((orderStatus, index) => (
            <Grid
              item
              xs={12}
              key={index}
              sx={{
                borderColor: (theme) =>
                  theme.palette[
                    selectedStatus === orderStatus?.value
                      ? 'primary'
                      : 'secondary'
                  ].main,
                borderStyle: 'solid',
                borderWidth: '2px',
                borderRadius: '8px',
                paddingInline: '16px',
                cursor: 'pointer',
                marginBottom: '12px',
                height: '58px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onClick={changeOrderStatusHandler.bind(
                null,
                orderStatus.value as OrderStatus
              )}
            >
              <Typography
                align="center"
                variant="details"
                component="button"
                sx={{
                  background: 'none',
                  border: 'unset',
                  cursor: 'pointer',
                  color: (theme) =>
                    theme.palette[
                      selectedStatus === orderStatus?.value
                        ? 'primary'
                        : 'secondary'
                    ].main,
                  width: '100%',
                }}
              >
                {orderStatus.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Grid container px={4} justifyContent="flex-end">
          <LoadingButton
            disableElevation
            loading={updatingOrderStatus}
            variant="contained"
            sx={{
              minWidth: '252px',
              fontSize: '1rem',
              fontWeight: 500,
              height: '54px',
              padding: '12px 32px',
            }}
            onClick={setOrderStatusHandler}
          >
            Set status to {`"${statusLabel}"`}
          </LoadingButton>
        </Grid>
      </DialogActions>
    </CustomDialog>
  );
};

export default SelectOrderStatusDialog;
