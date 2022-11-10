import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

// Hook
const useCustomMediaQuery = () => {
  const theme = useTheme();

  return {
    extraSmall: useMediaQuery(theme.breakpoints.up('xs')),
    small: useMediaQuery(theme.breakpoints.up('sm')),
    medium: useMediaQuery(theme.breakpoints.up('md')),
    large: useMediaQuery(theme.breakpoints.up('lg')),
    extraLarge: useMediaQuery(theme.breakpoints.up('xl')),
  };
};

export default useCustomMediaQuery;
