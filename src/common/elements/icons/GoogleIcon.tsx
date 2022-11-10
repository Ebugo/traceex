import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import GOOGLE_ICON from '../../../../public/assets/icons/google-icon.svg';

const GoogleIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={GOOGLE_ICON}
      viewBox="0 0 20 20"
      titleAccess="Google Icon"
      sx={{
        fill: 'transparent',
      }}
    />
  );
};

export default GoogleIcon;
