import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import FB_ICON from '../../../../public/assets/icons/fb-icon.svg';

const FbIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={FB_ICON}
      viewBox="0 0 20 20"
      titleAccess="FB Icon"
      sx={{
        fill: 'transparent',
      }}
    />
  );
};

export default FbIcon;
