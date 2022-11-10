import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import UPLOAD_IMAGE from '../../../../public/assets/icons/upload-image-icon.svg';

const UploadImageIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={UPLOAD_IMAGE}
      viewBox="0 0 32 32"
      titleAccess="Upload Image Icon"
    />
  );
};

export default UploadImageIcon;
