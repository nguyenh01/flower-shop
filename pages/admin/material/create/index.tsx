import { Fragment, useMemo } from 'react';
import Head from 'next/head';
import dispatch from '@src/utils/dispatch';
import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';
import MaterialForm from '@src/containers/Admin/Material/MaterialForm';

const CreateMaterialPage = () => {
  dispatch(setSelection(MenuAdminEnum.MATERIAL));

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
        <title>Administrator - Create Material</title>
      </Head>
      <MaterialForm type="create" initialValue={initialValue} />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  CreateMaterialPage,
  [RoleEnum.ADMIN, RoleEnum.EMPLOYEE],
  'create material',
  'Fill in the fields below to create a material.'
);
