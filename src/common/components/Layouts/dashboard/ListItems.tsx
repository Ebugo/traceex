import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Zoom,
} from '@mui/material';

import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';
import DynamicHeroIcon from '../../../elements/icons/DynamicHeroIcon';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

import GroupIcon from '@mui/icons-material/Group';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

import StorefrontIcon from '@mui/icons-material/Storefront';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

import HelpIcon from '@mui/icons-material/Help';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

import styled from '@emotion/styled';
import ShoppingBagIcon from '../../../elements/icons/ShoppingBagIcon';

const listItemSx = { width: '18px', margin: 'unset' };

const listItem = [
  {
    name: 'Dashboard',
    link: '',
    icon: (active: boolean) => (
      <DynamicHeroIcon icon="AcademicCapIcon" solid={active} />
    ),
  },
  {
    name: 'Deposit',
    link: 'deposit/crypto',
    icon: (active: boolean) =>
      active ? (
        <ShoppingBagIcon sx={listItemSx} />
      ) : (
        <ShoppingBagIcon sx={listItemSx} />
      ),
  },
  {
    name: 'Withdraw',
    link: 'withdraw/crypto',
    icon: (active: boolean) => (
      <DynamicHeroIcon icon="TagIcon" solid={active} />
    ),
  },
  {
    name: 'Wallet',
    link: 'wallet',
    icon: (active: boolean) =>
      active ? (
        <AccountBalanceWalletIcon sx={listItemSx} />
      ) : (
        <AccountBalanceWalletOutlinedIcon sx={listItemSx} />
      ),
  },
  {
    name: 'Support',
    link: 'support',
    icon: (active: boolean) =>
      active ? (
        <HelpIcon sx={listItemSx} />
      ) : (
        <HelpOutlineOutlinedIcon sx={listItemSx} />
      ),
  },
  // {
  //   name: 'Settings',
  //   link: 'settings',
  //   icon: (active: boolean) => (
  //     <DynamicHeroIcon icon="CogIcon" solid={active} />
  //   ),
  // },
];

const ItemIcon = styled(ListItemIcon)(() => {
  return {
    justifyContent: 'center',
    alignItems: 'center',
  };
});

const NavListItems: FC<{ open: boolean }> = ({ open }) => {
  const router = useRouter();

  const onListItemClick = (link: string) => {
    router.push(`/dashboard/${link}`);
  };

  const isActiveLink = useCallback(
    (link: string) => {
      if (!link) {
        return (
          router.pathname === '/dashboard' ||
          router.pathname.includes('/dashboard/getting-started')
        );
      }

      return router.pathname.includes(`/dashboard/${link}`);
    },
    [router.pathname]
  );

  return (
    <>
      {listItem.map((item, index) => (
        <ListItemButton
          onClick={onListItemClick.bind(null, item.link)}
          key={index}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            borderRadius: '0.5rem',
            py: 1.5,
            px: 0,
            mx: 0,
            color: (theme) => theme.palette.text.secondary,
            ...(!open && { ml: 0.5, maxWidth: '57px' }),
            ...(isActiveLink(item.link) && {
              fontWeight: 500,
              color: '#111111',
            }),
            '&:hover': {
              ...(isActiveLink(item.link) && open
                ? { backgroundColor: (theme) => theme.palette.common.white }
                : { backgroundColor: 'unset' }),
            },
          }}
        >
          {open ? (
            <ItemIcon>{item.icon(isActiveLink(item.link))}</ItemIcon>
          ) : (
            <Tooltip
              title={item.name}
              placement="right"
              TransitionComponent={Zoom}
              arrow
            >
              <ItemIcon>{item.icon(isActiveLink(item.link))}</ItemIcon>
            </Tooltip>
          )}

          <ListItemText
            disableTypography
            primary={item.name}
            sx={{
              opacity: open ? 1 : 0,
              ...(open && { flex: 'initial', pr: 1 }),
            }}
          />
        </ListItemButton>
      ))}
    </>
  );
};

export default NavListItems;
