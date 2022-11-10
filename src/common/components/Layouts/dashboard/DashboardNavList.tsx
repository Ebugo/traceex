import List from '@mui/material/List';

import Grid from '@mui/material/Grid';

import NavListItems from './ListItems';
import RoleToggleButton from './RoleToggleButton';

import { FC } from 'react';

const DashboardNavList: FC<{ open: boolean }> = ({ open }) => {
  return (
    <>
      <List
        sx={{
          fontSize: '0.875rem',
          fontWeight: 400,
          backgroundColor: (theme) => theme.palette.background.paper,
          pt: 4,
        }}
      >
        <Grid
          container
          direction="column"
          sx={{
            minHeight: `calc(100vh - 95px)`,
          }}
          justifyContent="space-between"
        >
          <Grid item>
            <NavListItems open={open} />
          </Grid>

          {/* {open && (
            <Grid item mx={3}>
              <RoleToggleButton />
            </Grid>
          )} */}
        </Grid>
      </List>
    </>
  );
};

export default DashboardNavList;
