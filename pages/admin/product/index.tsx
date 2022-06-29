import { Fragment } from 'react';
import Head from 'next/head';
import ProductAdministration from '@src/containers/Admin/Product/Product';
import dispatch from '@src/utils/dispatch';
import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';

const Product = () => {
  dispatch(setSelection(MenuAdminEnum.PRODUCT));

  return (
    <Fragment>
      <Head>
        <title>Administrator - Product List</title>
      </Head>
      <ProductAdministration />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  Product,
  [RoleEnum.ADMIN, RoleEnum.EMPLOYEE],
  'product list',
  'Detailed product list of the store.'
);
