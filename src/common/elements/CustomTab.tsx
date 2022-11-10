import styled from '@emotion/styled';
import { Tab } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface StyledTabProps {
  label: string;
  id: string;
  'aria-controls': string;
}

const CustomTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  paddingInline: 'unset',
  minWidth: 'unset',
  marginRight: (theme as Theme).spacing(6),
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 400,
  '&.Mui-selected': {
    fontWeight: 500,
  },
}));

export default CustomTab;
