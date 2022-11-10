import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import MuiDrawer from '@mui/material/Drawer';

import { styled, Theme, CSSObject } from '@mui/material/styles';

import DashboardNavList from './DashboardNavList';
import { DRAWER_WIDTH } from '../../../constants';
import { dispatch, RootState, useSelector } from '../../../redux/store';
import { setingsActions } from '../../../redux/slices/settingsSlice';

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: theme.palette.background.paper,
  '::-webkit-scrollbar': {
    width: '4px',
  },
  '::-webkit-scrollbar-thumb': {
    background: '#80868B',
    borderRadius: '100px',
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: theme.palette.background.paper,
  '::-webkit-scrollbar': {
    width: '4px',
  },
  '::-webkit-scrollbar-thumb': {
    background: '#80868B',
    borderRadius: '100px',
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const SideDrawer = () => {
  const { miniNav } = useSelector((state: RootState) => state.settingsSlice);
  const open = !miniNav;

  const toggleDrawer = () => {
    // setOpen((open: boolean) => !open);

    dispatch(setingsActions.toggleMiniNav());
  };

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <IconButton
          onClick={toggleDrawer}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.common.white,
            alignSelf: 'flex-end',
            marginRight: '-15px',
            fontSize: '0.625rem',
            width: '30px',
            height: '30px',
            position: 'inherit',
            zIndex: 'inherit',
            marginBlockStart: 5,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.primary.main,
            },
          }}
        >
          {open ? (
            <ChevronLeftIcon sx={{ width: '18px' }} />
          ) : (
            <ChevronRightIcon sx={{ width: '18px' }} />
          )}
        </IconButton>

        <DashboardNavList open={open} />
      </Drawer>
    </>
  );
};

export default SideDrawer;
