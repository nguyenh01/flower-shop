import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import dispatch from '@src/utils/dispatch';
import { Fragment } from 'react';
import Head from 'next/head';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';
import OrderAdministration from '@src/containers/Admin/Order/Order';

const Order = () => {
  dispatch(setSelection(MenuAdminEnum.ORDER));

  return (
    <Fragment>
      <Head>
        <title>Administrator - Order List</title>
      </Head>
      <OrderAdministration />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  Order,
  [RoleEnum.ADMIN, RoleEnum.EMPLOYEE],
  'Order list',
  'Detailed order list of the store.'
);
