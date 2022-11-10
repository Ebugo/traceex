import { Grid, List, Typography } from '@mui/material';
import CreateInvoiceIcon from '../../../../elements/icons/CreateInvoiceIcon';
import CreateNewOrderIcon from '../../../../elements/icons/CreateNewOrderIcon';
import UnpaidInvoicesIcon from '../../../../elements/icons/UnpaidInvoicesIcon';
import QuickTaskItem from './QuickTaskItem';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import RestockProductsIcon from '../../../../elements/icons/RestockProductsIcon';
import ShoppingBagIcon from '../../../../elements/icons/ShoppingBagIcon';
import DynamicHeroIcon from '../../../../elements/icons/DynamicHeroIcon';

const QuickTasks = () => {
  const router = useRouter();

  const quickTaskLists = useMemo(
    () => [
      {
        title: 'Deposit',
        icon: <ShoppingBagIcon />,
        onClick: () => router.push('/dashboard/deposit/crypto'),
      },
      {
        title: 'Withdraw',
        icon: <DynamicHeroIcon icon="TagIcon" />,
        onClick: () => router.push('/dashboard/withdraw/crypto'),
      },
      // {
      //   title: 'Unpaid Invoices',
      //   icon: <UnpaidInvoicesIcon />,
      //   onClick: () => router.push('/dashboard/invoices'),
      // },
      // {
      //   title: 'Restock products',
      //   icon: <RestockProductsIcon />,
      //   onClick: () => router.push('/dashboard/products?showModal=add-product'),
      // },
    ],
    [router]
  );

  return (
    <Grid container p={3}>
      <Grid item xs={12} mb={4}>
        <Typography variant="h5" component="div" gutterBottom>
          Quick Tasks
        </Typography>
      </Grid>

      <Grid item sx={{ width: '100%', maxWidth: '747px' }}>
        <List
          sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            p: 1,
          }}
        >
          {quickTaskLists.map((item, index) => (
            <QuickTaskItem
              key={index}
              title={item.title}
              icon={item.icon}
              onClick={item.onClick.bind(null)}
              isLast={index === quickTaskLists.length - 1}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default QuickTasks;
