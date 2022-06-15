import { FunctionComponent, ReactElement, useEffect } from 'react';
import useSelector from '@src/utils/useSelector';
import { useVerifyAccessTokenQuery } from '@src/api/AuthenticationAPI';
import dispatch from '@src/utils/dispatch';
import { setUserProfile } from '@src/redux/slices/userSlice';
import { useGetCartByIdQuery } from '@src/api/CartAPI';
import { setCart } from '@src/redux/slices/productSlice';

interface ComponentCallAPIProps {
  component: ReactElement;
}

const ComponentCallAPI: FunctionComponent<ComponentCallAPIProps> = ({ component }) => {
  const { isAuth, profile } = useSelector((state) => state.userProfile);
  const { data } = useVerifyAccessTokenQuery({}, { skip: !isAuth });
  const { data: cart } = useGetCartByIdQuery({ id: profile.id }, { skip: !isAuth || !profile.id });

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
        image: item.imageList[0],
        name: item.product_name,
        price: item.unit_price,
        quantity: item.quantity,
      }));
      dispatch(setCart(product));
    } else {
      dispatch(setCart([]));
    }
  }, [cart]);

  return component;
};

export default ComponentCallAPI;
