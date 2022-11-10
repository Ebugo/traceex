import { Grid, List } from '@mui/material';
import OnboardingStepsItem from './OnboardingStepsItem';
import { FC, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelector, RootState } from '../../../../redux/store';
import useBusinessForm from '../../../../hooks/useBusinessForm';
import OnboardingDialog from './OnboardingDialog';
import AboutBusiness from '../AboutBusiness';

interface OnboardingStepsProps {
  showActionButton?: boolean;
  fetchingBusinessMetrics?: boolean;
}

const OnboardingSteps: FC<OnboardingStepsProps> = ({
  fetchingBusinessMetrics = false,
}) => {
  const router = useRouter();
  const { showDialog: showBusinessDialog, closeBusinessDialogHandler } = useBusinessForm();

  const { metrics } = useSelector((state: RootState) => state.businessSlice);

  const quickTaskLists = useMemo(
    () => [
      {
        title: 'Business Details',
        subtitle:
          'Add business information - your business address, contact info, set your preferences.',
        completed: metrics?.hasCompleteBusiness ?? false,
        onClick: () => {
          router.push({
            pathname: '/dashboard',
            query: { showModal: 'update-business' }
          });
        },
      },
      // {
      //   title: 'Add service(s)',
      //   subtitle:
      //     'Don’t start empty, begin adding your services into database.',
      //   completed: metrics?.hasServices ?? false,
      //   onClick: () => {
      //     router.push({
      //       pathname: '/dashboard/services',
      //       query: { showModal: true },
      //     });
      //   },
      // },
      {
        title: 'Add product(s)',
        subtitle:
          'Upload your products - create a product, or bulk upload products  easily.',
        completed: metrics?.hasProducts ?? false,
        onClick: () => {
          router.push({
            pathname: '/dashboard/products',
            query: { showModal: 'add-product' },
          });
        },
      },
      {
        title: 'Customers Upload',
        subtitle:
          'Import your customers using our easy to use template or create new customers instantly.',
        completed: metrics?.hasProducts ?? false,
        onClick: () => {
          router.push({
            pathname: '#',
          });
        },
      },
      {
        title: 'Website Setup',
        subtitle: 'Create your free website - customize your domain name, business logo, color and start selling online.',
        completed: metrics?.hasStorefront ?? false,
        onClick: () => {
          router.push({
            pathname: '/dashboard/storefront',
            query: { showModal: true },
          });
        },
      },
      {
        title: 'Add Team',
        subtitle:
          'Send invite links to your staff(s) to join your account. Set preferred permissions for each staff.',
        completed: metrics?.hasProducts ?? false,
        onClick: () => {
          router.push({
            pathname: '#',
          });
        },
      },
      {
        title: 'Complete First Order/Sale',
        subtitle:
          'Create an order, send to your customer and get paid. (Get N200 cashback on every payment collect in your first 30days).',
        completed: metrics?.hasProducts ?? false,
        onClick: () => {
          router.push({
            pathname: '#',
          });
        },
      },
    ],
    [
      metrics?.hasCompleteBusiness,
      metrics?.hasProducts,
      metrics?.hasServices,
      metrics?.hasStorefront,
      router,
    ]
  );

  return (
    <>
      {showBusinessDialog && (
        <OnboardingDialog
          showDialog={showBusinessDialog}
          onCloseDialog={closeBusinessDialogHandler}
        >
          <AboutBusiness />
        </OnboardingDialog>
      )}

      <Grid container mt={2}>
        <Grid item xs={12}>
          <List>
            {quickTaskLists.map((item, index) => {
              if (!item?.completed) {
                return (
                  <OnboardingStepsItem
                    key={index}
                    title={item.title}
                    subtitle={item.subtitle}
                    completed={item.completed}
                    onClick={item.onClick.bind(null)}
                    fetchingBusinessMetrics={fetchingBusinessMetrics}
                  />
                )
              }
            }
            )}
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default OnboardingSteps;
