import { Box, Typography, Chip } from '@mui/material';
import { format } from 'date-fns';
import { FC } from 'react';
import { Invoice } from '../../../../../_types';
import { formatAsMoney } from '../../../../utils';
import CustomAccordion from '../../../UI/CustomAccordion';
import InvoiceItemTable from '../../invoices/components/InvoiceItemTable';

interface InvoiceAccordionProps {
  invoice: Invoice;
}

const InvoiceAccordion: FC<InvoiceAccordionProps> = ({ invoice }) => {
  return (
    <CustomAccordion
      title={
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ minWidth: '80%' }}
        >
          <Typography
            variant="details"
            fontWeight={500}
            fontSize="0.75rem"
            sx={{ color: (theme) => theme.palette.text.primary }}
          >
            Invoice #{invoice.id.slice(0, 6)}
          </Typography>

          <Typography
            variant="details"
            fontSize="0.75rem"
            sx={{ color: (theme) => theme.palette.secondary.main }}
          >
            {invoice
              ? format(
                  new Date(invoice?.created_at ?? ''),
                  'yyyy-MM-dd HH:mm:ss'
                )
              : ''}
          </Typography>

          <Typography
            variant="details"
            fontSize="0.75rem"
            sx={{ color: (theme) => theme.palette.text.primary }}
          >
            {formatAsMoney(invoice?.total ? +invoice.total : 0, true)}
          </Typography>

          <Typography
            variant="details"
            fontSize="0.75rem"
            sx={{ color: (theme) => theme.palette.text.primary }}
          >
            <Chip
              label={invoice.is_paid ? 'PAID' : 'UNPAID'}
              size="small"
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: (theme) =>
                  theme.palette[invoice.is_paid ? 'primary' : 'error'].main,
                backgroundColor: (theme) =>
                  theme.palette[invoice.is_paid ? 'primary' : 'error'].light,
                px: 1,
              }}
            />
          </Typography>
        </Box>
      }
      noBorderRadius={true}
      noInlineBorder={true}
      isExpanded={false}
    >
      {!!invoice?.invoice_item.length && (
        <InvoiceItemTable
          invoice={invoice}
          maxWidth="450px"
          abbreviateQty
          smallFont
        />
      )}
    </CustomAccordion>
  );
};

export default InvoiceAccordion;
