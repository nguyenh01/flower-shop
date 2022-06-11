import Carousel from '@src/components/Carousel/Carousel';
import FeatureProduct from '@src/containers/HomePage/FeatureProduct';
import OurHistory from '@src/containers/HomePage/OurHistory';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import RoutingProtection from '@src/components/ServerSideRendering/RoutingProtection';
import { allRole } from '@src/utils/constants';

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Flower Sun - Flower Shop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Carousel />
      <FeatureProduct />
      <OurHistory />
    </Fragment>
  );
};

export default RoutingProtection(Home, allRole);
