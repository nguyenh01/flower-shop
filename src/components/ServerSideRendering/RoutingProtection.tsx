import { FunctionComponent, useEffect } from 'react';
import Path from '@src/utils/path';
import { redirect } from '@src/utils/redirect';
import axios from 'axios';
import apiHost from '@src/api/api-host';
import useSelector from '@src/utils/useSelector';
import { useVerifyAccessTokenQuery } from '@src/api/AuthenticationAPI';
import { useGetCartByIdQuery } from '@src/api/CartAPI';
import dispatch from '@src/utils/dispatch';
import { setUserProfile } from '@src/redux/slices/userSlice';
import { setCart, setLoadingCart } from '@src/redux/slices/productSlice';

const RoutingProtection = (Component: FunctionComponent, type: number[] | undefined = []) => {
  const AuthenticationComponent = ({ ...restProps }) => {
    const { isAuth, profile } = useSelector((state) => state.userProfile);
    const { data } = useVerifyAccessTokenQuery({}, { skip: !isAuth });
    const {
      data: cart,
      isFetching,
      isLoading,
    } = useGetCartByIdQuery({ id: profile.id }, { skip: !isAuth || !profile.id });

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

    useEffect(() => {
      dispatch(setLoadingCart(isFetching || isLoading));
    }, [isFetching, isLoading]);

    return <Component {...restProps} />;
  };

  AuthenticationComponent.getInitialProps = async (server: { [key: string]: any }) => {
    const { asPath, req } = server;
    const token = await req?.cookies?.token;

    if (token && (asPath === Path.REGISTER || asPath === Path.LOGIN)) {
      redirect(server, Path.PAGE_NOT_FOUND);
      return { query: server.query };
    }

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

    try {
      if (token) {
        const response = await axios.get(`${apiHost}/shoppingCarts`, {
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
