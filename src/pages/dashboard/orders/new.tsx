import DashboardLayout from '../../../common/components/Layouts/dashboard/DashboardLayout';
import NewOrder from '../../../common/components/dashboard/orders/NewOrder';

const NewOrderPage = () => {
  return (
    <DashboardLayout lightBackground>
      <NewOrder />
    </DashboardLayout>
  );
};

export default NewOrderPage;
