import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

import { wrapper } from '@/store';

import '@/styles/globals.css';
import { SideBarLayout } from '@/components';
import { getUserAuthToken } from '@/utils/authHelper';

function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const router = useRouter();
  const [isInLogin, setIsInLogin] = useState(true);

  useEffect(() => {
    const path = window.location.pathname;
    const token = getUserAuthToken();
    if (!token && path !== '/') {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/') {
      setIsInLogin(true);
    } else {
      setIsInLogin(false);
    }
  });

  return (
    <Provider store={store}>
      {isInLogin ? (
        <Component {...pageProps} />
      ) : (
        <SideBarLayout>
          <Component {...pageProps} />
        </SideBarLayout>
      )}
    </Provider>
  );
}

export default wrapper.withRedux(App);
