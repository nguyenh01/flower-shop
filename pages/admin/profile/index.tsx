import { Fragment } from 'react';
import Head from 'next/head';
import dispatch from '@src/utils/dispatch';
import { setSelection } from '@src/redux/slices/selectedMenuSlice';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import AdministrationRoutingProtection from '@src/components/ServerSideRendering/AdministrationRoutingProtection';
import ProfileAdministration from '@src/containers/Admin/Profile/Profile';

const Profile = () => {
  dispatch(setSelection(MenuAdminEnum.PROFILE));

  return (
    <Fragment>
      <Head>
        <title>Administrator - Profile</title>
      </Head>
      <ProfileAdministration />
    </Fragment>
  );
};

export default AdministrationRoutingProtection(
  Profile,
  [RoleEnum.EMPLOYEE],
  'profile',
  'Can change information or password.'
);
