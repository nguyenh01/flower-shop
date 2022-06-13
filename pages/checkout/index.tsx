import { Fragment, ReactElement } from 'react';
import EmptyLayout from '@src/components/Layout/EmptyLayout';
import Head from 'next/head';
import Checkout from '@src/containers/Checkout';
import RoutingProtection from '@src/components/ServerSideRendering/RoutingProtection';
import { allRole } from '@src/utils/constants';

function CheckoutPage() {
  return (
    <Fragment>
      <Head>
        <title>Flower Sun - Checkout</title>
      </Head>
      <Checkout />
    </Fragment>
  );
}

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>;
};

export default RoutingProtection(CheckoutPage, allRole);
