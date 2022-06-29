import { Fragment, ReactElement, useMemo } from 'react';
import Head from 'next/head';
import AdminLayout from '@src/components/Layout/AdminLayout';
import ProductFormAdministration from '@src/containers/Admin/Product/ProductForm';
import AdminTitle from '@src/components/AdminTitle/AdminTitle';

const CreateProductPage = () => {
  const initialValue = useMemo(
    () => ({
      name: '',
      cate_id: undefined,
      mate_id: undefined,
      price: '',
      unitsinstock: '',
      description: '',
    }),
    []
  );

  return (
    <Fragment>
      <Head>
        <title>Administrator - Product Creation</title>
      </Head>
      <ProductFormAdministration type="create" initialValue={initialValue} />
    </Fragment>
  );
};

CreateProductPage.getLayout = function getLayout(children: ReactElement) {
  return (
    <AdminLayout
      adminTitle={
        <AdminTitle
          title="Create Product"
          description="Fill in the fields below to create a product"
        />
      }
    >
      {children}
    </AdminLayout>
  );
};

export default CreateProductPage;
