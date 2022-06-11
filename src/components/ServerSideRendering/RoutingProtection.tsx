import { FunctionComponent, useEffect } from 'react';
import useSelector from '@src/utils/useSelector';
import { useVerifyAccessTokenQuery } from '@src/api/AuthenticationAPI';
import Path from '@src/utils/path';
import { redirect } from '@src/utils/redirect';
import axios from 'axios';
import host from '@src/api/host';
import dispatch from '@src/utils/dispatch';
import { setUserProfile } from '@src/redux/slices/userSlice';
import { useGetCartByIdQuery } from '@src/api/CartAPI';
import { setCart } from '@src/redux/slices/productSlice';

const RoutingProtection = (Component: FunctionComponent, type: number[] | undefined = []) => {
  const AuthenticationComponent = ({ ...restProps }) => {
    const { isAuth, profile } = useSelector((state) => state.userProfile);
    const { data } = useVerifyAccessTokenQuery({}, { skip: !isAuth });
    const { data: cart } = useGetCartByIdQuery(
      { id: profile.id },
      { skip: !isAuth || !profile.id }
    );

    useEffect(() => {
      if (data) {
        const payload = {
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          phone: data.user.phone,
          id: data.user._id,
        };
        localStorage.setItem('user_id', data.user._id);
        dispatch(setUserProfile(payload));
      }
    }, [data]);

    useEffect(() => {
      if (cart) {
        const product = cart.listShoppingCartDetail.map((item) => ({
          id: item.product_id,
          image: 'Image',
          name: item.product_name,
          price: item.unit_price,
          quantity: item.quantity,
        }));
        dispatch(setCart(product));
      }
    }, [cart]);

    return <Component {...restProps} />;
  };

  AuthenticationComponent.getInitialProps = async (server: { [key: string]: any }) => {
    const { asPath, req } = server;

    if (req && server.req.cookies.token && (asPath === Path.REGISTER || asPath === Path.LOGIN)) {
      redirect(server, Path.PAGE_NOT_FOUND);
      return { query: server.query };
    }

    try {
      if (req && server.req.cookies.token) {
        const token = server?.req?.cookies.token;
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

  return AuthenticationComponent;
};

export default RoutingProtection;
