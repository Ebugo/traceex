import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import ICON from '../../../../public/assets/icons/mail-icon.svg';

const MailIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={ICON}
      viewBox="0 0 20 20"
      titleAccess="Mail Icon"
    />
  );
};

export default MailIcon;
