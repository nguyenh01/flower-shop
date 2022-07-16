import { Fragment } from 'react';
import Head from 'next/head';
import dispatch from '@src/utils/dispatch';
import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';
import CustomerAdministrator from '@src/containers/Admin/Customer/Customer';

const Customer = () => {
  dispatch(setSelection(MenuAdminEnum.CUSTOMER));

  return (
    <Fragment>
      <Head>
        <title>Administrator - Customer List</title>
      </Head>
      <CustomerAdministrator />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  Customer,
  [RoleEnum.ADMIN, RoleEnum.EMPLOYEE],
  'customer list',
  'Detailed customer list of the store.'
);
