import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import RightArrow from '../../../../public/assets/icons/email-verification.svg';

const EmailVerificationIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={RightArrow}
      viewBox="0 0 129 129"
      titleAccess="Verify Email Icon"
    />
  );
};

export default EmailVerificationIcon;
