import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import RIGHT_ARROW_CIRCLE_ICON from '../../../../public/assets/icons/right-arrow-circle-icon.svg';

const RightArrowCircleIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={RIGHT_ARROW_CIRCLE_ICON}
      viewBox="0 0 24 24"
      titleAccess="Right Arrow Circle Icon"
      sx={{
        fill: 'transparent',
      }}
    />
  );
};

export default RightArrowCircleIcon;
