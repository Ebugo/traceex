import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import NOTIFICATION_ICON from '../../../../public/assets/icons/notification-icon.svg';

const NotificationIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={NOTIFICATION_ICON}
      viewBox="0 0 24 24"
      titleAccess="Notification Icon"
    />
  );
};

export default NotificationIcon;
