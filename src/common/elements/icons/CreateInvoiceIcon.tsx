import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import CREATE_INVOICE_ICON from '../../../../public/assets/icons/create-invoice-icon.svg';

const CreateInvoiceIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      component={CREATE_INVOICE_ICON}
      viewBox="0 0 24 24"
      titleAccess="Create Invoice Icon"
    />
  );
};

export default CreateInvoiceIcon;
