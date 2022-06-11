import 'antd/dist/antd.css';
import 'styles/antd.scss';
import 'styles/globals.scss';
import 'styles/styles.scss';
import 'styles/margin.scss';
import '@src/components/Popover/popover.scss';

import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import store from '@src/redux/store';

import { ThemeProvider } from 'styled-components';
import theme from '@src/components/Theme/Theme';

import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import english_translation from '@src/i18n/english/translation.json';
import vietnamese_translation from '@src/i18n/vietnamese/translation.json';

import Layout from '@src/components/Layout/Layout';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'english',
  resources: {
    english: {
      translation: english_translation,
    },
    vietnamese: {
      translation: vietnamese_translation,
    },
  },
});

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <ThemeProvider theme={theme}>
          {/*// @ts-ignore*/}
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  );
}
