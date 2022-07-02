import { Fragment, useMemo } from 'react';
import Head from 'next/head';
import dispatch from '@src/utils/dispatch';
import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';
import { useRouter } from 'next/router';
import MaterialForm from '@src/containers/Admin/Material/MaterialForm';
import { useGetMaterialQuery } from '@src/api/MaterialAPI';

const UpdateMaterialPage = () => {
  dispatch(setSelection(MenuAdminEnum.MATERIAL));
  const router = useRouter();
  const { id } = router.query;

  const { data: material } = useGetMaterialQuery({ id: id as string }, { skip: !id });

  const initialValue = useMemo(
    () => ({
      name: material?.data.name,
      description: material?.data.description,
    }),
    [material]
  );

  return (
    <Fragment>
      <Head>
        <title>Administrator - Update Material</title>
      </Head>
      <MaterialForm type="update" initialValue={initialValue} materialId={id as string} />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  UpdateMaterialPage,
  [RoleEnum.ADMIN, RoleEnum.EMPLOYEE],
  'update material',
  'Edit the fields below to update a material.'
);
