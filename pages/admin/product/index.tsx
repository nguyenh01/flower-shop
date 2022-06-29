import { Fragment, ReactElement } from 'react';
import Head from 'next/head';
import AdminLayout from '@src/components/Layout/AdminLayout';
import ProductAdministration from '@src/containers/Admin/Product/Product';

const Product = () => {
  return (
    <Fragment>
      <Head>
        <title>Administrator - Dashboard</title>
      </Head>
      <ProductAdministration />
    </Fragment>
  );
};

Product.getLayout = function getLayout(children: ReactElement) {
  return <AdminLayout>{children}</AdminLayout>;
};

export default Product;
