import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import UNPAID_INVOICES_ICON from '../../../../public/assets/icons/unpaid-invoices-icon.svg';

const UnpaidInvoicesIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={UNPAID_INVOICES_ICON}
      viewBox="0 0 24 24"
      titleAccess="Unpaid Invoices Icon"
    />
  );
};

export default UnpaidInvoicesIcon;
