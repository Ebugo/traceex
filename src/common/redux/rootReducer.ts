import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import serviceSlice from './slices/serviceSlice';
import productSlice from './slices/productSlice';
import storeFrontSlice from './slices/storeFrontSlice';
import customerSlice from './slices/customerSlice';
import orderSlice from './slices/orderSlice';
import businessSlice from './slices/businessSlice';
import dropDownSlice from './slices/dropDownSlice';
import walletSlice from './slices/walletSlice';
import settingsSlice from './slices/settingsSlice';
import teamSlice from './slices/teamSlice';
import invoiceSlice from './slices/invoiceSlice';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

const settingsPersistConfig = {
  key: 'settings',
  storage,
  keyPrefix: 'redux-',
};

const rootReducer = combineReducers({
  serviceSlice,
  productSlice,
  storeFrontSlice,
  customerSlice,
  orderSlice,
  businessSlice,
  dropDownSlice,
  walletSlice,
  settingsSlice: persistReducer(settingsPersistConfig, settingsSlice),
  teamSlice,
  invoiceSlice,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const configuredStore = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(thunk),
});

export { configuredStore };
