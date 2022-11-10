import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import SEARCH_NORMAL_ICON from '../../../../public/assets/icons/search-normal-icon.svg';

const SearchNormalIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={SEARCH_NORMAL_ICON}
      viewBox="0 0 24 24"
      titleAccess="Search Icon"
      sx={{ fill: 'transparent', ...props.sx }}
    />
  );
};

export default SearchNormalIcon;
