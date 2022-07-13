import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import dispatch from '@src/utils/dispatch';
import { Fragment } from 'react';
import Head from 'next/head';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';
import MessageAdministration from '@src/containers/Admin/Message/Message';

const Message = () => {
  dispatch(setSelection(MenuAdminEnum.MESSAGE));

  return (
    <Fragment>
      <Head>
        <title>Administrator - Message</title>
      </Head>
      <MessageAdministration />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  Message,
  [RoleEnum.ADMIN, RoleEnum.EMPLOYEE],
  'Message',
  'Chat and answer questions for customers.'
);
