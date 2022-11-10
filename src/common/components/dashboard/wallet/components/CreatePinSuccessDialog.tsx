import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import CustomDialog from '../../../../elements/CustomDialog';
import Transition from '../../../../elements/Transition';
import CloseIcon from '@mui/icons-material/Close';
import CheckMarkCircleIcon from '../../../../elements/icons/CheckMarkCircleIcon';

interface CreatePinSuccessDialogProps {
  showDialog?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
}

const CreatePinSuccessDialog = (props: CreatePinSuccessDialogProps) => {
  const { showDialog = false, onClose, onConfirm } = props;

  return (
    <CustomDialog
      open={showDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      dialogwidth="567px"
      rootpaddinginline={6}
      rootpaddingblock={6}
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
      </DialogTitle>

      <DialogContent>
        <DialogContentText
          component="div"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <CheckMarkCircleIcon sx={{ fontSize: '80px', mb: 4 }} />

          <Typography
            variant="body2"
            fontWeight={500}
            align="center"
            sx={{ width: '350px' }}
            mb={4}
          >
            Your 4-digit transaction pin has been created successfully
          </Typography>
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          disableElevation
          onClick={onConfirm}
          variant="contained"
          sx={{ fontSize: '1rem' }}
        >
          Proceed to withdraw
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};

export default CreatePinSuccessDialog;
