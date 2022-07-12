import { Fragment, FunctionComponent, ReactElement, useEffect, useState } from 'react';
import Path from '@src/utils/path';
import { redirect } from '@src/utils/redirect';
import axios from 'axios';
import apiHost from '@src/api/api-host';
import useSelector from '@src/utils/useSelector';
import { useVerifyAccessTokenQuery } from '@src/api/AuthenticationAPI';
import dispatch from '@src/utils/dispatch';
import { setUserProfile } from '@src/redux/slices/userSlice';
import AdminLayout from '../Layout/AdminLayout';
import AdminTitle from '../AdminTitle/AdminTitle';
import SpinnerFullScreen from '../SpinnerFullScreen/SpinnerFullScreen';
import { useRouter } from 'next/router';

const AdministrationRoutingProtection = (
  Component: FunctionComponent,
  type: number[] | undefined = [],
  title: string,
  desc: string
) => {
  const AuthenticationComponent = ({ ...restProps }) => {
    const router = useRouter();
    const { isAuth } = useSelector((state) => state.userProfile);
    const { data } = useVerifyAccessTokenQuery({}, { skip: !isAuth });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setLoading(false);
      } else {
        router.push(Path.PAGE_NOT_FOUND);
      }
    }, []);

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

    return (
      <Fragment>
        {loading ? <SpinnerFullScreen color="#fff" dark /> : <Component {...restProps} />}
      </Fragment>
    );
  };

  AuthenticationComponent.getInitialProps = async (server: { [key: string]: any }) => {
    const { req } = server;
    const token = await req?.cookies?.token;

    try {
      if (token) {
        const response = await axios.get(`${apiHost}/users/me`, {
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
