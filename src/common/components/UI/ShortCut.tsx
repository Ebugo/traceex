import {
  ClickAwayListener,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState, useMemo } from 'react';
import LightTooltip from '../../elements/LightToolTip';
import { useRouter } from 'next/router';

const ShortCut = () => {
  const router = useRouter();
  const [openAccountMenu, setOpenAccountMenu] = useState(false);

  const handleTooltipOpen = () => {
    setOpenAccountMenu(true);
  };

  const handleTooltipClose = () => {
    setOpenAccountMenu(false);
  };

  const shortCuts = useMemo(() => {
    return [
      { title: 'Customer', onClick: () => router.push('/dashboard/customers') },
      { title: 'Team', onClick: () => router.push('/dashboard/teams') },
      { title: 'Service', onClick: () => router.push('/dashboard/services') },
      { title: 'Product', onClick: () => router.push('/dashboard/products') },
    ];
  }, [router]);

  return (
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
            <List sx={{ width: '232px' }}>
              {shortCuts.map((item, index) => (
                <ListItem
                  key={index}
                  onClick={item.onClick}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      color: (theme) => theme.palette.text.secondary,
                    }}
                  />
                </ListItem>
              ))}
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
            <AddIcon fontSize="inherit" />
          </IconButton>
        </LightTooltip>
      </div>
    </ClickAwayListener>
  );
};

export default ShortCut;
