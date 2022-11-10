import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import TRASH_OUTLINED_ICON from '../../../../public/assets/icons/trash-outlined-icon.svg';

const TrashOutlinedIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={TRASH_OUTLINED_ICON}
      viewBox="0 0 24 24"
      titleAccess="Trash Outlined Icon"
    />
  );
};

export default TrashOutlinedIcon;
