import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import ThemeConfiguration from '../common/theme/ThemeConfiguration';
import { Provider as ReduxProvider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from '../common/contexts/auth-context';
import { persistor, store } from '../common/redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import PageLoading from '../common/components/UI/PageLoading';

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window === 'undefined') {
    return (
      <ReduxProvider store={store}>
        <ThemeConfiguration>
          <AuthContextProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </AuthContextProvider>
        </ThemeConfiguration>
      </ReduxProvider>
    );
  }

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<PageLoading />} persistor={persistor}>
        <ThemeConfiguration>
          <AuthContextProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </AuthContextProvider>
        </ThemeConfiguration>
      </PersistGate>
    </ReduxProvider>
  );
}

export default MyApp;
