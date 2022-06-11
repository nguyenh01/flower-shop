import Breadcrumb from '@src/components/Breadcrumb/Breadcrumb';
import Login from '@src/containers/Login/Login';
import Path from '@src/utils/path';
import { NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import RoutingProtection from '@src/components/ServerSideRendering/RoutingProtection';
import { allRole } from '@src/utils/constants';

const LoginPage: NextPage = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { name: t('menu.home'), link: Path.HOME },
    { name: t('menu.login'), link: undefined },
  ];

  return (
    <Fragment>
      <Head>
        <title>Flower Sun - Login</title>
      </Head>
      <Breadcrumb breadcrumbTitle={t('menu.login')} breadcrumbItems={breadcrumbItems} />
      <Login />
    </Fragment>
  );
};

export default RoutingProtection(LoginPage, allRole);
