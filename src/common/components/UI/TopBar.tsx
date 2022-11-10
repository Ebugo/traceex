import { Stack } from '@mui/material';

import MyAccount from './MyAccount';
import ShortCut from './ShortCut';
import Notification from './Notification';
import BackButton from '../../elements/BackButton';

const TopBar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={4}
      py={1}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        border: '1px solid rgba(196, 196, 196, 0.2)',
      }}
    >
      <BackButton />

      <Stack direction="row" alignItems="center">
        {/* <ShortCut /> */}

        <Notification />

        <MyAccount />
      </Stack>
    </Stack>
  );
};

export default TopBar;
