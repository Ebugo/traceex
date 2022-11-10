import ActionBar from '../../UI/ActionBar';
import { Grid, Tabs } from '@mui/material';

import CustomTab from '../../../elements/CustomTab';

import { tabProps } from '../../../utils';
import useOrders from '../../../hooks/useOrders';
import OrderList from './components/OrderList';
import ConfirmPickupDialog from './components/ConfirmPickupDialog';
import useConfirmPickup from '../../../hooks/useConfirmPickup';
import useDeclinePickup from '../../../hooks/useDeclinePickup';
import DeclinePickupDialog from './components/DeclinePickupDialog';
import { OrderTypeEnum } from '../../../enums';
import CustomTabPanel from '../../UI/CustomTabPanel';

const TAB_NAME = 'orders';

const Orders = () => {
  const {
    addOrderHandler,
    setLoadingOrders,
    newOrders,
    upcomingOrders,
    ongoingOrders,
    completedOrders,
    viewOrderHandler,
    currentTab,
    handleTabChange,
    loadingOrders,
  } = useOrders();

  const {
    showConfirmPickupModalHandler,
    closeConfirmPickupModalHandler,
    showConfirmPickupModal,
    confirmPickupFormik,
  } = useConfirmPickup(setLoadingOrders);

  const {
    showDeclinePickupModal,
    showDeclinePickupModalHandler,
    closeDeclinePickupModalHandler,
    declinePickupFormik,
  } = useDeclinePickup(setLoadingOrders);

  return (
    <>
      {showConfirmPickupModal && (
        <ConfirmPickupDialog
          showDialog={showConfirmPickupModal}
          onCloseDialog={closeConfirmPickupModalHandler}
          confirmPickupFormik={confirmPickupFormik}
        />
      )}

      {showDeclinePickupModal && (
        <DeclinePickupDialog
          showDialog={showDeclinePickupModal}
          onCloseDialog={closeDeclinePickupModalHandler}
          declinePickupFormik={declinePickupFormik}
        />
      )}

      <ActionBar
        title="Orders"
        buttonText="Create new order"
        onButtonClick={addOrderHandler}
      />

      <Grid container px={4} mt={1} sx={{ width: '100%', maxWidth: '800px' }}>
        <Grid item xs={12}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="Order types"
            sx={{ borderBottom: '1px solid rgba(196, 196, 196, 0.2)', mb: 4 }}
          >
            <CustomTab label="New" {...tabProps(OrderTypeEnum.NEW, TAB_NAME)} />
            <CustomTab
              label="Upcoming"
              {...tabProps(OrderTypeEnum.UPCOMING, TAB_NAME)}
            />
            <CustomTab
              label="Ongoing"
              {...tabProps(OrderTypeEnum.ONGOING, TAB_NAME)}
            />
            <CustomTab
              label="Completed"
              {...tabProps(OrderTypeEnum.COMPLETED, TAB_NAME)}
            />
          </Tabs>

          <CustomTabPanel
            value={currentTab}
            index={OrderTypeEnum.NEW}
            tabName={TAB_NAME}
            noPadding
          >
            <OrderList
              orders={newOrders}
              showConfirmPickupModalHandler={showConfirmPickupModalHandler}
              showDeclinePickupModalHandler={showDeclinePickupModalHandler}
              loadingOrders={loadingOrders}
            />
          </CustomTabPanel>

          <CustomTabPanel
            value={currentTab}
            index={OrderTypeEnum.UPCOMING}
            tabName={TAB_NAME}
            noPadding
          >
            <OrderList
              orders={upcomingOrders}
              viewOrderHandler={viewOrderHandler}
              loadingOrders={loadingOrders}
            />
          </CustomTabPanel>

          <CustomTabPanel
            value={currentTab}
            index={OrderTypeEnum.ONGOING}
            tabName={TAB_NAME}
            noPadding
          >
            <OrderList
              orders={ongoingOrders}
              viewOrderHandler={viewOrderHandler}
              loadingOrders={loadingOrders}
            />
          </CustomTabPanel>

          <CustomTabPanel
            value={currentTab}
            index={OrderTypeEnum.COMPLETED}
            tabName={TAB_NAME}
            noPadding
          >
            <OrderList
              orders={completedOrders}
              viewOrderHandler={viewOrderHandler}
              loadingOrders={loadingOrders}
            />
          </CustomTabPanel>
        </Grid>
      </Grid>
    </>
  );
};

export default Orders;
