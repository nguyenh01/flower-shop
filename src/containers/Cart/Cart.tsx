import Wrapper from '@src/components/Layout/Wrapper';
import { FunctionComponent, useEffect, useState } from 'react';
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
import { useDeleteCartItemMutation } from '@src/api/CartAPI';

const Cart: FunctionComponent = () => {
  const router = useRouter();
  const { isAuth, profile } = useSelector((state) => state.userProfile);
  const { cart } = useSelector((state) => state.productSlice);
  const cartCookie = Cookies.get('carts');

  const [product, setProduct] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>();

  const [deleteCartItem] = useDeleteCartItemMutation();
  //const [deleteCart] = useDeleteCartMutation();

  useEffect(() => {
    if (!isAuth) {
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
    } else {
      const total = cart.reduce(
        (preValue: any, curValue: any) =>
          preValue + (curValue.price as number) * (curValue.quantity as number),
        0
      );
      setTotal(total);
      setProduct(cart as any);
    }
  }, [isAuth, profile, cart]);

  const handleChange = (quantity: number, id: string) => {
    handleUpdateQuantity(id, quantity);
  };

  const handleDeleteItem = (id?: string) => {
    if (!isAuth) {
      const newCart = product.filter((item: Product) => item.id !== id);
      setProduct(newCart);
      handleDeleteItemInCart(newCart);
    } else {
      deleteCartItem({ id })
        .unwrap()
        .then(() => {
          message.success('Delete Success');
        })
        .catch(() => {});
    }
  };

  const handleUpdateCart = () => {
    window.location.reload();
  };

  const handleContinueShopping = () => {
    router.push(Path.SHOP);
  };

  const handleClearCart = () => {
    if (!isAuth) {
      handleClearCookieCart();
    } else {
      return;
    }
  };

  return (
    <Container>
      <Wrapper>
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
        {!isAuth ? <CartTotal total={total} /> : <CartTotal total={total} />}
      </Wrapper>
    </Container>
  );
};

interface CartTotalProps {
  total?: number;
}

const CartTotal = ({ total }: CartTotalProps) => {
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
      <Button className="custom-btn" type="secondary">
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default Cart;
