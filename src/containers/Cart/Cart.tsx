import Wrapper from '@src/components/Layout/Wrapper';
import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { cartHeader } from '@src/containers/Cart/constant';
import { Image, message } from 'antd';
import Link from 'next/link';
import QuantityControl from '@src/components/QuantityControl/QuantityControl';
import { FaRegTrashAlt } from 'react-icons/fa';
import Button from '@src/components/Button/Button';
import Container from './style';
import Cookies from 'js-cookie';
import {
  handleClearCart as handleClearCookieCart,
  handleDeleteItemInCart,
  handleUpdateQuantity,
  Product,
} from '@src/containers/Product/ProductCookie';
import Path from '@src/utils/path';
import formatAmount from '@src/utils/formatAmount';
import { useRouter } from 'next/router';
import useSelector from '@src/utils/useSelector';
import {
  useDeleteCartItemMutation,
  useDeleteCartMutation,
  usePutCartItemMutation,
} from '@src/api/CartAPI';
import CustomModal from '@src/components/ModalConfirm/ModalConfirm';
import useBooleanState from '@src/hooks/useBooleanState';
import SpinnerFullScreen from '@src/components/SpinnerFullScreen/SpinnerFullScreen';
import host from '@src/utils/host';
import { useTranslation } from 'react-i18next';

interface CartItem {
  product_id: string;
  quantity: number;
}

const Cart: FunctionComponent = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const confirmClearCart = useBooleanState();
  const { isAuth, profile } = useSelector((state) => state.userProfile);
  const { cartItems, loading } = useSelector((state) => state.productSlice);
  const cartCookie = Cookies.get('carts');

  const [product, setProduct] = useState<Product[]>([]);
  const [productCookie, setProductCookie] = useState<Product[]>([]);
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>();

  const [putCartItem] = usePutCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [deleteCart] = useDeleteCartMutation();

  useEffect(() => {
    if (isAuth) {
      const total = cartItems.reduce(
        (preValue: any, curValue: any) =>
          preValue + (curValue.price as number) * (curValue.quantity as number),
        0
      );
      setTotal(total);
      setProduct(cartItems as any);
    } else {
      if (cartCookie) {
        const parseJson = JSON.parse(cartCookie);
        setProductCookie(parseJson);
        const total = parseJson.reduce(
          (preValue: any, curValue: Product) =>
            preValue + (curValue.price as number) * (curValue.quantity as number),
          0
        );
        setTotal(total);
      }
    }
  }, [isAuth, profile, cartItems]);

  const filterDuplicateId = (id: string, quantity: number) => {
    const duplicateId = cartItem.find((item) => item.product_id === id);
    if (duplicateId) {
      const remainingFilter = cartItem.filter((item) => item.product_id !== id);
      remainingFilter.push({ product_id: id, quantity: quantity });
      setCartItem(remainingFilter);
    } else {
      return;
    }
  };

  const handleChange = (quantity: number, id: string) => {
    if (isAuth) {
      setCartItem((prevState) => [...prevState, { product_id: id, quantity }]);
      filterDuplicateId(id, quantity);
    } else {
      handleUpdateQuantity(id, quantity);
    }
  };

  const handleDeleteItem = (id?: string) => {
    if (isAuth) {
      deleteCartItem({ product_id: id })
        .unwrap()
        .then(() => {
          message.success(t('cart.deleteSuccess'));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const newCart = product.filter((item: Product) => item.id !== id);
      setProduct(newCart);
      handleDeleteItemInCart(newCart);
    }
  };

  const handleUpdateCart = () => {
    if (isAuth) {
      putCartItem({ carts: cartItem })
        .unwrap()
        .then(() => {
          message.success(t('cart.updateCartSuccess'));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      window.location.reload();
    }
  };

  const handleContinueShopping = () => {
    router.push(Path.SHOP);
  };

  const handleClearCart = () => {
    confirmClearCart.toggle();
  };

  const handleConfirmClearCart = () => {
    if (isAuth) {
      deleteCart({})
        .unwrap()
        .then(() => {
          message.success(t('cart.deleteSuccess'));
          confirmClearCart.toggle();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      handleClearCookieCart();
      confirmClearCart.toggle();
      window.location.reload();
    }
  };

  return (
    <Container>
      <Wrapper>
        {(isAuth ? product.length : productCookie.length) > 0 ? (
          <Fragment>
            <div className="cart-table mb-15">
              <table className="table">
                <thead>
                  <tr>
                    {cartHeader.map((item) => (
                      <th key={item.name} className={item.className}>
                        {t(item.name as any)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(isAuth ? product : productCookie).map((item: Product) => (
                    <tr key={item.id}>
                      <td>
                        <Image
                          width="100%"
                          src={`${host}${item.image}`}
                          preview={false}
                          alt="img_cart"
                        />
                      </td>
                      <td className="product-link">
                        <Link href={Path.PRODUCT_DETAIL(item.id as string)}>{item.name}</Link>
                      </td>
                      <td>
                        <div className="product-price">{formatAmount(item.price)}</div>
                      </td>
                      <td>
                        <QuantityControl
                          className="product-quantity"
                          value={item.quantity as number}
                          id={item.id}
                          onChange={handleChange as any}
                        />
                      </td>
                      <td>
                        <div className="product-price">
                          {formatAmount((item.price as number) * (item.quantity as number))}
                        </div>
                      </td>
                      <td>
                        <FaRegTrashAlt onClick={() => handleDeleteItem(item.id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cart-update-option mb-30">
              <Button className="custom-btn" type="secondary" onClick={handleUpdateCart}>
                {t('cart.updateCart')}
              </Button>
              <Button className="custom-btn" type="secondary" onClick={handleContinueShopping}>
                {t('cart.continue')}
              </Button>
              <Button className="custom-btn" type="secondary" onClick={handleClearCart}>
                {t('cart.clear')}
              </Button>
            </div>
            <CartTotal total={total} />
          </Fragment>
        ) : (
          <div className="cart-empty">
            <div className="title mb-10">{t('cart.shoppingCart')}</div>
            <div className="subtitle mb-10">{t('cart.cartEmpty')}</div>
            <div className="description">
              {t('cart.continueBrowsing')} <Link href={Path.SHOP}>{t('cart.here')}</Link>
            </div>
          </div>
        )}
      </Wrapper>
      <CustomModal
        type="confirm"
        title={t('cart.clear')}
        description={t('cart.confirmClearDescription')}
        closeText={t('cart.confirmCancel')}
        confirmText={t('cart.confirmYes')}
        visible={confirmClearCart.visible}
        onClose={confirmClearCart.toggle}
        onConfirm={handleConfirmClearCart}
      />
      {loading && <SpinnerFullScreen />}
    </Container>
  );
};

interface CartTotalProps {
  total?: number;
}

const CartTotal = ({ total }: CartTotalProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleGoToCheckout = () => {
    router.push(Path.CHECK_OUT);
  };

  return (
    <div className="cart-calculate-items">
      <div className="calculate-title">{t('cart.cartTotal')}</div>
      <table className="calculate-table">
        <tbody>
          <tr>
            <td>{t('cart.subTotal')}</td>
            <td className="subtotal">{formatAmount(total)}</td>
          </tr>
          <tr className="total">
            <td>{t('cart.total')}</td>
            <td className="total-amount">{formatAmount(total)}</td>
          </tr>
        </tbody>
      </table>
      <Button className="custom-btn" type="secondary" onClick={handleGoToCheckout}>
        {t('cart.proceed')}
      </Button>
    </div>
  );
};

export default Cart;
