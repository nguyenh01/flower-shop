import Breadcrumb from '@src/components/Breadcrumb/Breadcrumb';
import Path from '@src/utils/path';
import { NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import RoutingProtection from '@src/components/ServerSideRendering/RoutingProtection';
import { allRole } from '@src/utils/constants';
import Shop from '@src/containers/Shop/Shop';

const ShopPage: NextPage = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { name: t('menu.home'), link: Path.HOME },
    { name: t('menu.shop'), link: undefined },
  ];

  return (
    <Fragment>
      <Head>
        <title>Flower Sun - Shop</title>
      </Head>
      <Breadcrumb breadcrumbTitle={t('menu.shop')} breadcrumbItems={breadcrumbItems} />
      <Shop />
    </Fragment>
  );
};

export default RoutingProtection(ShopPage, allRole);
