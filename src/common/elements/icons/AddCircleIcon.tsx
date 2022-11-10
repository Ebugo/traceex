import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import ADD_CIRCLE_ICON from '../../../../public/assets/icons/add-circle-icon.svg';

const AddCircleIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={ADD_CIRCLE_ICON}
      viewBox="0 0 24 24"
      titleAccess="Add Circle Icon"
      sx={{
        fill: 'transparent',
      }}
    />
  );
};

export default AddCircleIcon;
