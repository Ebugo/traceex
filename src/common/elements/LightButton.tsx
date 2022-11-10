import { styled } from '@mui/material';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { ElementType } from 'react';

type LightButtonProps = Omit<LoadingButtonProps, 'color'> & {
  color?: 'primary' | 'error' | 'secondary';
  component?: ElementType;
};

const LightButton = styled(LoadingButton, {
  shouldForwardProp: (prop) => prop !== 'color',
})<LightButtonProps>(({ theme, color = 'primary' }) => ({
  padding: '12px 32px',
  borderRadius: '6px',
  fontSize: '0.75rem',
  height: '36px',
  backgroundColor: theme.palette[color].light,
  color: theme.palette[color].main,
  minWidth: '95px',
}));

export default LightButton;
