import { Fragment, useMemo } from 'react';
import Head from 'next/head';
import dispatch from '@src/utils/dispatch';
import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';
import CategoryForm from '@src/containers/Admin/Category/CategoryForm';
import { useRouter } from 'next/router';
import { useGetCategoryQuery } from '@src/api/CategoryAPI';

const UpdateCategoryPage = () => {
  dispatch(setSelection(MenuAdminEnum.CATEGORY));
  const router = useRouter();
  const { id } = router.query;

  const { data: category } = useGetCategoryQuery({ id: id as string }, { skip: !id });

  const initialValue = useMemo(
    () => ({
      name: category?.data.name,
      description: category?.data.description,
    }),
    [category]
  );

  return (
    <Fragment>
      <Head>
        <title>Administrator - Update Category</title>
      </Head>
      <CategoryForm type="update" initialValue={initialValue} categoryId={id as string} />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  UpdateCategoryPage,
  [RoleEnum.ADMIN, RoleEnum.EMPLOYEE],
  'Update category',
  'Edit the fields below to update a category.'
);
