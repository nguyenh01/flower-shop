import Breadcrumb from '@src/components/Breadcrumb/Breadcrumb';
import Path from '@src/utils/path';
import { NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import RoutingProtection from '@src/components/ServerSideRendering/RoutingProtection';
import { allRole } from '@src/utils/constants';
import AboutUs from '@src/containers/AboutUs/AboutUs';

const AboutUsPage: NextPage = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { name: t('menu.home'), link: Path.HOME },
    { name: t('menu.aboutUs'), link: undefined },
  ];

  return (
    <Fragment>
      <Head>
        <title>Flower Sun - About Us</title>
      </Head>
      <Breadcrumb breadcrumbTitle={t('menu.aboutUs')} breadcrumbItems={breadcrumbItems} />
      <AboutUs />
    </Fragment>
  );
};

export default RoutingProtection(AboutUsPage, allRole);
