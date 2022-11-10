import { DialogProps } from '@mui/material';
import { CSSProperties } from '@mui/styled-engine';

export interface CustomDialogProp extends DialogProps {
  dialogwidth?: CSSProperties['width'];
  rootpaddingblock?: number;
  rootpaddinginline?: number;
  titlemarginbottom?: number;
}
