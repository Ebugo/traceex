import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import CHECK_MARK_CIRCLE_ICON from '../../../../public/assets/icons/check-mark-cicle-icon.svg';

const CheckMarkCircleIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={CHECK_MARK_CIRCLE_ICON}
      viewBox="0 0 80 80"
      titleAccess="Check Mark Cicle Icon"
    />
  );
};

export default CheckMarkCircleIcon;
