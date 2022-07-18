import { Fragment } from 'react';
import Head from 'next/head';
import dispatch from '@src/utils/dispatch';
import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';
import DashboardAdministration from '@src/containers/Admin/Dashboard/Dashboard';

const Dashboard = () => {
  dispatch(setSelection(MenuAdminEnum.DASHBOARD));

  return (
    <Fragment>
      <Head>
        <title>Administrator - Dashboard</title>
      </Head>
      <DashboardAdministration />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  Dashboard,
  [RoleEnum.ADMIN],
  'dashboard',
  "Welcome back to Dashboard. The dashboard shows a summary of the store's information."
);
