import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import dispatch from '@src/utils/dispatch';
import { Fragment } from 'react';
import Head from 'next/head';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';
import OrderDetailAdministration from '@src/containers/Admin/Order/OrderDetail';

const OrderDetail = () => {
  dispatch(setSelection(MenuAdminEnum.ORDER));

  return (
    <Fragment>
      <Head>
        <title>Administrator - Order Detail</title>
      </Head>
      <OrderDetailAdministration />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  OrderDetail,
  [RoleEnum.ADMIN, RoleEnum.EMPLOYEE],
  'Order Detail',
  'Customer order details'
);
