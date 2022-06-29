import { Fragment, useMemo } from 'react';
import Head from 'next/head';
import ProductFormAdministration from '@src/containers/Admin/Product/ProductForm';
import dispatch from '@src/utils/dispatch';
import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';

const CreateProductPage = () => {
  dispatch(setSelection(MenuAdminEnum.PRODUCT));

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
        <title>Administrator - Create Product</title>
      </Head>
      <ProductFormAdministration type="create" initialValue={initialValue} />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  CreateProductPage,
  [RoleEnum.ADMIN, RoleEnum.EMPLOYEE],
  'create product',
  'Fill in the fields below to create a product.'
);
