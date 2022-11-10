import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import SHOPPING_BAG_ICON from '../../../../public/assets/icons/shopping-bag-icon.svg';

const ShoppingBagIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={SHOPPING_BAG_ICON}
      viewBox="0 0 24 24"
      titleAccess="Shopping Bag Icon"
    />
  );
};

export default ShoppingBagIcon;
