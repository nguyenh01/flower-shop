import { Fragment } from 'react';
import Head from 'next/head';
import dispatch from '@src/utils/dispatch';
import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';
import EmployeeAdministration from '@src/containers/Admin/Employee/Employee';

const Employee = () => {
  dispatch(setSelection(MenuAdminEnum.EMPLOYEE));

  return (
    <Fragment>
      <Head>
        <title>Administrator - Employee List</title>
      </Head>
      <EmployeeAdministration />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  Employee,
  [RoleEnum.ADMIN],
  'employee list',
  'Detailed employee list of the store.'
);
