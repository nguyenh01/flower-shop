import { Fragment } from 'react';
import Head from 'next/head';
import dispatch from '@src/utils/dispatch';
import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';
import RevenueAdministration from '@src/containers/Admin/Revenue/Revenue';

const Revenue = () => {
  dispatch(setSelection(MenuAdminEnum.REVENUE));

  return (
    <Fragment>
      <Head>
        <title>Administrator - Revenue Statistics</title>
      </Head>
      <RevenueAdministration />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  Revenue,
  [RoleEnum.ADMIN],
  'Revenue Statistics',
  'Details of the store is sales statistics.'
);
