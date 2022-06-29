import { Fragment, ReactElement } from 'react';
import Head from 'next/head';
import AdminLayout from '@src/components/Layout/AdminLayout';

const Dashboard = () => {
  return (
    <Fragment>
      <Head>
        <title>Administrator - Dashboard</title>
      </Head>
      <div>Dashboard</div>
    </Fragment>
  );
};

Dashboard.getLayout = function getLayout(children: ReactElement) {
  return <AdminLayout>{children}</AdminLayout>;
};

export default Dashboard;
