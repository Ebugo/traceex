import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import CREATE_NEW_ORDER_ICON from '../../../../public/assets/icons/create-new-order-icon.svg';

const CreateNewOrderIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={CREATE_NEW_ORDER_ICON}
      viewBox="0 0 24 24"
      titleAccess="Create New Order Icon"
    />
  );
};

export default CreateNewOrderIcon;
