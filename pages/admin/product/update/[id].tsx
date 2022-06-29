import { Fragment, useMemo } from 'react';
import Head from 'next/head';
import ProductFormAdministration from '@src/containers/Admin/Product/ProductForm';
import { useRouter } from 'next/router';
import { useGetProductQuery } from '@src/api/ProductAPI';
import dispatch from '@src/utils/dispatch';
import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';

const UpdateProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  dispatch(setSelection(MenuAdminEnum.PRODUCT));

  const { data: product } = useGetProductQuery({ id: id as string }, { skip: !id });

  const initialValue = useMemo(
    () => ({
      id: product?._id,
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
        <title>Administrator - Update Product</title>
      </Head>
      <ProductFormAdministration type="update" initialValue={initialValue} />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  UpdateProductPage,
  [RoleEnum.ADMIN, RoleEnum.EMPLOYEE],
  'update product',
  'Fill in the fields below to update a product.'
);
