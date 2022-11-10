import {
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CustomDialog from '../../../../elements/CustomDialog';
import { FC } from 'react';

interface OnboardingDialogProps {
  showDialog: boolean;
  onCloseDialog: () => void;
  children: any;
  title?: string
}

const OnboardingDialog: FC<OnboardingDialogProps> = ({
  showDialog = false,
  onCloseDialog,
  children,
  title
}) => {

  const handleClose = () => {
    onCloseDialog();
  };

  return (
    <CustomDialog open={showDialog}>
          <DialogTitle component="div">
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            {children}
          </DialogContent>
    </CustomDialog>
  );
};

export default OnboardingDialog;
