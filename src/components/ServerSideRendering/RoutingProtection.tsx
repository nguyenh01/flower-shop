import { FunctionComponent, useEffect } from 'react';
import Path from '@src/utils/path';
import { redirect } from '@src/utils/redirect';
import axios from 'axios';
import host from '@src/api/host';
import useSelector from '@src/utils/useSelector';
import { useVerifyAccessTokenQuery } from '@src/api/AuthenticationAPI';
import { useGetCartByIdQuery } from '@src/api/CartAPI';
import dispatch from '@src/utils/dispatch';
import { setUserProfile } from '@src/redux/slices/userSlice';
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

    useEffect(() => {
      if (cart) {
        const product = cart.listShoppingCartDetail.map((item) => ({
          id: item?.product_id,
          image: item?.imageList[0],
          name: item?.product_name,
          price: item?.unit_price,
          quantity: item?.quantity,
        }));
        dispatch(setCart(product));
      } else {
        dispatch(setCart([]));
      }
    }, [cart]);

    return <Component {...restProps} />;
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
