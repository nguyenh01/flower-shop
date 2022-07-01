import { Fragment, useMemo } from 'react';
import Head from 'next/head';
import dispatch from '@src/utils/dispatch';
import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';
import CategoryForm from '@src/containers/Admin/Category/CategoryForm';

const CreateCategoryPage = () => {
  dispatch(setSelection(MenuAdminEnum.CATEGORY));

  const initialValue = useMemo(
    () => ({
      name: '',
      description: '',
    }),
    []
  );

  return (
    <Fragment>
      <Head>
        <title>Administrator - Create Category</title>
      </Head>
      <CategoryForm type="create" initialValue={initialValue} />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  CreateCategoryPage,
  [RoleEnum.ADMIN, RoleEnum.EMPLOYEE],
  'create category',
  'Fill in the fields below to create a category.'
);
