import {
  ClickAwayListener,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Avatar,
} from '@mui/material';
import { useState } from 'react';
import LightTooltip from '../../elements/LightToolTip';
import { useAuth } from '../../contexts/auth-context';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ConfirmDialog from './ConfirmDialog';
import { useRouter } from 'next/router';

const MyAccount = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const [openAccountMenu, setOpenAccountMenu] = useState(false);

  const [showDialog, setShowDialog] = useState(false);

  const handleTooltipOpen = () => {
    setOpenAccountMenu(true);
  };

  const handleTooltipClose = () => {
    setOpenAccountMenu(false);
  };

  return (
    <>
      {showDialog && (
        <ConfirmDialog
          showDialog={showDialog}
          title="Are you sure?"
          message="You are about to log out from your account"
          confirmText="Yes, Log out"
          confirmDanger
          onClose={() => setShowDialog(false)}
          onConfirm={logout}
          centered
          dialogwidth="467px"
          rootpaddingblock={8}
          rootpaddinginline={8}
        />
      )}

      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <LightTooltip
            open={openAccountMenu}
            onClose={handleTooltipClose}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            placement="bottom-end"
            arrow
            title={
              <List>
                <ListItem
                  secondaryAction={
                    <ArrowForwardIosOutlinedIcon
                      sx={{
                        color: (theme) => theme.palette.text.secondary,
                        fontSize: '0.875rem',
                      }}
                    />
                  }
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <ListItemText
                    primary="My Account"
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      color: (theme) => theme.palette.text.secondary,
                      pr: 10,
                    }}
                    onClick={() => router.push('/dashboard/account')}
                  />
                </ListItem>

                <ListItem
                  secondaryAction={
                    <LogoutOutlinedIcon
                      sx={{
                        color: (theme) => theme.palette.error.main,
                        fontSize: '0.875rem',
                      }}
                    />
                  }
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowDialog(true)}
                >
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      color: (theme) => theme.palette.error.main,
                      pr: 10,
                    }}
                  />
                </ListItem>
              </List>
            }
          >
            <IconButton
              size="small"
              sx={{
                ml: 2,
                backgroundColor: (theme) => theme.palette.secondary.light,
              }}
              onClick={handleTooltipOpen}
            >
              <Avatar
                alt="User Avatar"
                src="../../../../../../assets/sample-avatar.png"
                sx={{ width: 30, height: 30 }}
              />
            </IconButton>
          </LightTooltip>
        </div>
      </ClickAwayListener>
    </>
  );
};

export default MyAccount;
