import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import RightArrow from '../../../../public/assets/icons/long-right-arrow.svg';

const LongRightArrowIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={RightArrow}
      viewBox="0 0 22 14"
      titleAccess="Right Arrow Icon"
    />
  );
};

export default LongRightArrowIcon;
