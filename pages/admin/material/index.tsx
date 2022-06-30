import { Fragment } from 'react';
import Head from 'next/head';
import dispatch from '@src/utils/dispatch';
import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';
import MaterialAdministration from '@src/containers/Admin/Material/Material';

const Material = () => {
  dispatch(setSelection(MenuAdminEnum.MATERIAL));

  return (
    <Fragment>
      <Head>
        <title>Administrator - Material List</title>
      </Head>
      <MaterialAdministration />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  Material,
  [RoleEnum.ADMIN, RoleEnum.EMPLOYEE],
  'material list',
  'Detailed material list of the store.'
);
