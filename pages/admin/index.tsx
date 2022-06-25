import { Fragment, ReactElement } from 'react';
import EmptyLayout from '@src/components/Layout/EmptyLayout';
import Head from 'next/head';
import Login from '@src/containers/Admin/Login/Login';

function LoginAdminPage() {
  return (
    <Fragment>
      <Head>
        <title>Administator - Login</title>
      </Head>
      <Login />
    </Fragment>
  );
}

LoginAdminPage.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>;
};

export default LoginAdminPage;
