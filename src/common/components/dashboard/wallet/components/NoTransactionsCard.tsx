import { Grid, Typography } from '@mui/material';
import React from 'react';

const NoTransactionsCard = () => {
  return (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '200px' }}
    >
      <Typography variant="details" align="center">
        No Transactions yet
      </Typography>
    </Grid>
  );
};

export default NoTransactionsCard;
