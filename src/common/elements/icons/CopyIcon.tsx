import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import COPY_ICON from '../../../../public/assets/icons/copy-icon.svg';

const CopyIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={COPY_ICON}
      viewBox="0 0 24 24"
      titleAccess="Copy Icon"
    />
  );
};

export default CopyIcon;
