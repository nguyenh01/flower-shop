import { FunctionComponent, ReactElement, useEffect } from 'react';
import Path from '@src/utils/path';
import { redirect } from '@src/utils/redirect';
import axios from 'axios';
import host from '@src/api/host';
import useSelector from '@src/utils/useSelector';
import { useVerifyAccessTokenQuery } from '@src/api/AuthenticationAPI';
import dispatch from '@src/utils/dispatch';
import { setUserProfile } from '@src/redux/slices/userSlice';
import AdminLayout from '../Layout/AdminLayout';
import AdminTitle from '../AdminTitle/AdminTitle';

const AdministrationRoutingProtection = (
  Component: FunctionComponent,
  type: number[] | undefined = [],
  title: string,
  desc: string
) => {
  const AuthenticationComponent = ({ ...restProps }) => {
    const { isAuth } = useSelector((state) => state.userProfile);
    const { data } = useVerifyAccessTokenQuery({}, { skip: !isAuth });

    useEffect(() => {
      if (data) {
        const payload = {
          email: data.user?.email,
          firstName: data.user?.firstName,
          lastName: data.user?.lastName,
          phone: data.user?.phone,
          id: data.user?._id,
        };
        localStorage.setItem('user_id', data.user?._id);
        dispatch(setUserProfile(payload));
      }
    }, [data]);

    return <Component {...restProps} />;
  };

  AuthenticationComponent.getInitialProps = async (server: { [key: string]: any }) => {
    const { req } = server;
    const token = server?.req?.cookies?.token;

    if (!token) {
      redirect(server, Path.PAGE_NOT_FOUND);
      return { query: server.query };
    }

    try {
      if (req && token) {
        const response = await axios.get(`${host}/users/me`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        const checkType = type.some((item) => item === response.data.user.type);
        if (!checkType) {
          redirect(server, Path.PAGE_NOT_FOUND);
          return { query: server.query };
        }
      }
    } catch (error) {
      console.log(error);
    }

    return { query: server.query };
  };

  AuthenticationComponent.getLayout = function getLayout(children: ReactElement) {
    return (
      <AdminLayout adminTitle={<AdminTitle title={title} description={desc} />}>
        {children}
      </AdminLayout>
    );
  };

  return AuthenticationComponent;
};

export default AdministrationRoutingProtection;
