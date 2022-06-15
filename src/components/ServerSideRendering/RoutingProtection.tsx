import { FunctionComponent } from 'react';
import Path from '@src/utils/path';
import { redirect } from '@src/utils/redirect';
import axios from 'axios';
import host from '@src/api/host';
import ComponentCallAPI from './ComponentCallAPI';

const RoutingProtection = (Component: FunctionComponent, type: number[] | undefined = []) => {
  const AuthenticationComponent = ({ ...restProps }) => {
    return <ComponentCallAPI component={<Component {...restProps} />} />;
  };

  AuthenticationComponent.getInitialProps = async (server: { [key: string]: any }) => {
    const { asPath, req } = server;
    const token = server?.req?.cookies?.token;

    if (req && token && (asPath === Path.REGISTER || asPath === Path.LOGIN)) {
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

    try {
      if (req && token) {
        const response = await axios.get(`${host}/shoppingCarts`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        const checkCartItem = response.data.listShoppingCartDetail.length === 0;
        if (checkCartItem && asPath === Path.CHECK_OUT) {
          redirect(server, Path.CART);
          return { query: server.query };
        }
      }
    } catch (error) {
      console.log(error);
    }

    return { query: server.query };
  };

  return AuthenticationComponent;
};

export default RoutingProtection;
