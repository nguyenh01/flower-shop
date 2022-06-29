import { Fragment } from 'react';
import Head from 'next/head';
import dispatch from '@src/utils/dispatch';
import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';

const Dashboard = () => {
  dispatch(setSelection(MenuAdminEnum.DASHBOARD));

  return (
    <Fragment>
      <Head>
        <title>Administrator - Dashboard</title>
      </Head>
      <div>Dashboard</div>
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  Dashboard,
  [RoleEnum.ADMIN, RoleEnum.EMPLOYEE],
  'dashboard',
  "The dashboard shows a summary of the store's information."
);
