import Breadcrumb from '@src/components/Breadcrumb/Breadcrumb';
import { allRole } from '@src/utils/constants';
import Path from '@src/utils/path';
import { NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import RoutingProtection from '@src/components/ServerSideRendering/RoutingProtection';
import MyAccount from '@src/containers/MyAccount/MyAccount';

const MyAccountPage: NextPage = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { name: t('menu.home'), link: Path.HOME },
    { name: t('menu.myAccount'), link: undefined },
  ];

  return (
    <Fragment>
      <Head>
        <title>Flower Sun - My Account</title>
      </Head>
      <Breadcrumb breadcrumbTitle={t('menu.myAccount')} breadcrumbItems={breadcrumbItems} />
      <MyAccount />
    </Fragment>
  );
};

export default RoutingProtection(MyAccountPage, allRole);
