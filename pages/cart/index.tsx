import Breadcrumb from '@src/components/Breadcrumb/Breadcrumb';
import Path from '@src/utils/path';
import { NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import RoutingProtection from '@src/components/ServerSideRendering/RoutingProtection';
import { allRole } from '@src/utils/constants';
import Cart from '@src/containers/Cart/Cart';

const CartPage: NextPage = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { name: t('menu.home'), link: Path.HOME },
    { name: 'Your Shopping Cart', link: undefined },
  ];

  return (
    <Fragment>
      <Head>
        <title>Flower Sun - Cart</title>
      </Head>
      <Breadcrumb breadcrumbTitle={'Your Shopping Cart'} breadcrumbItems={breadcrumbItems} />
      <Cart />
    </Fragment>
  );
};

export default RoutingProtection(CartPage, allRole);
