import type { NextPage } from 'next';
import DashboardLayout from '../../common/components/Layouts/dashboard/DashboardLayout';
import Home from '../../common/components/dashboard/home/Home';

const HomePage: NextPage = () => {
  return (
    <DashboardLayout>
      <Home />
    </DashboardLayout>
  );
};

export default HomePage;
