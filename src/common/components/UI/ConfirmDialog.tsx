import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import CustomDialog from '../../elements/CustomDialog';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode } from 'react';
import LightButton from '../../elements/LightButton';
import { CustomDialogProp } from '../../../_types';
import Transition from '../../elements/Transition';

interface CommonDialogProps {
  title: string;
  showDialog?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  closeText?: string;
  confirmText?: string;
  confirmDanger?: boolean;
  confirmLoading?: boolean;
  centered?: boolean;
  dialogwidth?: CustomDialogProp['dialogwidth'];
  rootpaddingblock?: CustomDialogProp['rootpaddingblock'];
  rootpaddinginline?: CustomDialogProp['rootpaddinginline'];
}
interface MessageProps extends CommonDialogProps {
  message: string;
  component?: undefined;
}
interface ComponentProps extends CommonDialogProps {
  component: ReactNode;
  message?: undefined;
}

//Either you have a message or a component, not both.
type ConfirmDialogProps = MessageProps | ComponentProps;

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    title,
    message,
    component,
    showDialog = false,
    onClose,
    onConfirm,
    closeText = 'Cancel',
    confirmText = `Yes, I’m sure`,
    confirmDanger = false,
    confirmLoading = false,
    centered = false,
    dialogwidth = '567px',
    rootpaddingblock,
    rootpaddinginline,
  } = props;

  return (
    <CustomDialog
      open={showDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      dialogwidth={dialogwidth}
      rootpaddingblock={rootpaddingblock}
      rootpaddinginline={rootpaddinginline}
    >
      <DialogTitle component="div">
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h5"
          fontWeight={500}
          fontSize={'1rem'}
          lineHeight="24px"
          align={centered ? 'center' : 'left'}
        >
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent>
        {message && (
          <DialogContentText component="div">
            <Typography
              variant="details"
              align={centered ? 'center' : 'left'}
              component="div"
            >
              {message}
            </Typography>
          </DialogContentText>
        )}

        {component && <>{component}</>}
      </DialogContent>

      <DialogActions sx={{ justifyContent: centered ? 'center' : 'flex-end' }}>
        {onClose && (
          <LightButton
            disableElevation
            onClick={onClose}
            color="secondary"
            sx={{
              mr: 1,
            }}
          >
            {closeText}
          </LightButton>
        )}
        {onConfirm && (
          <LightButton
            loading={confirmLoading}
            onClick={onConfirm}
            color={`${confirmDanger ? 'error' : 'primary'}`}
          >
            {confirmText}
          </LightButton>
        )}
      </DialogActions>
    </CustomDialog>
  );
};

export default ConfirmDialog;
