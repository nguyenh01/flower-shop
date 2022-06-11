import Breadcrumb from '@src/components/Breadcrumb/Breadcrumb';
import Register from '@src/containers/Register/Register';
import Path from '@src/utils/path';
import { NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import RoutingProtection from '@src/components/ServerSideRendering/RoutingProtection';
import { allRole } from '@src/utils/constants';

const RegisterPage: NextPage = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { name: t('menu.home'), link: Path.HOME },
    { name: t('register.createAccount'), link: undefined },
  ];

  return (
    <Fragment>
      <Head>
        <title>Flower Sun - Register</title>
      </Head>
      <Breadcrumb breadcrumbTitle={t('register.createAccount')} breadcrumbItems={breadcrumbItems} />
      <Register />
    </Fragment>
  );
};

export default RoutingProtection(RegisterPage, allRole);
