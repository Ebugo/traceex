import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import customerSlice from './slices/customerSlice';
import businessSlice from './slices/businessSlice';
import dropDownSlice from './slices/dropDownSlice';
import walletSlice from './slices/walletSlice';
import settingsSlice from './slices/settingsSlice';

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
  customerSlice,
  businessSlice,
  dropDownSlice,
  walletSlice,
  settingsSlice: persistReducer(settingsPersistConfig, settingsSlice),
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
