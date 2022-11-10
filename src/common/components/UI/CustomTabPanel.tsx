import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
  tabName: string;
  noPadding?: boolean;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, tabName, noPadding, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${tabName}-tabpanel-${index}`}
      aria-labelledby={`${tabName}-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ ...(!noPadding && { p: 2 }) }}>{children}</Box>
      )}
    </div>
  );
};

export default CustomTabPanel;
