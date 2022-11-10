import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import ErrorIcon from '@mui/icons-material/Error';

type ErrorHelperTextProps = {
  touched: boolean | undefined;
  errorMessage: string | undefined;
};

const ErrorHelperText: FC<ErrorHelperTextProps> = ({
  touched = false,
  errorMessage = '',
}) => {
  if (!touched) {
    return <></>;
  }

  if (!errorMessage) {
    return <></>;
  }

  return (
    <Grid container alignItems="center" component="span">
      <ErrorIcon sx={{ fontSize: '1rem', mr: 1 }} />
      <Typography
        variant="caption"
        color="error"
        sx={{ fontSize: '0.75rem', fontWeight: 400, lineHeight: '24px' }}
        component="span"
      >
        {errorMessage}
      </Typography>
    </Grid>
  );
};

export default ErrorHelperText;
