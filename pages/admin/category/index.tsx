import { Fragment } from 'react';
import Head from 'next/head';
import dispatch from '@src/utils/dispatch';
import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';
import CategoryAdministration from '@src/containers/Admin/Category/Category';

const Category = () => {
  dispatch(setSelection(MenuAdminEnum.CATEGORY));

  return (
    <Fragment>
      <Head>
        <title>Administrator - Category List</title>
      </Head>
      <CategoryAdministration />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  Category,
  [RoleEnum.ADMIN, RoleEnum.EMPLOYEE],
  'category list',
  'Detailed category list of the store.'
);
