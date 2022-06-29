import { Fragment, ReactElement, useMemo } from 'react';
import Head from 'next/head';
import AdminLayout from '@src/components/Layout/AdminLayout';
import ProductFormAdministration from '@src/containers/Admin/Product/ProductForm';
import AdminTitle from '@src/components/AdminTitle/AdminTitle';
import { useRouter } from 'next/router';
import { useGetProductQuery } from '@src/api/ProductAPI';

const UpdateProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: product } = useGetProductQuery({ id: id as string }, { skip: !id });

  const initialValue = useMemo(
    () => ({
      name: product?.name,
      cate_id: product?.cate_id,
      mate_id: product?.mate_id,
      price: product?.price,
      unitsinstock: product?.unitsinstock,
      description: product?.description,
      images: product?.imageList,
    }),
    [product]
  );

  return (
    <Fragment>
      <Head>
        <title>Administrator - Product Creation</title>
      </Head>
      <ProductFormAdministration type="update" initialValue={initialValue} />
    </Fragment>
  );
};

UpdateProductPage.getLayout = function getLayout(children: ReactElement) {
  return (
    <AdminLayout
      adminTitle={
        <AdminTitle
          title="Update Product"
          description="Fill in the fields below to update a product"
        />
      }
    >
      {children}
    </AdminLayout>
  );
};

export default UpdateProductPage;
