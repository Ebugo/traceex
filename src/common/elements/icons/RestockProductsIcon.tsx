import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import UNPAID_INVOICES_ICON from '../../../../public/assets/icons/restock-products-icon.svg';

const RestockProductsIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={UNPAID_INVOICES_ICON}
      viewBox="0 0 24 24"
      titleAccess="Unpaid Invoices Icon"
    />
  );
};

export default RestockProductsIcon;
