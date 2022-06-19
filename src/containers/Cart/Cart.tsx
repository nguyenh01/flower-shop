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
import { imgPath } from '@src/utils/constants';
import Path from '@src/utils/path';
import formatAmount from '@src/utils/formatAmount';
import { useRouter } from 'next/router';
import useSelector from '@src/utils/useSelector';
import {
  useDeleteCartItemMutation,
  useDeleteCartMutation,
  usePutCartItemMutation,
} from '@src/api/CartAPI';
import ModalConfirm from '@src/components/ModalConfirm/ModalConfirm';
import useBooleanState from '@src/hooks/useBooleanState';

interface CartItem {
  product_id: string;
  quantity: number;
}

const Cart: FunctionComponent = () => {
  const router = useRouter();
  const confirmClearCart = useBooleanState();
  const { isAuth, profile } = useSelector((state) => state.userProfile);
  const { cartItems } = useSelector((state) => state.productSlice);
  const cartCookie = Cookies.get('carts');

  const [product, setProduct] = useState<Product[]>([]);
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
        setProduct(parseJson);
        const total = parseJson.reduce(
          (preValue: any, curValue: Product) =>
            preValue + (curValue.price as number) * (curValue.quantity as number),
          0
        );
        setTotal(total);
      }
    }
  }, [isAuth, profile, cartItems]);

  const handleChange = (quantity: number, id: string) => {
    if (isAuth) {
      setCartItem((prevState) => [...prevState, { product_id: id, quantity }]);
    } else {
      handleUpdateQuantity(id, quantity);
    }
  };

  const handleDeleteItem = (id?: string) => {
    if (isAuth) {
      deleteCartItem({ product_id: id })
        .unwrap()
        .then(() => {
          message.success('Delete Success');
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

  const uniqueIdWithMaxQuantity = (cartItems: CartItem[]) => {
    const arrayFiltered: CartItem[] = [];
    cartItems.forEach((item) => {
      const hasDuplicateId = arrayFiltered.find((value) => value.product_id === item.product_id);
      if (hasDuplicateId) {
        if (hasDuplicateId.quantity < item.quantity) {
          hasDuplicateId.quantity = item.quantity;
        }
        return;
      }
      arrayFiltered.push(item);
    });
    return arrayFiltered;
  };

  const handleUpdateCart = () => {
    if (isAuth) {
      putCartItem({ carts: uniqueIdWithMaxQuantity(cartItem) })
        .unwrap()
        .then(() => {
          message.success('Update Cart Success');
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
          message.success('Delete Success');
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
        {product.length > 0 ? (
          <Fragment>
            <div className="cart-table mb-15">
              <table className="table">
                <thead>
                  <tr>
                    {cartHeader.map((item) => (
                      <th key={item.name} className={item.className}>
                        {item.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.map((item: Product) => (
                    <tr key={item.id}>
                      <td>
                        <Image
                          width="100%"
                          src={`${imgPath}${item.image}`}
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
                Update Cart
              </Button>
              <Button className="custom-btn" type="secondary" onClick={handleContinueShopping}>
                Continue Shopping
              </Button>
              <Button className="custom-btn" type="secondary" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>
            <CartTotal total={total} />
          </Fragment>
        ) : (
          <div className="cart-empty">
            <div className="title mb-10">Shopping Cart</div>
            <div className="subtitle mb-10">Your cart is currently empty.</div>
            <div className="description">
              Continue browsing <Link href={Path.SHOP}>here</Link>
            </div>
          </div>
        )}
      </Wrapper>
      <ModalConfirm
        type="confirm"
        title="Clear Cart"
        description="Are you sure you want to delete the cart?"
        closeText="Cancel"
        confirmText="Yes"
        visible={confirmClearCart.visible}
        onClose={confirmClearCart.toggle}
        onConfirm={handleConfirmClearCart}
      />
    </Container>
  );
};

interface CartTotalProps {
  total?: number;
}

const CartTotal = ({ total }: CartTotalProps) => {
  const router = useRouter();

  const handleGoToCheckout = () => {
    router.push(Path.CHECK_OUT);
  };

  return (
    <div className="cart-calculate-items">
      <div className="calculate-title">Cart Totals</div>
      <table className="calculate-table">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td className="subtotal">{formatAmount(total)}</td>
          </tr>
          <tr className="total">
            <td>Total</td>
            <td className="total-amount">{formatAmount(total)}</td>
          </tr>
        </tbody>
      </table>
      <Button className="custom-btn" type="secondary" onClick={handleGoToCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default Cart;
