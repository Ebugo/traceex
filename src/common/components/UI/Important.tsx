import React from 'react';
import { Typography } from '@mui/material';

const Important = () => {
  return (
    <Typography
      component="span"
      sx={{ color: (theme) => theme.palette.error.main, fontSize: 'inherit' }}
    >
      *
    </Typography>
  );
};

export default Important;
