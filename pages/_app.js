import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

import { wrapper } from '@/store';

import '@/styles/globals.css';
import { SideBarLayout } from '@/components';
import { getUserAuthToken } from '@/utils/authHelper';
import http from '@/api/http';

function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const router = useRouter();
  const [isInLogin, setIsInLogin] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isExam, setIsExam] = useState(false);

  const isBrowser = () => typeof window !== 'undefined';

  useEffect(() => {
    const path = window.location.pathname;
    const token = getUserAuthToken();
    if (!token && path !== '/') {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsReady(() => true);
      http.refreshToken();
    }
  }, [isBrowser]);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/') {
      setIsInLogin(true);
    } else if (path.includes('examPage')) {
      setIsExam(true);
    } else {
      setIsInLogin(false);
    }
  });

  return (
    <Provider store={store}>
      {isInLogin || isExam ? (
        <Component {...pageProps} />
      ) : isReady ? (
        <SideBarLayout>
          <Component {...pageProps} />
        </SideBarLayout>
      ) : null}
    </Provider>
  );
}

export default wrapper.withRedux(App);
